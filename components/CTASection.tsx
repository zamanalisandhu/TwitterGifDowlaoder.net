"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="cta-heading" className="py-12 sm:py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-12 sm:py-20 px-6 sm:px-8 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Background shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" aria-hidden="true" />
          
          <h2 id="cta-heading" className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight px-4">
            Ready to Download Your First GIF?
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Join 850k+ users saving Twitter media every day — no signup required
          </p>
          <button 
            onClick={scrollToHero}
            aria-label="Start downloading Twitter GIFs for free"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl min-h-[44px]"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 sm:w-5 h-5" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
