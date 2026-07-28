'use client';

import { useEffect, useState, useRef } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import VideoGrid from '@/components/meetings/VideoGrid';
import Captions from '@/components/meetings/Captions';
import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';

export default function MeetingRoomPage({ params }: { params: { id: string } }) {
  const [token, setToken] = useState('');
  const [myLanguage, setMyLanguage] = useState('English');
  const roomName = params.id;
  const router = useRouter();

  useEffect(() => {
    // For V1 Demo, we hit our backend to generate a LiveKit token
    const fetchToken = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/meetings/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ room: roomName }),
        });
        
        const data = await res.json();
        if (data.token) {
          setToken(data.token);
        } else {
          console.error("Failed to get token", data.error);
        }
      } catch (e) {
        console.error(e);
      }
    };
    
    fetchToken();
  }, [roomName]);

  // Start microphone recording for AI pipeline (Valid Chunking Strategy)
  useEffect(() => {
    if (!token) return;
    let isActive = true;
    let currentRecorder: MediaRecorder | null = null;
    
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recordLoop = () => {
        if (!isActive) return;
        
        // We create a NEW recorder every cycle so every chunk has valid WebM headers
        currentRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        
        currentRecorder.ondataavailable = async (e) => {
          if (e.data.size > 0 && socket.connected) {
            const buffer = await e.data.arrayBuffer();
            socket.emit('audio_chunk', { chunk: buffer }); // Backend handles translation language
          }
        };

        currentRecorder.start();
        
        // Record for 2.5 seconds, stop (which triggers ondataavailable), and loop
        setTimeout(() => {
          if (currentRecorder && currentRecorder.state === 'recording') {
            currentRecorder.stop();
          }
          if (isActive) recordLoop();
        }, 2500);
      };

      recordLoop();
    }).catch(err => console.error("Mic access failed for AI pipeline", err));

    return () => {
      isActive = false;
      if (currentRecorder && currentRecorder.state !== 'inactive') {
        currentRecorder.stop();
      }
    };
  }, [token]);

  // Sync language with backend
  useEffect(() => {
    socket.emit('set_language', myLanguage);
  }, [myLanguage]);

  if (token === '') {
    return (
      <div className="w-full h-[600px] flex items-center justify-center glass-panel">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground font-medium">Joining Room: {roomName}</p>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Meeting link copied to clipboard!');
    }
  };

  return (
    <div className="w-full h-[calc(100vh-10rem)] relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[200] bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl">
        <span className="text-white/80 font-medium text-sm whitespace-nowrap">I speak/read:</span>
        <select 
          value={myLanguage}
          onChange={(e) => setMyLanguage(e.target.value)}
          className="bg-primary/20 text-white font-semibold py-1.5 px-3 rounded-lg border border-primary/30 outline-none cursor-pointer"
        >
          <option value="English">English 🇺🇸</option>
          <option value="Hindi">Hindi 🇮🇳</option>
          <option value="Marathi">Marathi 🇮🇳</option>
          <option value="Spanish">Spanish 🇪🇸</option>
          <option value="French">French 🇫🇷</option>
          <option value="Japanese">Japanese 🇯🇵</option>
        </select>
        <div className="w-px h-6 bg-white/20 mx-1"></div>
        <button
          onClick={handleCopyLink}
          className="bg-white/10 hover:bg-white/20 text-white font-medium py-1.5 px-4 rounded-lg border border-white/10 transition-colors whitespace-nowrap"
        >
          Copy Invite Link
        </button>
      </div>
      <Captions roomName={roomName} />
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: '100%', width: '100%' }}
        onDisconnected={() => router.push('/dashboard/meetings')}
      >
        <VideoGrid />
      </LiveKitRoom>
    </div>
  );
}
