# VoiceNova AI 🎙️🌍

VoiceNova is a real-time, universal translation video conferencing platform. It allows users to join video calls and speak in their native languages while instantly seeing translations in their preferred language.

## 🚀 Features
- **Real-Time Video Calling**: Powered by LiveKit.
- **Lightning Fast AI Translation**: Uses Groq (Whisper-large-v3-turbo for STT, Llama-3.1-8b for MT).
- **Individual Language Selection**: Every participant can select what language they want to read captions in, regardless of what languages others are speaking.
- **Native Text-to-Speech**: Uses the browser's native Web Speech API to read translated captions aloud seamlessly.

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, LiveKit Components
- **Backend**: Node.js, Express, Socket.IO
- **AI Pipeline**: Groq SDK

## ⚙️ Running Locally

### 1. Setup Backend
```bash
cd backend
npm install
npm run dev
```
*Make sure to configure `.env` with your Groq API Key.*

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
*Make sure to configure `.env.local` with your LiveKit API keys.*

## 🌐 Architecture
The frontend captures audio via the browser's `MediaRecorder` API using a continuous chunking strategy. These WebM chunks are sent over WebSockets to the Express backend. The backend streams the chunks to Groq's insanely fast Whisper API for transcription, then immediately feeds the transcript into Llama 3 for translation to the target languages requested by the room's participants. The translated strings are broadcasted back down the WebSocket to the frontend and rendered as beautiful glassmorphic captions.
