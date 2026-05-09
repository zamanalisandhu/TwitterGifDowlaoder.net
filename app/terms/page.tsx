import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TwitterGIF",
  description: "Read our terms and conditions for using TwitterGIFDownloader.net.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0]">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-[#94A3B8] prose-p:leading-relaxed
            prose-strong:text-white">
          
          <p>Welcome to TwitterGIFDownloader.net!</p>

          <p>These terms and conditions outline the rules and regulations for the use of TwitterGIFDownloader.net's Website, located at https://twittergifdownloader.net.</p>

          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use TwitterGIFDownloader.net if you do not agree to take all of the terms and conditions stated on this page.</p>

          <h2>License</h2>
          <p>Unless otherwise stated, TwitterGIFDownloader.net and/or its licensors own the intellectual property rights for all material on TwitterGIFDownloader.net. All intellectual property rights are reserved.</p>

          <h2>User Responsibilities</h2>
          <p>Users are responsible for how they use the downloaded content. TwitterGIFDownloader.net does not store any media on its servers; all media is served directly from Twitter's CDN. We encourage users to respect the copyright and intellectual property of the original content creators.</p>

          <h2>Hyperlinking to our Content</h2>
          <p>The following organizations may link to our Website without prior written approval:</p>
          <ul>
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
          </ul>

          <h2>iFrames</h2>
          <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

          <h2>Content Liability</h2>
          <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website.</p>

          <h2>Disclaimer</h2>
          <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
          <ul>
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law;</li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
}
