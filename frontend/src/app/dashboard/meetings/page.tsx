'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video, Plus, Link as LinkIcon } from 'lucide-react';

export default function MeetingsLobby() {
  const [joinCode, setJoinCode] = useState('');
  const router = useRouter();

  const handleCreateMeeting = () => {
    // Generate a random meeting code
    const randomCode = Math.random().toString(36).substring(2, 10);
    router.push(`/dashboard/meetings/${randomCode}`);
  };

  const handleJoinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim()) {
      router.push(`/dashboard/meetings/${joinCode.trim()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="max-w-md w-full glass-panel p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
          <Video className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Virtual Meetings</h1>
        <p className="text-muted-foreground mb-8">
          Connect with your colleagues around the world with real-time AI translation.
        </p>

        <button
          onClick={handleCreateMeeting}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)] mb-8"
        >
          <Plus className="w-5 h-5" />
          Create New Meeting
        </button>

        <div className="relative w-full flex items-center justify-center mb-8">
          <div className="absolute w-full h-px bg-white/10"></div>
          <span className="relative bg-[#0F0F13] px-4 text-sm text-muted-foreground">OR</span>
        </div>

        <form onSubmit={handleJoinMeeting} className="w-full flex flex-col gap-3">
          <div className="relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter meeting code..."
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!joinCode.trim()}
            className="w-full py-3 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Join Meeting
          </button>
        </form>
      </div>
    </div>
  );
}
