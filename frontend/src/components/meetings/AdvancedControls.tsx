import { MessageSquare, Presentation, Shield, Smile } from 'lucide-react';
import { useState } from 'react';
import { socket } from '@/lib/socket';

export default function AdvancedControls({ 
  onToggleChat, 
  onToggleWhiteboard, 
  onOpenSettings 
}: { 
  onToggleChat: () => void,
  onToggleWhiteboard: () => void,
  onOpenSettings: () => void
}) {
  const [showEmojis, setShowEmojis] = useState(false);

  const emojis = ['👍', '❤️', '😂', '😮', '👏', '🎉'];

  const sendReaction = (emoji: string) => {
    socket.emit('reaction', { emoji });
    setShowEmojis(false);
  };

  return (
    <div className="absolute bottom-8 right-8 z-[200] flex items-center gap-3">
      {/* Emoji Picker Popup */}
      {showEmojis && (
        <div className="absolute bottom-16 right-0 bg-black/80 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl flex gap-2 animate-in slide-in-from-bottom-2">
          {emojis.map(emoji => (
            <button 
              key={emoji} 
              onClick={() => sendReaction(emoji)}
              className="text-2xl hover:scale-125 transition-transform bg-white/5 hover:bg-white/10 p-2 rounded-xl"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="bg-black/60 backdrop-blur-xl p-2 rounded-2xl border border-white/10 flex items-center gap-2 shadow-2xl">
        <button 
          onClick={() => setShowEmojis(!showEmojis)}
          className="p-3 rounded-xl hover:bg-white/10 text-white transition-colors group relative"
        >
          <Smile className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
        </button>
        
        <div className="w-px h-8 bg-white/10 mx-1"></div>

        <button 
          onClick={onToggleWhiteboard}
          className="p-3 rounded-xl hover:bg-white/10 text-white transition-colors"
          title="Collaborative Whiteboard"
        >
          <Presentation className="w-5 h-5" />
        </button>
        
        <button 
          onClick={onToggleChat}
          className="p-3 rounded-xl hover:bg-white/10 text-white transition-colors"
          title="Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        <button 
          onClick={onOpenSettings}
          className="p-3 rounded-xl hover:bg-white/10 text-white transition-colors"
          title="Host Controls"
        >
          <Shield className="w-5 h-5 text-green-400" />
        </button>
      </div>
    </div>
  );
}
