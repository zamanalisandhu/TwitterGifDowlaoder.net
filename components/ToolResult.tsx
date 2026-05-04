"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Loader2, 
  ImageIcon, 
  Film 
} from "lucide-react";
import { ApiResponse } from '@/lib/api';

interface ToolResultProps {
  result: ApiResponse;
  downloadingGif: string | null;
  onGifDownload: (url: string) => Promise<void>;
  onClear: () => void;
}

export default function ToolResult({ result, downloadingGif, onGifDownload, onClear }: ToolResultProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 max-w-2xl mx-auto px-4 w-full"
    >
      <div className="bg-[#0F0F18] border border-white/10 rounded-2xl overflow-hidden text-left shadow-2xl">
        <div className="bg-green-500/10 border-b border-green-500/20 px-4 sm:px-5 py-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" aria-hidden="true" />
          <p className="text-green-300 text-xs sm:text-sm font-medium">GIF found! Choose your format below.</p>
        </div>

        <div className="p-4 sm:p-5">
          {result.thumbnail && (
            <div className="mb-5 rounded-xl overflow-hidden bg-black/40 border border-white/5 relative aspect-video">
              <Image
                src={result.thumbnail}
                alt={result.title || 'Twitter GIF preview'}
                fill
                className="object-contain"
                unoptimized={result.thumbnail.includes('twimg.com')}
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}

          <div className="space-y-3">
            {result.videos?.map((video, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] sm:text-xs font-semibold text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                    {video.resolution}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500">High Quality</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => onGifDownload(video.source_url)}
                    disabled={downloadingGif === video.source_url}
                    className="min-h-[44px] bg-gradient-to-r from-[#8B5CF6] to-[#7c3aed] text-white text-sm font-semibold px-4 py-3 rounded-lg hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    {downloadingGif === video.source_url ? (
                      <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /><span>Converting...</span></>
                    ) : (
                      <><ImageIcon className="w-4 h-4" aria-hidden="true" /><span>Download GIF</span></>
                    ) }
                  </button>

                  <a
                    href={video.download_url}
                    download="twitter-gif.mp4"
                    className="min-h-[44px] bg-gradient-to-r from-[#1DA1F2] to-[#1a8cd8] text-white text-sm font-semibold px-4 py-3 rounded-lg hover:opacity-90 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <Film className="w-4 h-4" aria-hidden="true" />
                    <span>Download MP4</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onClear}
            className="mt-4 w-full text-center text-[10px] sm:text-xs text-gray-500 hover:text-gray-300 py-2 transition-colors"
          >
            Download another GIF →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
