"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const languages = [
  { id: 1, text: 'Hello', translation: 'नमस्ते', lang: '🇮🇳 Hindi', top: '15%', left: '10%', delay: 0 },
  { id: 2, text: 'Welcome', translation: 'Bienvenue', lang: '🇫🇷 French', top: '25%', right: '15%', delay: 1.5 },
  { id: 3, text: 'Thanks', translation: 'ありがとう', lang: '🇯🇵 Japanese', bottom: '30%', left: '15%', delay: 0.8 },
  { id: 4, text: 'Yes', translation: '네', lang: '🇰🇷 Korean', bottom: '20%', right: '10%', delay: 2.2 },
  { id: 5, text: 'Good', translation: 'Bueno', lang: '🇪🇸 Spanish', top: '45%', left: '5%', delay: 1.2 },
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

function FloatingCard({ data }: { data: any }) {
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
      className="absolute glass-panel p-4 flex flex-col items-center justify-center min-w-[120px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10"
      style={{
        top: data.top,
        bottom: data.bottom,
        left: data.left,
        right: data.right,
      }}
    >
      <span className="text-xs text-muted-foreground font-medium mb-1">{data.lang}</span>
      <div className="h-8 flex items-center justify-center overflow-hidden">
        <motion.span
          key={showTranslation ? 'translation' : 'original'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-lg font-bold text-white"
        >
          {showTranslation ? data.translation : data.text}
        </motion.span>
      </div>
    </motion.div>
  );
}
