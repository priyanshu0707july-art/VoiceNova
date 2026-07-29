"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function DemoSection() {
  return (
    <section id="demo" className="w-full max-w-6xl mx-auto px-6 py-32 relative z-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full aspect-video rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-[0_0_100px_rgba(91,95,255,0.3)] relative group"
      >
        {/* Interactive Mockup Content */}
        <div className="absolute inset-0 bg-background/80 flex flex-col">
          {/* Top Bar */}
          <div className="h-12 border-b border-white/10 flex items-center px-4 bg-black/40">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-sm text-white/50 font-medium font-mono">meeting.linguaverse.ai</div>
          </div>
          
          {/* Video Grid Mockup */}
          <div className="flex-1 p-4 grid grid-cols-2 gap-4">
            {/* User A */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50">
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="User A" className="w-full h-full object-cover opacity-80" />
               <div className="absolute bottom-4 left-4 right-4 text-center">
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }}
                   className="inline-block bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white font-medium text-sm md:text-base border border-white/20"
                 >
                   Bonjour, comment ça va aujourd'hui?
                 </motion.div>
               </div>
            </div>
            
            {/* User B */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50">
               <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="User B" className="w-full h-full object-cover opacity-80" />
               <div className="absolute bottom-4 left-4 right-4 text-center">
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", delay: 2 }}
                   className="inline-block bg-primary/80 backdrop-blur-md px-4 py-2 rounded-lg text-white font-medium text-sm md:text-base border border-white/20"
                 >
                   Hello, how are you doing today?
                 </motion.div>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
