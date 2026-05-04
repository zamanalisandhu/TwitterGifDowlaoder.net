"use client";

import Link from "next/link";
import { Twitter, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="TwitterGIF Home" className="flex items-center gap-2">
            <Twitter className="w-6 h-6 text-blue-400" aria-hidden="true" />
            <span className="font-bold text-lg sm:text-xl tracking-tight">
              Twitter<span className="text-blue-400">GIF</span>
            </span>
          </Link>
          
          {/* Desktop menu — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
          
          {/* CTA Button */}
          <button 
            aria-label="Get Started"
            className="bg-gradient-to-r from-[#1DA1F2] to-[#8B5CF6] text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all outline-none"
          >
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Start</span>
          </button>
        </div>
      </nav>
    </>
  );
}
