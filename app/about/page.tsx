import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Info } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | TwitterGIF",
  description: "Learn more about the team behind TwitterGIFDownloader and our mission to simplify media saving.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0]">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <Info className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
            About <span className="text-primary">Us</span>
          </h1>
        </div>

        <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-[#94A3B8] prose-p:leading-relaxed
            prose-strong:text-white">
          
          <p>
            Welcome to <strong>TwitterGIFDownloader.net</strong>! We are a dedicated team of developers and social media enthusiasts who believe that saving your favorite moments from Twitter should be fast, easy, and free.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to provide the most reliable and efficient tool for downloading Twitter GIFs and videos. We know how frustrating it can be when you want to save a hilarious reaction or a beautiful animation but Twitter doesn't provide a direct download button. That's why we built this platform.
          </p>

          <h2>Why Choose Us?</h2>
          <ul>
            <li><strong>High Quality:</strong> We always fetch the highest resolution available from Twitter's servers.</li>
            <li><strong>Speed:</strong> Our backend is optimized to process your requests in milliseconds.</li>
            <li><strong>Privacy:</strong> We don't track your downloads or store your personal data.</li>
            <li><strong>Cross-Platform:</strong> Whether you are on an iPhone, Android, or Desktop, our tool works flawlessly.</li>
          </ul>

          <h2>Free Forever</h2>
          <p>
            We are committed to keeping this tool free for everyone. We support our development and hosting costs through minimal advertising, ensuring that you never have to pay to save a GIF.
          </p>

          <p>
            Thank you for choosing TwitterGIFDownloader.net. If you have any suggestions or feedback, feel free to reach out to us!
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
