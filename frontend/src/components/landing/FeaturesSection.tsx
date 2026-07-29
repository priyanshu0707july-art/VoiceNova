"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Zap, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    title: 'Real-Time Translation',
    description: 'Speak in your native language, and let our AI translate it to others with zero latency.',
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Global Reach',
    description: 'Connect with over 120+ languages out of the box. No more communication barriers.',
    icon: <Globe2 className="w-6 h-6 text-accent" />,
  },
  {
    title: 'Enterprise Security',
    description: 'End-to-end encryption ensures your global meetings stay private and secure.',
    icon: <Shield className="w-6 h-6 text-green-400" />,
  },
  {
    title: 'AI Subtitles',
    description: 'Generate beautiful, perfectly-timed subtitles overlaid on your video feed instantly.',
    icon: <Sparkles className="w-6 h-6 text-secondary" />,
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Designed for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">future of work</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Everything you need to communicate across the globe, packaged into a single, breathtaking platform.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-panel p-8 group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(91,95,255,0.15)] transition-all duration-300 relative overflow-hidden"
          >
            {/* Hover Gradient Glow */}
            <div className="absolute -inset-[100%] bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
