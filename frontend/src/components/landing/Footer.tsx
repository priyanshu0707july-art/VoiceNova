import React from 'react';
import Link from 'next/link';


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
          <Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
            Twitter
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
            GitHub
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
            LinkedIn
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 text-center md:text-left text-sm text-muted-foreground">
        © {new Date().getFullYear()} LinguaVerse AI. All rights reserved.
      </div>
    </footer>
  );
}
