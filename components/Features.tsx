"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Smartphone, Globe, Cloud, Sparkles } from "lucide-react";

const features = [
  {
    title: "Instant Download",
    description: "Our high-speed servers ensure your GIFs are ready in milliseconds.",
    icon: Zap,
    color: "bg-yellow-500/20 text-yellow-500",
  },
  {
    title: "Privacy First",
    description: "We don't store your data or the media you download. Your privacy is our priority.",
    icon: Shield,
    color: "bg-blue-500/20 text-blue-500",
  },
  {
    title: "Mobile Optimized",
    description: "Download GIFs directly to your phone with our fully responsive interface.",
    icon: Smartphone,
    color: "bg-green-500/20 text-green-500",
  },
  {
    title: "Global CDN",
    description: "Fast downloads from anywhere in the world thanks to our edge network.",
    icon: Globe,
    color: "bg-purple-500/20 text-purple-500",
  },
  {
    title: "No Account Needed",
    description: "Use our service without any registration or hidden fees. Just paste and go.",
    icon: Sparkles,
    color: "bg-primary/20 text-primary",
  },
  {
    title: "Cloud Processing",
    description: "We handle the heavy lifting on our servers so your device stays cool.",
    icon: Cloud,
    color: "bg-red-500/20 text-red-500",
  },
];

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-12 sm:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10 sm:mb-16">
          <h2 id="features-heading" className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 px-4 leading-tight">
            Why Choose <span className="text-white">TwitterGIF</span>?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Experience the most powerful media downloader built for the modern web.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-3xl glass-morphism border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className={`p-3 sm:p-4 rounded-2xl w-fit mb-4 sm:mb-6 group-hover:scale-110 transition-transform ${feature.color}`} aria-hidden="true">
                <feature.icon className="w-6 h-6 sm:w-8 h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
