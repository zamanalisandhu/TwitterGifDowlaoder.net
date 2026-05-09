"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Link2, 
  Download, 
  Loader2, 
  AlertCircle, 
  X, 
  Shield,
  Zap,
  Sparkles,
  Star
} from "lucide-react";
import { fetchTweetGif, getGifDownloadUrl, isValidTwitterUrl, ApiResponse } from '@/lib/api';
import ToolResult from "./ToolResult";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadingGif, setDownloadingGif] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    setError(null);
    setResult(null);

    const trimmed = url.trim();
    
    if (!trimmed) {
      setError('Please paste a Twitter or X URL');
      return;
    }

    if (!isValidTwitterUrl(trimmed)) {
      setError('Invalid URL. Please paste a valid Twitter/X tweet URL.');
      return;
    }

    setLoading(true);
    
    try {
      const data = await fetchTweetGif(trimmed);
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      if (!data.videos || data.videos.length === 0) {
        setError('No GIF found in this tweet.');
        return;
      }
      
      setResult(data);
    } catch (err) {
      setError('Failed to fetch. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      setError('Unable to read clipboard. Please paste manually.');
    }
  }, []);

  const handleClear = useCallback(() => {
    setUrl('');
    setResult(null);
    setError(null);
  }, []);

  const handleGifDownload = useCallback(async (sourceUrl: string) => {
    setDownloadingGif(sourceUrl);
    try {
      const gifUrl = getGifDownloadUrl(sourceUrl);
      const link = document.createElement('a');
      link.href = gifUrl;
      link.download = 'twitter.gif';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloadingGif(null), 1500);
    }
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden flex items-center justify-center min-h-[50vh]">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700" aria-hidden="true" />
      
      <div className="max-w-6xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-semibold text-primary mb-6 animate-float">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            <span>The #1 Twitter GIF Downloader</span>
          </div>

          <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight px-4 mb-4">
            Twitter <span className="bg-gradient-to-r from-[#1DA1F2] to-[#8B5CF6] bg-clip-text text-transparent">GIF Downloader</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 sm:mt-6 px-4 max-w-xl mx-auto leading-relaxed mb-10">
            Download Any Tweet GIF in HD — Free & Instant
          </p>

          {/* Main Input Tool */}
          <div className="relative w-full max-w-2xl mx-auto px-4" role="search">
            <div className="absolute inset-x-4 inset-y-0 bg-gradient-to-r from-[#1DA1F2] to-[#8B5CF6] rounded-2xl blur-xl opacity-30" aria-hidden="true" />
            
            <div className="relative bg-[#0F0F18] border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 min-w-0">
                <Link2 className="w-5 h-5 text-gray-500 flex-shrink-0" aria-hidden="true" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && handleDownload()}
                  placeholder="Paste Twitter / X link..."
                  disabled={loading}
                  aria-label="Twitter or X Tweet URL"
                  className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-500 outline-none py-3 text-sm sm:text-base"
                />
                {url && !loading && (
                  <button onClick={handleClear} aria-label="Clear input" className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
                {!url && (
                  <button 
                    onClick={handlePaste}
                    aria-label="Paste from clipboard"
                    className="flex-shrink-0 text-[10px] sm:text-xs text-gray-400 px-2 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Paste
                  </button>
                )}
              </div>
              
              <button
                onClick={handleDownload}
                disabled={loading || !url.trim()}
                aria-busy={loading}
                className="bg-gradient-to-r from-[#1DA1F2] to-[#8B5CF6] text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[140px] hover:opacity-90 active:scale-[0.98] transition-all"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /><span>Fetching...</span></>
                ) : (
                  <><Download className="w-4 h-4" aria-hidden="true" /><span>Download</span></>
                )}
              </button>
            </div>
          </div>

          <div aria-live="polite">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 max-w-2xl mx-auto text-left mx-4"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-red-300 font-medium text-sm">{error}</p>
                    <p className="text-red-400/70 text-[10px] sm:text-xs mt-1">
                      Example: https://twitter.com/username/status/1234567890
                    </p>
                  </div>
                </motion.div>
              )}

              {loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 max-w-2xl mx-auto bg-[#0F0F18] border border-white/10 rounded-2xl p-6 text-left mx-4"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" aria-hidden="true" />
                    <p className="text-gray-300 text-sm">Fetching media from Twitter...</p>
                  </div>
                  <div className="space-y-3">
                    <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                  </div>
                </motion.div>
              )}

              {result && !loading && (
                <ToolResult 
                  result={result} 
                  downloadingGif={downloadingGif} 
                  onGifDownload={handleGifDownload} 
                  onClear={handleClear} 
                />
              )}
            </AnimatePresence>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Zap className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span>Fastest Engine</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span>100% Private</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2" aria-hidden="true">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-[#0A0A0F]" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-[#0A0A0F]" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 border-2 border-[#0A0A0F]" />
              </div>
              <span className="text-blue-400 text-xs sm:text-sm font-medium whitespace-nowrap">10k+ users saved GIFs today</span>
            </div>
          </div>

          {/* Ratings */}
          <div className="mt-8 flex justify-center px-4">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-300 text-xs sm:text-sm whitespace-nowrap">4.8/5 from 12,847+ users</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-20 opacity-50" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-16 h-16 sm:w-20 sm:h-20 border border-white/5 rounded-3xl rotate-12 animate-float" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 sm:w-32 sm:h-32 border border-white/5 rounded-[40px] -rotate-12 animate-float delay-1000" />
      </div>
    </section>
  );
}
