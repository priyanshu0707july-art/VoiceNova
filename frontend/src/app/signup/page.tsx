import React from 'react';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';
import AuthForm from '@/components/auth/AuthForm';
import AnimatedBackground from '@/components/landing/AnimatedBackground';

export const metadata = {
  title: 'Sign Up | LinguaVerse AI',
  description: 'Create your LinguaVerse AI account.',
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen w-full flex bg-[#050816] relative overflow-hidden">
      <AnimatedBackground />
      <AuthBrandPanel />
      <AuthForm mode="signup" />
    </main>
  );
}
