import { Lock, Unlock, Users, MicOff, UserCog, X } from 'lucide-react';
import { useState } from 'react';

export default function HostControlsModal({ onClose }: { onClose: () => void }) {
  const [isLocked, setIsLocked] = useState(false);
  const [isWaitingRoom, setIsWaitingRoom] = useState(false);
  const [isVoiceCloning, setIsVoiceCloning] = useState(false);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0b101e] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-primary/20 p-1.5 rounded-lg">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Host Security & Meeting Controls</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Security & Access</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsLocked(!isLocked)}
                className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${isLocked ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
              >
                {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                <div className="text-left">
                  <div className="font-semibold">Lock Meeting</div>
                  <div className="text-xs opacity-70">Prevent new participants from joining</div>
                </div>
              </button>

              <button 
                onClick={() => setIsWaitingRoom(!isWaitingRoom)}
                className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${isWaitingRoom ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
              >
                <Users className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Waiting Room</div>
                  <div className="text-xs opacity-70">Host approval required to enter</div>
                </div>
              </button>
            </div>

            <button 
              onClick={() => setIsVoiceCloning(!isVoiceCloning)}
              className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${isVoiceCloning ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
            >
              <UserCog className="w-5 h-5" />
              <div className="text-left flex-1">
                <div className="font-semibold">Voice Cloning</div>
                <div className="text-xs opacity-70">Use cloned voice for translation</div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isVoiceCloning ? 'bg-primary' : 'bg-white/20'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isVoiceCloning ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Audio & Moderator Tools</h3>
            <button className="w-full py-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 font-medium flex items-center justify-center gap-2 transition-colors">
              <MicOff className="w-5 h-5" />
              Mute All Participants
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex justify-end bg-black/20">
          <button onClick={onClose} className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
            Close Controls
          </button>
        </div>
      </div>
    </div>
  );
}
