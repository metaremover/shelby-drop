'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { HardDrive, Download, Play, CheckCircle2, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { formatBytes } from '@/lib/shelby';
import Link from 'next/link';

export default function DownloadPage() {
  const params = useParams();
  const blobId = (params?.id as string) || 'shelby_blob_demo';

  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [previewing, setPreviewing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const mockBlob = {
    blobId,
    blobName: 'neural_network_weights_4k_dataset.bin',
    sizeBytes: 2450000000,
    uploadedAt: Date.now() - 1000 * 60 * 18,
    chunkCount: 490,
    ownerAddress: '0x94f1...c28e',
    shelbyNodeEndpoint: 'node-us-east.shelbynet.shelby.xyz',
    latencyMs: 114,
  };

  const handleStartDownload = () => {
    setDownloading(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleInstantPreview = () => {
    setPreviewing(true);
    setTimeout(() => {
      setPreviewing(false);
      alert('⚡ Byte-Range HTTP Request Success! Received initial 5MB stream chunk in 114ms from Shelbynet node.');
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-obsidian-900 flex flex-col relative overflow-hidden">
      <Navbar />

      <div className="w-full max-w-3xl mx-auto px-6 py-12 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-obsidian-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to ShelbyDrop Upload</span>
        </Link>

        <div className="silk-panel rounded-4xl p-10 border border-cream-300/80 shadow-silk relative">
          <div className="flex items-start justify-between border-b border-cream-200/80 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-3xl bg-cream-100 border border-cream-200 text-obsidian-900 shadow-sm">
                <HardDrive className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-obsidian-900 mb-1">{mockBlob.blobName}</h1>
                <p className="text-xs text-slate-500 font-mono">
                  {formatBytes(mockBlob.sizeBytes)} • {mockBlob.chunkCount} Erasure Chunks
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-medium text-emerald-700 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              Verified On-Chain
            </span>
          </div>

          {/* Node Metadata Card */}
          <div className="bg-cream-50 border border-cream-200/80 rounded-3xl p-5 mb-8 font-mono text-xs space-y-2.5 text-slate-700 shadow-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Blob Hash Identifier:</span>
              <span className="text-obsidian-900 font-bold">{mockBlob.blobId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Shelby Storage Node:</span>
              <span className="text-champagne-600 font-medium">{mockBlob.shelbyNodeEndpoint}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sub-Second TTFB Latency:</span>
              <span className="text-emerald-700 font-bold">{mockBlob.latencyMs} ms</span>
            </div>
          </div>

          {/* Download & Preview Actions */}
          <div className="flex flex-col gap-4">
            {downloading && (
              <div className="w-full bg-cream-50 border border-cream-200 rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between text-xs text-slate-700 mb-2.5 font-mono">
                  <span>Downloading multi-threaded stream...</span>
                  <span className="text-champagne-600 font-bold">{downloadProgress}%</span>
                </div>
                <div className="h-3 w-full bg-cream-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-champagne-500 to-amber-600 transition-all duration-150"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {completed ? (
              <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-center font-medium text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>File Download Completed Successfully!</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleStartDownload}
                  disabled={downloading}
                  className="px-6 py-4 rounded-full bg-obsidian-900 hover:bg-obsidian-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4 text-champagne-400" />
                  <span>{downloading ? 'Streaming Bytes...' : 'Multi-Thread Download'}</span>
                </button>

                <button
                  onClick={handleInstantPreview}
                  disabled={previewing}
                  className="px-6 py-4 rounded-full bg-cream-100 border border-cream-300 hover:bg-cream-200/60 text-obsidian-900 font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Play className="w-4 h-4 text-champagne-600" />
                  <span>{previewing ? 'Fetching Chunk...' : 'Instant Byte-Range Preview'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
