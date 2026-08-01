"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { 
  Video, 
  Keyboard, 
  Clock, 
  Users, 
  FileText, 
  Languages, 
  Bot, 
  Mic, 
  Sparkles,
  Calendar,
  ArrowRight,
  UploadCloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@supabase/supabase-js';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');
  const [name, setName] = useState('User');

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setName(session.user.user_metadata?.full_name?.split(' ')[0] || 'User');
      }
    };
    fetchUser();
  }, []);

  const createMeeting = () => {
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
    <motion.div 
      variants={staggerContainer} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 pb-12"
    >
      {/* Welcome Section */}
      <motion.div variants={fadeUp} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight flex items-center gap-3">
          Welcome back, {name} <motion.div animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}>👋</motion.div>
        </h1>
        <p className="text-[#B6BED8] text-lg max-w-2xl">
          Ready to collaborate across 120+ languages with real-time AI translation.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Meetings', value: '24', icon: Video, color: 'from-blue-500 to-cyan-400', trend: '+12% this week' },
          { label: 'Meeting Time', value: '18h', icon: Clock, color: 'from-purple-500 to-pink-500', trend: '+4% this week' },
          { label: 'Recordings', value: '12', icon: FileText, color: 'from-orange-500 to-red-500', trend: '2 new today' },
          { label: 'Participants', value: '142', icon: Users, color: 'from-green-400 to-emerald-600', trend: '+28% this week' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="bg-[#121623]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 text-white shadow-lg`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-[#B6BED8] text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-space font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Actions & Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <motion.div variants={fadeUp} className="bg-[#121623]/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#6D5BFF]" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                onClick={createMeeting}
                className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#6D5BFF]/20 to-[#6D5BFF]/5 border border-[#6D5BFF]/30 rounded-2xl hover:border-[#6D5BFF]/60 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#6D5BFF] flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(109,91,255,0.5)] transition-shadow">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-white text-lg">New Meeting</span>
                <span className="text-sm text-[#B6BED8] mt-1">Start instantly with AI</span>
              </motion.button>

              <div className="flex flex-col p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Keyboard className="w-5 h-5 text-[#B6BED8]" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Join Meeting</span>
                    <span className="text-xs text-[#B6BED8]">Enter a code or link</span>
                  </div>
                </div>
                <form onSubmit={joinMeeting} className="mt-auto flex gap-2">
                  <Input 
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    placeholder="abc-def-ghi" 
                    className="bg-black/50 border-white/10 text-white placeholder:text-[#B6BED8]/50 h-11 focus-visible:ring-[#6D5BFF]"
                  />
                  <Button type="submit" disabled={!meetingCode} className="h-11 bg-white/10 hover:bg-white/20 text-white">
                    Join
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Meetings */}
          <motion.div variants={fadeUp} className="bg-[#121623]/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00D4FF]" />
                Upcoming Meetings
              </h2>
              <Button variant="ghost" className="text-sm text-[#6D5BFF] hover:bg-[#6D5BFF]/10 hover:text-[#6D5BFF]">
                View Calendar
              </Button>
            </div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-[#B6BED8] font-medium">JUL</span>
                      <span className="text-lg font-bold text-white">{29 + i}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-[#6D5BFF] transition-colors">Global Sync: Product Team</h4>
                      <p className="text-sm text-[#B6BED8] flex items-center gap-2">
                        10:00 AM • 4 Participants
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-[#6D5BFF] hover:text-white rounded-full w-10 h-10 p-0">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: AI Features & Activity */}
        <div className="space-y-6">
          {/* AI Capabilities Showcase */}
          <motion.div variants={fadeUp} className="bg-gradient-to-b from-[#121623]/80 to-[#121623]/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6D5BFF]/20 rounded-full blur-3xl" />
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#6D5BFF]" />
              LinguaVerse AI
            </h2>
            <div className="space-y-4 relative z-10">
              {[
                { label: 'Real-Time Translation', icon: Languages, color: 'text-blue-400', active: true },
                { label: 'AI Meeting Summaries', icon: FileText, color: 'text-purple-400', active: true },
                { label: 'Voice Cloning', icon: Mic, color: 'text-pink-400', active: true },
              ].map((feat: any, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <feat.icon className={`w-4 h-4 ${feat.color}`} />
                    <span className="text-sm font-medium text-white">{feat.label}</span>
                  </div>
                  {feat.badge ? (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded-full">
                      {feat.badge}
                    </span>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_5px_#22C55E]" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity Timeline */}
          <motion.div variants={fadeUp} className="bg-[#121623]/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg flex-1">
             <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#B6BED8]" />
              Recent Activity
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-white/10 before:via-white/10 before:to-transparent">
              {[
                { title: 'Summary Generated', desc: 'Marketing Sync', time: '2h ago', icon: FileText, color: 'bg-purple-500' },
                { title: 'Recording Uploaded', desc: 'Design Review', time: '5h ago', icon: UploadCloud, color: 'bg-blue-500' },
                { title: 'Translated 45 mins', desc: 'To Japanese & Spanish', time: 'Yesterday', icon: Languages, color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050816] ${item.color} text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <span className="text-xs text-[#B6BED8]">{item.time}</span>
                    </div>
                    <p className="text-sm text-[#B6BED8]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
