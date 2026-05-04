"use client";

import { motion } from "framer-motion";
import { Search, Copy, SearchCode, DownloadCloud } from "lucide-react";

const steps = [
  {
    title: "Step 1: Find the Tweet with the GIF",
    description: "First, open Twitter (or X.com) on your web browser or mobile app. Scroll through your feed until you find the exact tweet containing the GIF or video you want to save.",
    icon: Search,
  },
  {
    title: "Step 2: Copy the Tweet URL",
    description: "On desktop, click the 'Share' icon and select 'Copy link to Tweet'. On mobile, tap the share icon and hit 'Copy Link'.",
    icon: Copy,
  },
  {
    title: "Step 3: Paste in Downloader",
    description: "Navigate back to our page. Paste the copied URL into the input field. Our system will immediately analyze the link.",
    icon: SearchCode,
  },
  {
    title: "Step 4: Download Your GIF",
    description: "Click the 'Download' button. Within milliseconds, our tool will generate high-quality download links for you.",
    icon: DownloadCloud,
  }
];

export default function DetailedGuide() {
  return (
    <section id="how-it-works" aria-labelledby="detailed-guide-heading" className="py-12 sm:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 sm:mb-16">
          <h2 id="detailed-guide-heading" className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 px-4 leading-tight">
            How to Use Our Twitter GIF Downloader — Complete Guide
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Follow these four simple steps to save your favorite media.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors border border-white/5 sm:border-transparent"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary" aria-hidden="true">
                <step.icon className="w-6 h-6 sm:w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
