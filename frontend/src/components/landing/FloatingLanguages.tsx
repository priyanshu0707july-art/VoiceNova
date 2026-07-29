"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { id: 1, text: 'Hello!', translation: 'नमस्ते!', lang: 'Hindi', flag: 'in', emoji: '👏', top: '15%', left: '10%', delay: 0 },
  { id: 2, text: 'Welcome!', translation: 'Bienvenue!', lang: 'French', flag: 'fr', emoji: '👋', top: '25%', right: '15%', delay: 1.5 },
  { id: 3, text: 'Thanks!', translation: 'ありがとう!', lang: 'Japanese', flag: 'jp', emoji: '👏', bottom: '30%', left: '15%', delay: 0.8 },
  { id: 4, text: 'Yes!', translation: '네!', lang: 'Korean', flag: 'kr', emoji: '✌️', bottom: '20%', right: '10%', delay: 2.2 },
  { id: 5, text: 'Good!', translation: '¡Bueno!', lang: 'Spanish', flag: 'es', emoji: '👍', top: '45%', left: '5%', delay: 1.2 },
];

export default function FloatingLanguages() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {languages.map((item) => (
        <FloatingCard key={item.id} data={item} />
      ))}
    </div>
  );
}

function FloatingCard({ data }: { data: { id: number, text: string, translation: string, lang: string, flag: string, emoji: string, top?: string, left?: string, right?: string, bottom?: string, delay: number } }) {
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTranslation((prev) => !prev);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ 
        opacity: { duration: 1, delay: data.delay },
        y: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" }
      }}
      className="absolute glass-panel px-5 py-4 flex flex-col min-w-[180px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10 rounded-2xl bg-[#0B0F1A]/80 backdrop-blur-xl"
      style={{
        top: data.top,
        bottom: data.bottom,
        left: data.left,
        right: data.right,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-lg bg-white/10 border border-white/20">
            <img src={`https://flagcdn.com/${data.flag}.svg`} alt={`${data.lang} flag`} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm text-white/90 font-medium tracking-wide">{data.lang}</span>
        </div>
        <div className="flex items-center gap-[3px] opacity-80">
          <motion.div animate={{ height: ["6px", "14px", "6px"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-[3px] rounded-full bg-primary" />
          <motion.div animate={{ height: ["14px", "6px", "14px"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-[3px] rounded-full bg-primary" />
          <motion.div animate={{ height: ["8px", "16px", "8px"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-[3px] rounded-full bg-primary" />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="h-6 flex-1 flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={showTranslation ? 'translation' : 'original'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-base font-bold text-white tracking-wide"
            >
              {showTranslation ? data.translation : data.text}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-base">{data.emoji}</span>
      </div>
    </motion.div>
  );
}

