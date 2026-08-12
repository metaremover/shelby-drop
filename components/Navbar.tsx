'use client';

import { useState } from 'react';
import { HardDrive, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export function Navbar() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const toggleWallet = () => {
    if (!connected) {
      const mockAddress = '0x8f3c...' + Math.floor(1000 + Math.random() * 9000);
      setWalletAddress(mockAddress);
      setConnected(true);
    } else {
      setConnected(false);
      setWalletAddress('');
    }
  };

  return (
    <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-8 px-6 relative z-20">
      {/* Brand Logo & Tagline */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-white border border-cream-300/80 shadow-sm flex items-center justify-center">
          <HardDrive className="w-5 h-5 text-obsidian-900 stroke-[1.75]" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-obsidian-900 flex items-center gap-2">
            Shelby<span className="text-champagne-600 font-serif italic font-normal">Drop</span>
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-champagne-100 border border-champagne-500/20 text-champagne-700">
              Shelbynet-1
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Cloud-Grade Hot Storage Protocol</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <a
          href="https://explorer.shelby.xyz"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/70 border border-cream-300/70 hover:bg-white text-xs font-semibold text-slate-700 shadow-sm transition-all"
        >
          <span>Shelby Explorer</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <button
          onClick={toggleWallet}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-300 shadow-sm ${
            connected
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-obsidian-900 hover:bg-obsidian-800 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
          {connected ? walletAddress : 'Connect Petra Wallet'}
        </button>
      </div>
    </header>
  );
}
