"use client";

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { label: 'Languages', value: 120, suffix: '+' },
  { label: 'Latency', value: 300, prefix: '<', suffix: 'ms' },
  { label: 'Accuracy', value: 99.8, suffix: '%' },
  { label: 'Conversations', value: 50, suffix: 'K+' },
];

export default function StatisticsSection() {
  return (
    <section id="stats" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: { label: string, value: number, prefix?: string, suffix?: string }, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center p-6 glass-panel group hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-2">
        {stat.prefix}{count % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{stat.suffix}
      </div>
      <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm group-hover:text-primary transition-colors">
        {stat.label}
      </div>
    </motion.div>
  );
}
