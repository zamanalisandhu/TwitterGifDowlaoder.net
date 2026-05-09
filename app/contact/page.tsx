import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | TwitterGIF",
  description: "Get in touch with the TwitterGIF team for support, feedback, or business inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0]">
      <Navbar />
      
      <div className="pt-20 pb-12 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground">We'd love to hear from you!</p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:border-primary/50 transition-colors group max-w-sm w-full">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-purple-500/10 text-purple-500 mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Social Media</h3>
            <p className="text-muted-foreground mb-4">Follow us for updates</p>
            <p className="text-white font-bold text-lg">Twitter / X: @TwitterGIF</p>
          </div>
        </div>

        <ContactForm />

        <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">How long does it take to get a response?</h4>
              <p className="text-muted-foreground">We typically respond to all emails within 24-48 business hours.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">Can I request a new feature?</h4>
              <p className="text-muted-foreground">Absolutely! We love hearing from our users. Send us your ideas and we'll see if we can implement them.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
