import { PlaySquare } from 'lucide-react';

export default function RecordingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Recordings</h1>
      
      <div className="glass-panel p-10 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <PlaySquare className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-white mb-1">No recordings found</h3>
        <p className="text-muted-foreground text-sm max-w-sm mb-6">
          When you record your translated meetings, they will appear here.
        </p>
        <button className="text-primary hover:text-primary/80 font-medium text-sm">
          Go to Meetings
        </button>
      </div>
    </div>
  );
}
