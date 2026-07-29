"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video, Keyboard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardPage() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');

  const createMeeting = () => {
    // Generate a random 9-character code: xxx-xxx-xxx
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 9; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i === 2 || i === 5) code += '-';
    }
    router.push(`/meeting/${code}`);
  };

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingCode.trim().length > 0) {
      const formattedCode = meetingCode.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      router.push(`/meeting/${formattedCode}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 space-y-12">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Video calls and meetings for everyone
        </h1>
        <p className="text-lg text-muted-foreground">
          Connect, collaborate, and celebrate from anywhere with LinguaVerse AI.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl">
        <Button 
          onClick={createMeeting} 
          size="lg" 
          className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium"
        >
          <Video className="w-5 h-5 mr-2" />
          New Meeting
        </Button>

        <form onSubmit={joinMeeting} className="flex w-full sm:w-auto flex-1 relative items-center">
          <div className="absolute left-4 text-muted-foreground">
            <Keyboard className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Enter a code or link"
            className="w-full h-14 pl-12 pr-24 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl text-lg"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="ghost" 
            disabled={meetingCode.trim().length === 0}
            className="absolute right-2 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 font-medium disabled:text-muted-foreground"
          >
            Join
          </Button>
        </form>
      </div>
    </div>
  );
}
