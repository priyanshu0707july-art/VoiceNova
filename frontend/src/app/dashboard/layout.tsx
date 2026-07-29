"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Video, 
  PlaySquare, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ChevronDown, 
  Command,
  Sparkles
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/meetings', label: 'Meetings', icon: Video },
  { href: '/dashboard/recordings', label: 'Recordings', icon: PlaySquare },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('user@linguaverse.ai');

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setName(session.user.user_metadata?.full_name || 'User');
        setEmail(session.user.email || 'user@linguaverse.ai');
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleNewMeeting = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 9; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i === 2 || i === 5) code += '-';
    }
    router.push(`/meeting/${code}`);
  };

  return (
    <div className="min-h-screen flex bg-[#050816] text-white selection:bg-[#6D5BFF]/30 font-inter overflow-hidden relative">
      {/* Subtle Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#6D5BFF]/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00D4FF]/10 blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-[#121623]/60 backdrop-blur-2xl z-10 hidden md:flex flex-col relative">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6D5BFF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(109,91,255,0.4)]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-space font-bold tracking-tight text-white">
            Lingua<span className="text-[#6D5BFF]">Verse</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <div className="text-xs font-semibold text-[#B6BED8]/50 uppercase tracking-wider mb-4 px-4">
            Menu
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
            return (
              <Link href={item.href} key={item.label} className="relative block">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#6D5BFF]/20 to-[#6D5BFF]/5 text-white shadow-[inset_0_0_0_1px_rgba(109,91,255,0.2)]' 
                      : 'text-[#B6BED8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#6D5BFF] rounded-r-full shadow-[0_0_10px_#6D5BFF]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#6D5BFF]' : 'text-[#B6BED8]'}`} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 mt-auto border-t border-white/5">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-[#B6BED8] rounded-xl transition-colors font-medium group"
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
            Log Out
          </motion.button>
          
          <div className="mt-4 flex items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6D5BFF] to-[#00D4FF] flex items-center justify-center text-white font-bold">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#121623]" />
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{name}</p>
              <p className="text-xs text-[#B6BED8] truncate">{email}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-[#B6BED8]" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Top bar */}
        <header className="h-20 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl flex items-center justify-between px-8 shrink-0">
           <div className="flex-1 max-w-xl relative group">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <Search className="w-5 h-5 text-[#B6BED8] group-focus-within:text-[#6D5BFF] transition-colors" />
             </div>
             <input 
              type="text" 
              placeholder="Search meetings, recordings, or people..." 
              className="w-full h-12 pl-12 pr-16 rounded-2xl bg-[#121623]/80 border border-white/10 text-white placeholder:text-[#B6BED8] focus:outline-none focus:border-[#6D5BFF]/50 focus:bg-[#121623] focus:shadow-[0_0_0_4px_rgba(109,91,255,0.1)] transition-all font-medium text-sm"
             />
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
               <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-[#B6BED8]">
                 <Command className="w-3 h-3" />
                 <span>K</span>
               </div>
             </div>
           </div>
           <div className="flex items-center space-x-6 ml-8">
             <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
             >
               <Bell className="w-5 h-5 text-[#B6BED8] hover:text-white transition-colors" />
               <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]" />
             </motion.button>
             <div className="w-px h-8 bg-white/10" />
             <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNewMeeting}
              className="relative group overflow-hidden rounded-xl px-6 h-12 bg-gradient-to-r from-[#6D5BFF] to-[#3B82F6] font-semibold text-white shadow-[0_0_20px_rgba(109,91,255,0.3)] hover:shadow-[0_0_30px_rgba(109,91,255,0.5)] transition-shadow flex items-center gap-2"
             >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Video className="w-5 h-5 relative z-10" />
                <span className="relative z-10">New Meeting</span>
             </motion.button>
           </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto scroll-smooth z-0">
          <div className="p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
