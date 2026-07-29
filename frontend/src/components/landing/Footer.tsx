import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full relative z-10 pt-20 pb-10 px-6">
      {/* Animated gradient divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 mb-12 animate-pulse" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold tracking-tighter text-white">
          LinguaVerse<span className="text-primary">AI</span>
        </div>
        
        <div className="flex gap-6">
          <Link href="#" className="text-muted-foreground hover:text-white transition-colors hover:scale-110">
            <Twitter className="w-5 h-5" />
          </Link>

          <Link href="#" className="text-muted-foreground hover:text-white transition-colors hover:scale-110">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 text-center md:text-left text-sm text-muted-foreground">
        © {new Date().getFullYear()} LinguaVerse AI. All rights reserved.
      </div>
    </footer>
  );
}
