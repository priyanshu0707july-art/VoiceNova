"use client";

import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function InteractiveWhiteboard() {
  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <Tldraw persistenceKey="linguaverse-board" />
    </div>
  );
}
