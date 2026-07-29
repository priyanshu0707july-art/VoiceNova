"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? 'py-4 bg-background/50 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50' : 'py-6 bg-transparent border-b-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          LinguaVerse<span className="text-primary">AI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#demo" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Demo
          </Link>
          <Link href="#stats" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Stats
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden sm:block">
            Log In
          </Link>
          <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
