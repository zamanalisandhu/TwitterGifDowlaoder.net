import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA Policy | TwitterGIF",
  description: "Our DMCA policy for handling copyright infringement notices.",
};

export default function DMCAPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0]">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
            DMCA <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-[#94A3B8] prose-p:leading-relaxed
            prose-strong:text-white">
          
          <p>
            TwitterGIFDownloader.net respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act ("DMCA"), we will respond promptly to notices of alleged infringement that are reported to our designated copyright agent.
          </p>

          <h2>Notice of Infringement</h2>
          <p>If you are a copyright owner or an agent thereof, and you believe that any content hosted on our website infringes your copyrights, then you may submit a notification pursuant to the DMCA by providing our Copyright Agent with the following information in writing:</p>
          <ul>
            <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed.</li>
            <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and email address.</li>
          </ul>

          <h2>Counter-Notification</h2>
          <p>If you receive a notification that your content has been removed due to a copyright complaint, you may send us a counter-notification. This must be a written communication that includes the following:</p>
          <ul>
            <li>Your physical or electronic signature.</li>
            <li>Identification of the material that has been removed.</li>
            <li>A statement under penalty of perjury that you have a good faith belief that the material was removed as a result of mistake or misidentification.</li>
          </ul>

          <h2>Contact Information</h2>
          <p>Please send all DMCA notices to: <strong>dmca@twittergifdownloader.net</strong></p>
          <p>Please allow 2-3 business days for a response.</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
