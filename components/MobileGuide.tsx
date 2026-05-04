"use client";

import { motion } from "framer-motion";
import { Apple, Smartphone, Laptop } from "lucide-react";

export default function MobileGuide() {
  const devices = [
    {
      title: "iPhone & iPad (iOS)",
      description: "Using our twitter gif downloader iphone tool is seamless. Open the Twitter app, tap the share icon, and copy the link. Paste it into Safari using our website, and download the GIF directly to your iOS Photos app or Files app in seconds.",
      icon: Apple,
      color: "bg-gray-100 text-gray-900",
    },
    {
      title: "Android Devices",
      description: "Need a twitter gif download android solution? Simply copy the tweet URL from the X app, open Chrome, and use our downloader. The MP4 or GIF file will be saved straight to your Android gallery or Downloads folder instantly.",
      icon: Smartphone,
      color: "bg-green-500 text-white",
    },
    {
      title: "PC & Mac Desktop",
      description: "Whether you use Windows, macOS, or Linux, you can save x gif on mobile and desktop alike. Our web-based tool works perfectly on Chrome, Firefox, Safari, and Edge. Just drag and drop or paste the URL to download HD media.",
      icon: Laptop,
      color: "bg-blue-500 text-white",
    }
  ];

  return (
    <section id="mobile" aria-labelledby="mobile-guide-heading" className="py-8 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="mobile-guide-heading" className="text-3xl md:text-5xl font-extrabold mb-4">
            Download Twitter GIFs on iPhone, Android & Desktop
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our tool works flawlessly across all devices and operating systems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {devices.map((device, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl glass-morphism border border-white/5 hover:border-white/20 transition-all text-center"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg ${device.color}`}>
                <device.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{device.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{device.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
