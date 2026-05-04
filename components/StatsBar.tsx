"use client";

import { motion } from "framer-motion";
import { Download, Users, Zap, Globe } from "lucide-react";

const stats = [
  { label: "GIFs Downloaded", value: "2.4M+", icon: Download, color: "text-blue-500" },
  { label: "Active Users", value: "850k+", icon: Users, color: "text-purple-500" },
  { label: "Avg. Speed", value: "0.8s", icon: Zap, color: "text-yellow-500" },
  { label: "Countries", value: "120+", icon: Globe, color: "text-green-500" },
];

export default function StatsBar() {
  return (
    <section aria-label="Platform Statistics" className="py-12 sm:py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-3xl glass-morphism border border-white/5 hover:border-white/20 transition-all group flex flex-col items-center sm:items-start text-center sm:text-left"
            >
              <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-1 tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
