"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FloatingLanguages from './FloatingLanguages';
import { ArrowRight, Video } from 'lucide-react';

const headlines = [
  "Speak Any Language",
  "Understand Anyone",
  "Communicate Without Limits"
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center w-full max-w-7xl mx-auto px-6 z-10">
      <FloatingLanguages />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-md shadow-lg"
      >
        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
        Now in Public Beta
      </motion.div>

      <div className="h-[140px] md:h-[180px] flex items-center justify-center overflow-hidden w-full">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x leading-tight pb-2"
          >
            {headlines[index]}.
          </motion.h1>
        </AnimatePresence>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed mt-4"
      >
        The cinematic, AI-powered video communication platform that translates your speech and captions instantly. Break language barriers with zero latency.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 items-center z-10"
      >
        <Button size="lg" className="group relative overflow-hidden rounded-full px-8 text-base h-14 bg-white text-black hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <Link href="/signup" className="flex items-center gap-2">
            Start for free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-14 bg-white/5 hover:bg-white/10 border-white/10 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95">
          <Link href="/demo" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Watch Demo
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
