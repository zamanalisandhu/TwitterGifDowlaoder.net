"use client";

import { Suspense } from "react";
import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Lazy load below-fold sections for performance
const WhatIsSection = dynamic(() => import("@/components/WhatIsSection"));
const DetailedGuide = dynamic(() => import("@/components/DetailedGuide"));
const StatsBar = dynamic(() => import("@/components/StatsBar"));
const Features = dynamic(() => import("@/components/Features"));
const MobileGuide = dynamic(() => import("@/components/MobileGuide"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const RelatedTools = dynamic(() => import("@/components/RelatedTools"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function MainSection() {
  return (
    <main id="main-content" className="min-h-screen premium-gradient">
      <Navbar />
      <Hero />
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-white/5" />}>
        <WhatIsSection />
        <DetailedGuide />
        <StatsBar />
        <Features />
        <MobileGuide />
        <Testimonials />
        <FAQ />
        <RelatedTools />
        <CTASection />
      </Suspense>
      
      <Footer />
    </main>
  );
}
