import { Server, Socket } from 'socket.io';
import Groq from 'groq-sdk';
import OpenAI from 'openai';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { STTManager } from './stt.service';

export class TranslationService {
  private groq: Groq;
  private sttManager: STTManager;
  private openai: OpenAI | null = null;

  constructor(private io: Server, private userLanguages: Map<string, string>) {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    this.sttManager = new STTManager();
  }

  public async processAudioChunk(socket: Socket, chunk: Buffer) {
    const tempFilePath = path.join(os.tmpdir(), `audio_${Date.now()}_${socket.id}.webm`);
    
    try {
      fs.writeFileSync(tempFilePath, chunk);

      // 1. Transcribe the original spoken audio using the Multi-Provider STT Manager
      const transcribedText = await this.sttManager.transcribe(tempFilePath);

      if (!transcribedText || transcribedText.trim().length < 2) return;

      // 2. Identify the room the speaker is in
      const room = Array.from(socket.rooms).find(r => r !== socket.id);
      if (!room) return;

      // 3. Group all listeners in the room by their requested language
      const clientsInRoom = await this.io.in(room).fetchSockets();
      const languageGroups = new Map<string, string[]>();
      
      for (const client of clientsInRoom) {
        const lang = this.userLanguages.get(client.id) || 'English';
        if (!languageGroups.has(lang)) {
          languageGroups.set(lang, []);
        }
        languageGroups.get(lang)!.push(client.id);
      }

      // 4. Translate the text ONCE for each unique language requested in the room
      const translationPromises = Array.from(languageGroups.entries()).map(async ([targetLang, socketIds]) => {
        if (targetLang === 'Original') return; // Skip translation entirely to save API limits
        try {
          let translatedText = '';
          try {
            const translationResponse = await this.groq.chat.completions.create({
              messages: [
                {
                  role: "system",
                  content: `You are a highly accurate real-time translator. Translate the user's speech directly into ${targetLang}. ONLY output the raw translated text, with no conversational filler, quotes, or explanations. If the text is already in ${targetLang}, just output the exact text unchanged.`
                },
                {
                  role: "user",
                  content: transcribedText
                }
              ],
              model: "llama-3.1-8b-instant",
              temperature: 0.2,
              max_tokens: 200,
            });
            translatedText = translationResponse.choices[0]?.message?.content?.trim() || '';
          } catch (groqErr: any) {
            console.warn(`Groq Translation failed (likely rate limit), falling back to OpenAI: ${groqErr.message}`);
            if (!this.openai) throw new Error("No OpenAI key available for fallback translation");
            
            const translationResponse = await this.openai.chat.completions.create({
              messages: [
                {
                  role: "system",
                  content: `You are a highly accurate real-time translator. Translate the user's speech directly into ${targetLang}. ONLY output the raw translated text, with no conversational filler, quotes, or explanations. If the text is already in ${targetLang}, just output the exact text unchanged.`
                },
                {
                  role: "user",
                  content: transcribedText
                }
              ],
              model: "gpt-4o-mini",
              temperature: 0.2,
              max_tokens: 200,
            });
            translatedText = translationResponse.choices[0]?.message?.content?.trim() || '';
          }

          if (!translatedText) return;

          // 5. Send this specific translation ONLY to the users who asked for it
          const captionPayload = {
            id: Math.random().toString(36).substring(7),
            userId: socket.id,
            text: `[${targetLang}] ${translatedText}`,
            timestamp: Date.now()
          };

          socketIds.forEach(targetSocketId => {
            this.io.to(targetSocketId).emit('new_caption', captionPayload);
          });
          
        } catch (e) {
          console.error(`Translation failed for ${targetLang}:`, e);
        }
      });

      // Run all translations simultaneously for near-zero latency
      await Promise.all(translationPromises);

    } catch (error) {
      console.error("Translation Pipeline Error:", error);
    } finally {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  }
}
