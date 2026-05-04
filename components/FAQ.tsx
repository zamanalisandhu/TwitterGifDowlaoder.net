"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this tool free to use?",
    answer: "Yes, TwitterGIFDownloader.net is 100% free. You can download as many GIFs as you want without any hidden charges or subscriptions.",
  },
  {
    question: "Do I need to sign up for an account?",
    answer: "No signup or login is required. Just paste the tweet URL and download your GIF instantly.",
  },
  {
    question: "Are there watermarks on the downloaded GIFs?",
    answer: "Absolutely not. We provide the original GIFs exactly as they are on Twitter/X, without any added watermarks.",
  },
  {
    question: "How do I download a GIF on my mobile phone?",
    answer: "Copy the tweet link from the Twitter/X app, paste it into our search box, and tap Download. You can then save the file to your Photos or Files app.",
  },
  {
    question: "Is it safe to use this tool?",
    answer: "Yes, our service is secure. we don't store your personal data or keep logs of your downloads. We use HTTPS encryption to protect your privacy.",
  },
    {
    question: "Can I download videos as well?",
    answer: "While we specialize in GIFs, our tool also works for many Twitter/X videos, saving them in MP4 format.",
  },
  {
    question: "What format are downloaded GIFs in?",
    answer: "Twitter actually converts GIFs to MP4 videos. We allow you to download them in their highest quality MP4 format, or as a standard GIF file depending on your preference.",
  },
  {
    question: "Can I download private Twitter GIFs?",
    answer: "No, our tool can only download media from public Twitter/X accounts. We cannot access tweets from protected or private accounts.",
  },
  {
    question: "Is there a download limit?",
    answer: "There are absolutely no limits! You can use our Twitter GIF downloader as many times as you need, entirely for free.",
  },
  {
    question: "Does it work on x.com?",
    answer: "Yes, our tool fully supports both twitter.com and x.com URLs. Just paste either link and it will work perfectly.",
  },
  {
    question: "How is this different from other GIF downloaders?",
    answer: "We offer the fastest processing speeds, zero annoying pop-up ads, no watermarks, and a clean, mobile-optimized interface that respects your privacy.",
  },
  {
    question: "Can I use this for commercial purposes?",
    answer: "The tool itself is free to use for any purpose. However, the media you download may be subject to the original creator's copyright, so please ensure you have permission if using it commercially.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-12 sm:py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10 sm:mb-16">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 px-4 leading-tight">
            Twitter GIF Downloader — FAQ
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Everything you need to know about our downloader.
          </p>
        </header>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl sm:rounded-3xl glass-morphism border border-white/5 overflow-hidden transition-all hover:border-white/10"
            >
              <button
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors group min-h-[64px]"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                aria-expanded={activeIndex === index}
              >
                <span className="text-sm sm:text-base md:text-lg font-bold group-hover:text-primary transition-colors pr-4">
                  {faq.question}
                </span>
                <div className={`p-1.5 sm:p-2 rounded-xl flex-shrink-0 transition-all ${activeIndex === index ? "bg-primary text-white" : "bg-white/5"}`}>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 h-5 transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed border-t border-white/5 mt-[-1px]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
