'use client';

import { useEffect, useState } from 'react';
import { LiveKitRoom, Chat } from '@livekit/components-react';
import VideoGrid from '@/components/meetings/VideoGrid';
import Captions from '@/components/meetings/Captions';
import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
import HostControlsModal from '@/components/meetings/HostControlsModal';
import AdvancedControls from '@/components/meetings/AdvancedControls';
import WhiteboardOverlay from '@/components/meetings/WhiteboardOverlay';
import EmojiLayer from '@/components/meetings/EmojiLayer';

export default function MeetingRoomPage({ params }: { params: { id: string } }) {
  const [token, setToken] = useState('');
  const [myLanguage, setMyLanguage] = useState('Original');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isHostControlsOpen, setIsHostControlsOpen] = useState(false);
  const roomName = params.id;
  const router = useRouter();

  useEffect(() => {
    // For V1 Demo, we hit our backend to generate a LiveKit token
    const fetchToken = async () => {
      try {
        const username = `User_${Math.floor(Math.random() * 10000)}`;
        const res = await fetch(`/api/livekit?room=${roomName}&username=${username}`);
        
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
    let intervalId: NodeJS.Timeout;
    let mediaStream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      if (!isActive) return;
      mediaStream = stream;
      
      // Voice Activity Detection to save Groq API Rate Limits (20 RPM)
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      let isSpeakingInChunk = false;
      const checkVolume = () => {
        if (!isActive) return;
        analyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const average = sum / dataArray.length;
        if (average > 15) isSpeakingInChunk = true;
        requestAnimationFrame(checkVolume);
      };
      checkVolume();
      
      const startRecording = () => {
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const hadSpeech = isSpeakingInChunk;
        isSpeakingInChunk = false; // Reset for the next chunk
        
        recorder.ondataavailable = async (e) => {
          // ONLY send to backend if user actually spoke! This prevents 429 Too Many Requests.
          if (e.data.size > 0 && socket.connected && hadSpeech) {
            const buffer = await e.data.arrayBuffer();
            socket.emit('audio_chunk', { chunk: buffer });
          }
        };
        recorder.start();
        return recorder;
      };

      currentRecorder = startRecording();

      intervalId = setInterval(() => {
        if (currentRecorder && currentRecorder.state === 'recording') {
          currentRecorder.stop(); // Triggers ondataavailable
        }
        if (isActive) {
          currentRecorder = startRecording();
        }
      }, 6000); // 6 seconds to comfortably stay under 20 RPM limit
      
    }).catch(err => console.error("Mic access failed for AI pipeline", err));

    return () => {
      isActive = false;
      clearInterval(intervalId);
      if (currentRecorder && currentRecorder.state !== 'inactive') {
        currentRecorder.stop();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [token]);

  // Sync language with backend
  useEffect(() => {
    const setLang = () => socket.emit('set_language', myLanguage);
    if (socket.connected) setLang();
    socket.on('connect', setLang);
    return () => {
      socket.off('connect', setLang);
    };
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
      <div className="absolute top-16 left-4 z-[200] bg-black/80 text-xs text-white p-2 rounded">
        Debug: {socket.connected ? 'Socket Connected ✅' : 'Socket Disconnected ❌'} | URL: {process.env.NEXT_PUBLIC_API_URL || 'localhost'}
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[200] bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl">
        <span className="text-white/80 font-medium text-sm whitespace-nowrap">I speak/read:</span>
        <select 
          value={myLanguage}
          onChange={(e) => setMyLanguage(e.target.value)}
          className="bg-[#121623] text-white font-semibold py-1.5 px-3 rounded-lg border border-[#6D5BFF]/30 hover:border-[#6D5BFF] outline-none cursor-pointer"
        >
          <option value="Original">Leave as it is (Original) 🎙️</option>
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
        <a
          href={`https://wa.me/?text=${encodeURIComponent("Join my LinguaVerseAI meeting: ")}` + (typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '')}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366]/20 hover:bg-[#25D366]/40 text-[#25D366] font-medium py-1.5 px-4 rounded-lg border border-[#25D366]/30 transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          WhatsApp
        </a>
      </div>
      <Captions roomName={roomName} myLanguage={myLanguage} />
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: '100%', width: '100%' }}
        onDisconnected={() => router.push('/dashboard/meetings')}
      >
        <div className="flex h-full w-full">
          <div className="flex-1 relative">
            <VideoGrid myLanguage={myLanguage} />
            {isWhiteboardOpen && <WhiteboardOverlay onClose={() => setIsWhiteboardOpen(false)} />}
          </div>
          {isChatOpen && (
            <div className="w-80 h-full border-l border-white/10 bg-background/95">
              <Chat />
            </div>
          )}
        </div>
        <AdvancedControls 
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
          onToggleWhiteboard={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
          onOpenSettings={() => setIsHostControlsOpen(true)}
        />
        {isHostControlsOpen && <HostControlsModal onClose={() => setIsHostControlsOpen(false)} />}
        <EmojiLayer />
      </LiveKitRoom>
    </div>
  );
}
