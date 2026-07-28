import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      
      <div className="w-full max-w-md p-8 glass-panel border border-white/10 rounded-2xl flex flex-col items-center">
        <div className="text-2xl font-bold tracking-tighter text-white mb-2">LinguaVerse<span className="text-primary">AI</span></div>
        <p className="text-muted-foreground mb-8 text-sm">Welcome back. Please log in to your account.</p>
        
        <div className="w-full space-y-4">
          <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-12">
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-12">
            Continue with GitHub
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#050816] px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          {/* Email/Password form mock */}
          <div className="space-y-4">
            <input type="email" placeholder="name@example.com" className="w-full h-12 px-4 rounded-lg bg-input border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="password" placeholder="Password" className="w-full h-12 px-4 rounded-lg bg-input border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <Link href="/dashboard" className="w-full">
              <Button type="button" className="w-full primary-glow h-12">Log In</Button>
            </Link>
          </div>
        </div>
        
        <p className="mt-6 text-sm text-muted-foreground">
          Don&apos;t have an account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
