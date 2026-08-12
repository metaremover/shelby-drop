'use client';

import { formatBytes, ShelbyBlobMetadata } from '@/lib/shelby';
import { HardDrive, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

const INITIAL_RECENT_DROPS: ShelbyBlobMetadata[] = [
  {
    blobId: 'shelby_blob_9f82a1_1723501',
    blobName: 'llama-3-8b-instruct-quantized.gguf',
    sizeBytes: 4680000000,
    chunkCount: 936,
    uploadedAt: Date.now() - 1000 * 60 * 12,
    ownerAddress: '0x3a82...91b4',
    erasureCodingProfile: 'Reed-Solomon (8+4)',
    shelbyNodeEndpoint: 'node-us-east.shelbynet.shelby.xyz',
    latencyMs: 112,
  },
  {
    blobId: 'shelby_blob_4e19c0_1723490',
    blobName: 'hyperion_cyberpunk_render_4k_60fps.prores',
    sizeBytes: 1840000000,
    chunkCount: 368,
    uploadedAt: Date.now() - 1000 * 60 * 45,
    ownerAddress: '0x71e9...20ac',
    erasureCodingProfile: 'Reed-Solomon (8+4)',
    shelbyNodeEndpoint: 'node-eu-central.shelbynet.shelby.xyz',
    latencyMs: 142,
  },
  {
    blobId: 'shelby_blob_2b73f8_1723460',
    blobName: 'autonomous_agent_memory_vector_shard_04.bin',
    sizeBytes: 850000000,
    chunkCount: 170,
    uploadedAt: Date.now() - 1000 * 60 * 120,
    ownerAddress: '0x12c4...ff89',
    erasureCodingProfile: 'Reed-Solomon (8+4)',
    shelbyNodeEndpoint: 'node-ap-southeast.shelbynet.shelby.xyz',
    latencyMs: 98,
  },
];

interface RecentDropsProps {
  userBlobs?: ShelbyBlobMetadata[];
}

export function RecentDrops({ userBlobs = [] }: RecentDropsProps) {
  const allDrops = [...userBlobs, ...INITIAL_RECENT_DROPS];

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 mb-20 px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-obsidian-900 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-champagne-600 stroke-[1.75]" />
            <span>Recent Shelbynet Drops</span>
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">Live feed of verified hot-storage blobs</p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-cream-300/80 text-obsidian-800 text-xs font-mono shadow-sm">
          <Zap className="w-3.5 h-3.5 text-champagne-600" />
          <span>Avg Latency: 118ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {allDrops.map((drop) => (
          <div
            key={drop.blobId}
            className="silk-panel silk-panel-hover rounded-3xl p-6 border border-cream-300/70 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-cream-100 border border-cream-200 text-obsidian-800">
                  <HardDrive className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-700 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                  {drop.latencyMs}ms TTFB
                </span>
              </div>

              <h3 className="text-sm font-bold text-obsidian-900 truncate mb-1" title={drop.blobName}>
                {drop.blobName}
              </h3>
              <p className="text-xs font-mono text-slate-500 mb-4">
                {formatBytes(drop.sizeBytes)} • {drop.chunkCount} Chunks
              </p>
            </div>

            <div className="border-t border-cream-200/80 pt-3.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {drop.ownerAddress}
              </span>
              <a
                href={`/download/${drop.blobId}`}
                className="text-champagne-600 hover:text-champagne-700 flex items-center gap-1 font-sans font-semibold text-xs transition-colors"
              >
                <span>View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
