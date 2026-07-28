import Link from 'next/link';
import { Home, Video, PlaySquare, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border glass-panel rounded-none border-y-0 border-l-0 flex-col hidden md:flex">
        <div className="p-6">
          <div className="text-xl font-bold tracking-tighter text-white">LinguaVerse<span className="text-primary">AI</span></div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-white/10 text-white font-medium">
            <Home className="w-5 h-5" />
            <span>Overview</span>
          </Link>
          <Link href="/dashboard/meetings" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <Video className="w-5 h-5" />
            <span>Meetings</span>
          </Link>
          <Link href="/dashboard/recordings" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <PlaySquare className="w-5 h-5" />
            <span>Recordings</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5">
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top bar */}
        <header className="h-16 border-b border-border glass-panel rounded-none border-x-0 border-t-0 flex items-center justify-between px-6 shrink-0 z-10">
           <div className="w-96">
             <input type="text" placeholder="Search meetings..." className="w-full h-9 px-4 rounded-full bg-input border border-border text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
           </div>
           <div className="flex items-center space-x-4">
             <Button className="primary-glow rounded-full px-5 h-9 text-sm">
               New Meeting
             </Button>
             <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden border border-border">
               <div className="w-full h-full bg-gradient-to-tr from-primary to-accent" />
             </div>
           </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 z-0">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
