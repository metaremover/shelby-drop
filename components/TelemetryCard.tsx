'use client';

import { Activity, Zap, Server, Layers, ShieldCheck } from 'lucide-react';
import { SHELBYNET_CONFIG } from '@/lib/shelby';

interface TelemetryProps {
  currentSpeedMbps?: number;
  activeChunk?: number;
  totalChunks?: number;
  latencyMs?: number;
}

export function TelemetryCard({ currentSpeedMbps = 250.98, activeChunk, totalChunks, latencyMs = 127 }: TelemetryProps) {
  return (
    <div className="w-full silk-panel rounded-3xl p-6 border border-cream-300/70 my-6">
      <div className="flex items-center justify-between mb-5 border-b border-cream-200/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-champagne-600 animate-pulse" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 font-mono">
            Live Network Telemetry & Node Benchmark
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-700">Cluster Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white/90 border border-cream-200/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500">Throughput</span>
            <Zap className="w-4 h-4 text-champagne-600" />
          </div>
          <p className="text-xl font-bold font-mono text-obsidian-900">
            {currentSpeedMbps} <span className="text-xs text-champagne-600 font-sans font-medium">Mbps</span>
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Sub-second Stream</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white/90 border border-cream-200/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500">Erasure Scheme</span>
            <Layers className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-xs font-bold font-mono text-obsidian-900 mt-1">
            {SHELBYNET_CONFIG.erasureCodingScheme}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Fault-Tolerant</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white/90 border border-cream-200/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500">TTFB Latency</span>
            <Server className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold font-mono text-emerald-800">
            {latencyMs} <span className="text-xs text-emerald-600 font-sans font-medium">ms</span>
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Hot Storage Tier 1</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white/90 border border-cream-200/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500">RAM Allocation</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-bold font-mono text-amber-900">
            5.0 <span className="text-xs text-amber-700 font-sans font-medium">MB Max</span>
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Zero OOM Buffer</span>
        </div>
      </div>
    </div>
  );
}
