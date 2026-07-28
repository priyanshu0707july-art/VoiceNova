import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="w-full max-w-7xl px-6 py-6 flex justify-between items-center z-10 relative">
        <div className="text-2xl font-bold tracking-tighter text-white">LinguaVerse<span className="text-primary">AI</span></div>
        <div className="space-x-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Log In
          </Link>
          <Button className="primary-glow rounded-full px-6">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 z-10 relative w-full max-w-5xl mx-auto">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Now in Public Beta
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl">
          Speak any language.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">In real-time.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          The cinematic, AI-powered video communication platform that translates your speech and captions instantly. Break language barriers with zero latency.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button size="lg" className="primary-glow rounded-full px-8 text-base h-14">
            <Link href="/signup">Start for free</Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-14 glass-panel hover:bg-white/10 border-white/10 text-white">
            <Link href="/demo">Watch Demo</Link>
          </Button>
        </div>

        {/* Product mock glass panel */}
        <div className="mt-20 w-full max-w-4xl aspect-video glass-panel rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl flex items-center justify-center">
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
           <p className="text-muted-foreground font-medium">Interactive Demo / Product Shot UI</p>
        </div>
      </main>
    </div>
  );
}
