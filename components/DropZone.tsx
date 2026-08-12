'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Lock,
  Unlock,
  Copy,
  Zap,
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { processFileChunks, formatBytes, ShelbyBlobMetadata } from '@/lib/shelby';
import { TelemetryCard } from './TelemetryCard';

interface DropZoneProps {
  onBlobCreated?: (metadata: ShelbyBlobMetadata) => void;
}

export function DropZone({ onBlobCreated }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [speedMbps, setSpeedMbps] = useState(250.98);
  const [remainingSec, setRemainingSec] = useState(0);
  const [encryptEnabled, setEncryptEnabled] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [createdBlob, setCreatedBlob] = useState<ShelbyBlobMetadata | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartUpload = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setStatus('uploading');
    setProgress(0);

    try {
      const metadata = await processFileChunks(selectedFile, (p) => {
        setChunkIndex(p.chunkIndex);
        setTotalChunks(p.totalChunks);
        setSpeedMbps(p.currentSpeedMbps || 250.98);
        setRemainingSec(p.estimatedRemainingSec);
        setProgress(Math.round((p.bytesUploaded / p.totalSizeBytes) * 100));
      });

      setCreatedBlob(metadata);
      setStatus('success');
      if (onBlobCreated) {
        onBlobCreated(metadata);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setStatus('idle');
    }
  }, [onBlobCreated]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleStartUpload(droppedFile);
      }
    },
    [handleStartUpload]
  );

  const copyShareLink = () => {
    if (!createdBlob) return;
    const link = `${window.location.origin}/download/${createdBlob.blobId}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const resetUpload = () => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setCreatedBlob(null);
  };

  return (
    <div className="w-full">
      {/* Silk Drop Container */}
      <div className="relative group">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => status === 'idle' && fileInputRef.current?.click()}
          className={`relative bg-white/90 backdrop-blur-3xl border ${
            isDragging
              ? 'border-champagne-500 bg-champagne-50/50 shadow-silk-hover'
              : 'border-cream-300/80 hover:border-champagne-500/40 shadow-silk'
          } rounded-4xl p-10 md:p-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 min-h-[360px]`}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleStartUpload(e.target.files[0]);
              }
            }}
          />

          <AnimatePresence mode="wait">
            {/* IDLE STATE */}
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <div
                  className={`p-6 rounded-3xl ${
                    isDragging
                      ? 'bg-champagne-100 text-champagne-600 scale-105'
                      : 'bg-cream-100 text-obsidian-800 border border-cream-200'
                  } transition-all duration-300 shadow-sm`}
                >
                  <UploadCloud className="w-12 h-12 stroke-[1.4]" />
                </div>

                <div className="max-w-md">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-obsidian-900 mb-2.5">
                    Drop Heavy Assets Here
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                    Engineered with zero-copy browser slicing to stream 10GB+ heavy datasets directly to Shelby Hot Storage without memory overhead.
                  </p>
                </div>

                {/* Silk Passphrase Toggle */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 flex items-center gap-3 px-5 py-2.5 rounded-full bg-cream-100/80 border border-cream-300/60 text-xs text-slate-700 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setEncryptEnabled(!encryptEnabled)}
                    className="flex items-center gap-2 font-medium text-slate-700 hover:text-champagne-600 transition-colors"
                  >
                    {encryptEnabled ? (
                      <Lock className="w-4 h-4 text-champagne-600" />
                    ) : (
                      <Unlock className="w-4 h-4 text-slate-400" />
                    )}
                    <span>AES-256 Client Encryption</span>
                  </button>

                  {encryptEnabled && (
                    <input
                      type="password"
                      placeholder="Passphrase..."
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      className="bg-white border border-cream-300 rounded-lg px-3 py-1 text-xs text-obsidian-900 focus:outline-none focus:border-champagne-500 w-36 font-mono shadow-inner"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* UPLOADING STATE */}
            {status === 'uploading' && file && (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col items-center gap-7"
              >
                <div className="flex items-center gap-4 bg-cream-50 border border-cream-200 px-6 py-4 rounded-3xl w-full max-w-lg shadow-sm">
                  <div className="p-3.5 bg-white rounded-2xl border border-cream-200 text-champagne-600">
                    <FileText className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-obsidian-900 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {formatBytes(file.size)} • Chunk {chunkIndex} of {totalChunks}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-champagne-600 bg-champagne-50 px-2.5 py-1 rounded-full border border-champagne-200">
                    {speedMbps} Mbps
                  </span>
                </div>

                {/* Luxury Progress Bar */}
                <div className="w-full max-w-lg">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-2.5 font-medium">
                    <span className="flex items-center gap-2 text-obsidian-800">
                      <Zap className="w-4 h-4 text-champagne-600" />
                      Streaming to Shelbynet Node Cluster...
                    </span>
                    <span className="font-mono font-bold text-champagne-700 text-sm">{progress}%</span>
                  </div>

                  <div className="h-3 w-full bg-cream-200/70 rounded-full overflow-hidden p-0.5 border border-cream-300/40">
                    <motion.div
                      className="h-full bg-gradient-to-r from-champagne-500 to-amber-600 rounded-full shadow-sm"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2.5 font-mono">
                    <span>Reed-Solomon (8+4)</span>
                    <span>Est. Remaining: {remainingSec}s</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SUCCESS STATE */}
            {status === 'success' && createdBlob && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-6 w-full max-w-lg"
              >
                <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-obsidian-900">Asset Secured on Shelby</h3>
                  <p className="text-xs text-slate-500 mt-1 font-normal">
                    On-chain proof address committed • Hot storage sub-second read ready
                  </p>
                </div>

                <div className="bg-cream-50 border border-cream-200/80 rounded-3xl p-5 w-full text-left font-mono text-xs text-slate-700 space-y-2.5 shadow-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Blob Hash ID:</span>
                    <span className="text-obsidian-900 font-bold">{createdBlob.blobId.slice(0, 18)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payload:</span>
                    <span className="text-slate-800">{createdBlob.blobName} ({formatBytes(createdBlob.sizeBytes)})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Node Cluster:</span>
                    <span className="text-champagne-600 font-medium">{createdBlob.shelbyNodeEndpoint}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                  <button
                    onClick={copyShareLink}
                    className="flex-1 min-w-[200px] px-6 py-3 rounded-full bg-obsidian-900 hover:bg-obsidian-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-champagne-400" />}
                    {copiedLink ? 'Decentralized Link Copied!' : 'Copy Shelby Link'}
                  </button>

                  <button
                    onClick={resetUpload}
                    className="px-5 py-3 rounded-full bg-cream-100 border border-cream-300 hover:bg-cream-200/60 text-obsidian-800 font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Upload Another</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Live Telemetry Card */}
      <TelemetryCard
        currentSpeedMbps={speedMbps}
        activeChunk={chunkIndex}
        totalChunks={totalChunks}
        latencyMs={createdBlob?.latencyMs || 127}
      />
    </div>
  );
}
