"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Video, Image as ImageIcon, MessagesSquare, FileVideo } from "lucide-react";

export default function RelatedTools() {
  const tools = [
    {
      name: "Twitter Video Downloader",
      href: "/twitter-video-downloader",
      icon: Video,
      desc: "Download high-quality Twitter videos in MP4 format."
    },
    {
      name: "Twitter Image Downloader",
      href: "/twitter-image-downloader",
      icon: ImageIcon,
      desc: "Save photos from any tweet in original quality"
    },
    {
      name: "Twitter Thread Saver",
      href: "/twitter-thread-reader",
      icon: MessagesSquare,
      desc: "Read and save entire Twitter threads as PDFs."
    },
    {
      name: "Twitter to MP4 Converter",
      href: "/twitter-to-mp4",
      icon: FileVideo,
      desc: "Convert Twitter GIFs to MP4 videos easily."
    }
  ];

  return (
    <section aria-labelledby="related-tools-heading" className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="related-tools-heading" className="text-3xl md:text-4xl font-extrabold mb-4">
            More Free Twitter Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our other utilities designed to help you save media from X/Twitter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 h-full rounded-2xl glass-morphism border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
