import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { X } from 'lucide-react';

export default function WhiteboardOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col">
      <div className="h-12 bg-black/50 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
        <div className="text-white font-medium flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          Collaborative Whiteboard
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 relative tldraw-wrapper">
        {/* tldraw comes with its own light/dark mode based on system, but we can force dark mode using tldraw props if needed */}
        <Tldraw autoFocus />
      </div>
    </div>
  );
}
