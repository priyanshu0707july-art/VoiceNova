'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';
import { motion, AnimatePresence } from 'framer-motion';

interface Caption {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
}

export default function Captions({ roomName, myLanguage = 'Original' }: { roomName: string, myLanguage?: string }) {
  const [captions, setCaptions] = useState<Caption[]>([]);

  useEffect(() => {
    socket.connect();
    
    const joinRoom = () => socket.emit('join_meeting', roomName);
    if (socket.connected) joinRoom();
    socket.on('connect', joinRoom);

    socket.on('new_caption', (caption: Caption) => {
      if (myLanguage === 'Original') return; // Do not show captions if Original
      setCaptions((prev) => {
        // Keep only the last 3 captions to prevent screen clutter
        const updated = [...prev, caption];
        return updated.slice(updated.length > 3 ? updated.length - 3 : 0);
      });

      // TTS: Speak the translated caption out loud
      if (myLanguage !== 'Original' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // Extract just the text without the language prefix like [EN]
        const textToSpeak = caption.text.replace(/^\[.*?\]\s*/, '');
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Get available voices and pick a natural English one if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Natural') || v.name.includes('Google US English')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;
        
        // Settings for clear speech
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        
        window.speechSynthesis.speak(utterance);
      }
    });

    return () => {
      socket.off('new_caption');
      socket.off('connect', joinRoom);
      socket.disconnect();
    };
  }, [roomName]);

  // Automatically fade out captions after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCaptions((prev) => prev.filter(c => now - c.timestamp < 5000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 pointer-events-none z-[100] flex flex-col gap-3 items-center">
      <AnimatePresence>
        {captions.map((caption) => (
          <motion.div
            key={caption.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-2xl text-white shadow-2xl flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-lg font-medium tracking-wide">{caption.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
