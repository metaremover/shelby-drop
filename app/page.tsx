'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { DropZone } from '@/components/DropZone';
import { RecentDrops } from '@/components/RecentDrops';
import { ShelbyBlobMetadata } from '@/lib/shelby';
import { Zap, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [userBlobs, setUserBlobs] = useState<ShelbyBlobMetadata[]>([]);

  const handleBlobCreated = (metadata: ShelbyBlobMetadata) => {
    setUserBlobs((prev) => [metadata, ...prev]);
  };

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-obsidian-900 flex flex-col relative overflow-hidden selection:bg-champagne-500 selection:text-white">
      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-champagne-100/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[160px] pointer-events-none" />

      {/* Navbar Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto text-center pt-6 pb-6 px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-cream-300/80 text-xs font-semibold text-champagne-700 mb-6 shadow-sm backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-champagne-600" />
          <span>High-Throughput Hot Storage Protocol for AI Datasets & 4K Media</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-obsidian-900 leading-[1.1] mb-5">
          Decentralized AirDrop for{' '}
          <span className="font-serif italic font-normal text-champagne-600 underline decoration-champagne-300 underline-offset-8">
            Heavy Assets
          </span>
        </h1>

        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Upload multi-gigabyte files cleanly without browser memory exhaustion. Powered by zero-copy chunk streaming and sub-second erasure-coded reads on <strong className="text-obsidian-900 font-semibold">Shelbynet</strong>.
        </p>
      </section>

      {/* Core Interactive DropZone Component */}
      <section className="w-full max-w-4xl mx-auto px-6 relative z-10 mb-8">
        <DropZone onBlobCreated={handleBlobCreated} />
      </section>

      {/* Recent Shelbynet Feed */}
      <section className="relative z-10">
        <RecentDrops userBlobs={userBlobs} />
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-cream-300/70 py-10 text-center text-xs text-slate-500 relative z-10 bg-white/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ShelbyDrop • Built for Shelby Production Early Access Submission</p>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <a href="https://docs.shelby.xyz" target="_blank" rel="noreferrer" className="hover:text-champagne-600 transition-colors">
              Shelby Docs
            </a>
            <span>•</span>
            <a href="https://developers.shelby.xyz" target="_blank" rel="noreferrer" className="hover:text-champagne-600 transition-colors">
              Developer Portal
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
