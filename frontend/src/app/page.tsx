import React from 'react';
import SmoothScrollProvider from '@/components/landing/SmoothScrollProvider';
import AnimatedBackground from '@/components/landing/AnimatedBackground';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import StatisticsSection from '@/components/landing/StatisticsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import DemoSection from '@/components/landing/DemoSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col items-center relative bg-transparent">
        <AnimatedBackground />
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <HeroSection />
          <DemoSection />
          <StatisticsSection />
          <FeaturesSection />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

