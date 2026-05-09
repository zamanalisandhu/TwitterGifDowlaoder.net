"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("https://formspree.io/f/mbdwzwgw", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await response.json();
        console.error("Formspree Error Response:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="p-12 text-center bg-green-500/10 border border-green-500/30 rounded-3xl animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-500/20 text-green-500 mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
        <p className="text-gray-400 mb-8">Thank you for reaching out. We will get back to you shortly.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 mb-16 relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">Send us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="full-name" className="text-sm font-medium text-gray-300">Full Name</label>
            <input 
              type="text" 
              id="full-name" 
              name="name" 
              required 
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors text-white"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email-address" className="text-sm font-medium text-gray-300">Email Address</label>
            <input 
              type="email" 
              id="email-address" 
              name="email" 
              required 
              placeholder="john@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors text-white"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            required 
            placeholder="How can we help?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors text-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            rows={5}
            placeholder="Your message here..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors text-white resize-none"
          ></textarea>
        </div>
        <button 
          type="submit"
          disabled={status === "loading"}
          className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
        {status === "error" && (
          <p className="text-red-400 text-sm text-center mt-4">Oops! Something went wrong. Please try again later.</p>
        )}
      </form>
    </div>
  );
}
