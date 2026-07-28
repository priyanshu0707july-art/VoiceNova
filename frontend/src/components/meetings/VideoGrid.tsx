'use client';

import { Track } from 'livekit-client';
import { 
  useTracks, 
  ParticipantTile, 
  RoomAudioRenderer,
  ControlBar,
  useConnectionState
} from '@livekit/components-react';
import '@livekit/components-styles';

export default function VideoGrid() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  
  const connectionState = useConnectionState();

  if (connectionState === 'connecting') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-background relative overflow-hidden rounded-2xl border border-border glass-panel shadow-2xl">
      {/* Video Grid */}
      <div className="flex-1 p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {tracks.map((trackRef) => (
          <ParticipantTile
            key={trackRef.participant.identity + trackRef.source}
            trackRef={trackRef}
            className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/40 backdrop-blur-sm"
          />
        ))}
        {tracks.length === 0 && (
          <div className="col-span-full h-full flex flex-col items-center justify-center text-muted-foreground">
             Waiting for others to join...
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="h-20 shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
        <ControlBar 
          variation="minimal" 
          controls={{ microphone: true, camera: true, screenShare: true, chat: false, leave: true }}
          className="lk-glass-control-bar"
        />
      </div>
      
      <RoomAudioRenderer />
    </div>
  );
}
