"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import createGlobe from 'cobe';
import { Globe2, Zap, Shield, Sparkles, Star } from 'lucide-react';

const features = [
  { title: '120+ Languages', icon: Globe2, color: 'text-primary' },
  { title: 'Ultra-low Latency', icon: Zap, color: 'text-yellow-400' },
  { title: 'AI Powered Translation', icon: Sparkles, color: 'text-purple-400' },
  { title: 'End-to-End Encryption', icon: Shield, color: 'text-green-400' },
];

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex flex-col w-[45%] h-full p-12 relative overflow-hidden">
      {/* Logo */}
      <div className="relative z-20 mb-12">
        <div className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          LinguaVerse<span className="text-primary">AI</span>
        </div>
      </div>

      {/* Headlines */}
      <div className="relative z-20 max-w-lg mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
        >
          Speak Freely.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-cyan-400">
            Connect Globally.
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          Real-time AI translation that lets anyone communicate naturally across 120+ languages.
        </motion.p>
      </div>

      {/* Globe Area */}
      <div className="flex-1 relative min-h-[300px] -mx-12">
        <CobeGlobe />
        <FloatingLanguageBubbles />
      </div>

      {/* Features & Social Proof */}
      <div className="relative z-20 mt-auto pt-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="glass-panel rounded-xl p-4 flex items-center gap-3 border border-white/5 hover:border-white/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <span className="text-sm font-medium text-white/90">{feature.title}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="flex -space-x-3">
            {avatars.map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt="User avatar" 
                className="w-10 h-10 rounded-full border-2 border-[#050816] object-cover"
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              ))}
              <span className="text-white font-bold ml-1">4.9/5</span>
            </div>
            <div className="text-sm text-muted-foreground">Trusted by 50K+ users worldwide</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    
    if (!canvasRef.current) return;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.8],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.0060], size: 0.1 },
      ],
      // @ts-ignore
      onRender: (state: Record<string, any>) => {
        state.phi = phi
        phi += 0.005
      }
    })
    
    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-screen -right-1/4">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  )
}

const authLanguages = [
  { id: 1, text: 'Hello!', lang: 'English', flag: 'us', top: '10%', right: '10%', delay: 0 },
  { id: 2, text: 'नमस्ते', lang: 'Hindi', flag: 'in', top: '30%', left: '15%', delay: 0.5 },
  { id: 3, text: 'こんにちは', lang: 'Japanese', flag: 'jp', bottom: '20%', right: '25%', delay: 1 },
];

function FloatingLanguageBubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {authLanguages.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{ 
            opacity: { delay: item.delay, duration: 0.8 },
            scale: { delay: item.delay, duration: 0.8 },
            y: { repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" }
          }}
          className="absolute glass-panel px-4 py-2 rounded-full flex items-center gap-3 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] bg-[#0B0F1A]/80 backdrop-blur-md"
          style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right }}
        >
          <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-white/10 border border-white/20">
             <img src={`https://flagcdn.com/${item.flag}.svg`} alt={`${item.lang} flag`} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-medium text-white">{item.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
