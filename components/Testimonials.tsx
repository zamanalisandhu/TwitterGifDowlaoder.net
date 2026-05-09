"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Jenkins",
    handle: "@sarah_creates",
    quote: "This tool is an absolute lifesaver. I use it every day to save memes and reaction GIFs for my content. Lightning fast!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Marcus Aurelius",
    handle: "@marcus_tech",
    quote: "Finally a Twitter downloader that doesn't bombard you with sketchy ads. Clean, fast, and does exactly what it promises.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    name: "Elena Rodriguez",
    handle: "@elenacodes",
    quote: "The HD quality of the downloaded GIFs is incredible. Way better than screen recording or using other bots.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-8 sm:py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-extrabold mb-4">Twitter GIF Downloader Reviews from Real Users</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">See what our community has to say about TwitterGIFDownloader.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl glass-morphism border border-white/5 hover:border-white/20 transition-all flex flex-col h-full"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-8 flex-1 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <Image 
                  src={t.avatar} 
                  alt={`${t.name}, content creator`} 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/10" 
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.handle}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
