import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

type EmojiReaction = {
  id: string;
  emoji: string;
  x: number;
};

export default function EmojiLayer({ roomName }: { roomName: string }) {
  const [reactions, setReactions] = useState<EmojiReaction[]>([]);

  useEffect(() => {
    const handleReaction = (data: { emoji: string }) => {
      // Generate a random x position between 10% and 90% of the screen width
      const xPos = 10 + Math.random() * 80;
      const newReaction = {
        id: Date.now().toString() + Math.random().toString(),
        emoji: data.emoji,
        x: xPos
      };
      
      setReactions(prev => [...prev, newReaction]);
      
      // Remove it after animation completes (approx 3 seconds)
      setTimeout(() => {
        setReactions(prev => prev.filter(r => r.id !== newReaction.id));
      }, 3000);
    };

    socket.on('reaction', handleReaction);
    return () => {
      socket.off('reaction', handleReaction);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {reactions.map(reaction => (
        <div
          key={reaction.id}
          className="absolute bottom-0 text-5xl animate-float-up"
          style={{ left: `${reaction.x}%` }}
        >
          {reaction.emoji}
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-up {
          0% { transform: translateY(100px) scale(0.5); opacity: 0; }
          20% { transform: translateY(0px) scale(1.2); opacity: 1; }
          80% { transform: translateY(-300px) scale(1); opacity: 1; }
          100% { transform: translateY(-400px) scale(0.8); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 3s ease-out forwards;
        }
      `}} />
    </div>
  );
}
