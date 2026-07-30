"use client";

import dynamic from 'next/dynamic';
import 'tldraw/tldraw.css';

const Tldraw = dynamic(() => import('tldraw').then((mod) => mod.Tldraw), {
  ssr: false,
});

export default function InteractiveWhiteboard() {
  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <Tldraw persistenceKey="linguaverse-board" />
    </div>
  );
}
