import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      {/* Aurora Mesh Gradients */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-30 mix-blend-screen filter blur-[100px] animate-aurora"
        style={{
          background: 'radial-gradient(circle, rgba(91,95,255,0.8) 0%, rgba(124,77,255,0) 70%)',
        }}
      />
      <div 
        className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full opacity-20 mix-blend-screen filter blur-[120px] animate-aurora"
        style={{
          background: 'radial-gradient(circle, rgba(0,207,255,0.8) 0%, rgba(0,207,255,0) 70%)',
          animationDelay: '-5s'
        }}
      />
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-full opacity-20 mix-blend-screen filter blur-[150px] animate-aurora"
        style={{
          background: 'radial-gradient(circle, rgba(91,95,255,0.5) 0%, rgba(124,77,255,0) 70%)',
          animationDelay: '-10s'
        }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />
    </div>
  );
}
