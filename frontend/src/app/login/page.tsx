import React from 'react';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';
import AuthForm from '@/components/auth/AuthForm';
import AnimatedBackground from '@/components/landing/AnimatedBackground';

export const metadata = {
  title: 'Login | LinguaVerse AI',
  description: 'Log in to your LinguaVerse AI account.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex bg-[#050816] relative overflow-hidden">
      <AnimatedBackground />
      <AuthBrandPanel />
      <AuthForm mode="login" />
    </main>
  );
}
