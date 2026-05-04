"use client";

import { motion } from "framer-motion";

export default function WhatIsSection() {
  return (
    <section aria-labelledby="what-is-heading" className="py-12 sm:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 md:p-12 rounded-3xl glass-morphism border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -z-10" aria-hidden="true" />
          
          <header className="text-center mb-8">
            <h2 id="what-is-heading" className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent leading-tight">
              The Fastest Free Twitter GIF Downloader Online
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Last updated: November 2025</p>
          </header>
          
          <article className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-justify sm:text-left">
            <p>
              Welcome to the ultimate twitter gif downloader. 
              If you&apos;ve ever scrolled through your feed and wanted to save a twitter gif 
              to share with friends or use in your own content, you know it can be frustrating. 
            </p>
            <p>
              Unlike images, an x.com gif is actually converted into an MP4 video file by Twitter, 
              meaning you can&apos;t just right-click and save it. That&apos;s where our free online tool comes in. 
              We make it incredibly easy to download tweet gifs and videos in high definition. 
            </p>
            <p>
              Whether you are on a desktop, tablet, or mobile phone, simply paste the link into our downloader and 
              instantly download twitter video and GIF files straight to your device. 
              No software installation, no watermarks, and no sign-ups required—just lightning-fast downloads 
              every single time you need to grab media from X (formerly Twitter).
            </p>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
