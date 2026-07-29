"use client";

import { useEffect, useState } from 'react';
import { LiveKitRoom, VideoConference, RoomAudioRenderer, ControlBar, GridLayout, ParticipantTile } from '@livekit/components-react';
import '@livekit/components-styles';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import InteractiveWhiteboard from '@/components/meeting/InteractiveWhiteboard';

export default function MeetingRoom({ params }: { params: { id: string } }) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  
  const room = params.id;

  useEffect(() => {
    // Initialize Supabase to get the user's name
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const fetchToken = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const username = session?.user?.user_metadata?.full_name || `Guest_${Math.floor(Math.random() * 1000)}`;
      setName(username);

      try {
        const resp = await fetch(`/api/livekit?room=${room}&username=${encodeURIComponent(username)}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    };

    fetchToken();
  }, [room]);

  if (token === '') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050816] text-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
        <p className="text-lg font-medium">Connecting to secure room...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#050816] overflow-hidden">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: '100dvh' }}
      >
        {/* We will build a custom layout here soon */}
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}
