"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaGithub } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const isSignup = mode === 'signup';

  const requirements = [
    { id: 'length', text: '8 Characters', regex: /.{8,}/ },
    { id: 'number', text: 'Number', regex: /[0-9]/ },
    { id: 'uppercase', text: 'Uppercase', regex: /[A-Z]/ },
    { id: 'symbol', text: 'Symbol', regex: /[^A-Za-z0-9]/ },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignup) {
        const isValidPassword = requirements.every(req => req.regex.test(password));
        if (!isValidPassword) {
          throw new Error("Please meet all password requirements.");
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });

        if (signUpError) throw signUpError;
        router.push('/dashboard');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (googleError) throw googleError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-[55%] h-full p-6 md:p-12 relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[rgba(18,22,35,0.75)] backdrop-blur-2xl rounded-[28px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-8 md:p-10 relative overflow-hidden"
      >
        {/* Top Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-white/90 tracking-wide">🌐 120+ Languages Available</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-muted-foreground">
            {isSignup ? 'Start your journey with LinguaVerse AI.' : 'Continue your journey with LinguaVerse AI.'}
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-0.5 w-12 bg-gradient-to-r from-primary to-cyan-400 mx-auto mt-4 rounded-full"
          />
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Social Logins */}
        <div className="space-y-3 mb-8">
          <SocialButton onClick={handleGoogleLogin} icon={<FcGoogle className="w-5 h-5" />} text="Continue with Google" />
          <SocialButton icon={<FaGithub className="w-5 h-5" />} text="Continue with GitHub" disabled />
          <SocialButton icon={<FaApple className="w-5 h-5" />} text="Continue with Apple (Soon)" disabled />
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="bg-[rgb(18,22,35)] px-4 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div className="space-y-1 relative group">
              <label className="text-sm font-medium text-white/90 pl-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  type="text" 
                  placeholder="Elon Musk"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/10 pl-11 h-12 text-base text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all rounded-xl"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="space-y-1 relative group">
            <label className="text-sm font-medium text-white/90 pl-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 pl-11 h-12 text-base text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-1 relative group">
            <label className="text-sm font-medium text-white/90 pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 pl-11 pr-11 h-12 text-base text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all rounded-xl"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password Strength (Signup only) */}
          {isSignup && password.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-2 pb-1"
            >
              <div className="flex gap-1 h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                {requirements.map((req) => {
                  const isValid = req.regex.test(password);
                  return (
                    <motion.div 
                      key={req.id}
                      initial={false}
                      animate={{
                        backgroundColor: isValid ? '#22C55E' : '#334155',
                        flex: isValid ? 1 : 0.5
                      }}
                      className="h-full"
                    />
                  )
                })}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {requirements.map((req) => {
                  const isValid = req.regex.test(password);
                  return (
                    <div key={req.id} className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isValid ? 'text-green-500' : 'text-muted-foreground'}`} />
                      <span className={`text-xs ${isValid ? 'text-white' : 'text-muted-foreground'}`}>
                        {req.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#6D5BFF] via-[#4D8DFF] to-[#00D4FF] hover:from-[#5A48EB] hover:via-[#3A7AEB] hover:to-[#00C1EB] text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(109,91,255,0.3)] hover:shadow-[0_0_30px_rgba(109,91,255,0.5)] group mt-4"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                {isSignup ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-2 rounded-lg border border-white/5">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Your data is protected with <span className="text-green-500">end-to-end encryption</span>.</span>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
          <Link 
            href={isSignup ? '/login' : '/signup'} 
            className="text-white hover:text-primary font-medium transition-colors border-b border-transparent hover:border-primary"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </Link>
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Support</Link>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon, text, disabled = false, onClick }: { icon: React.ReactNode; text: string; disabled?: boolean; onClick?: () => void }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-3 h-11 rounded-xl bg-white/5 border border-white/10 text-white font-medium transition-all group overflow-hidden relative ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] active:scale-[0.99]'}`}
    >
      {/* Hover gradient effect */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-100%] group-hover:translate-x-[100%] duration-1000 ease-in-out" />
      )}
      {icon}
      <span>{text}</span>
    </button>
  )
}
