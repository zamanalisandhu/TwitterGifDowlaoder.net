import MainSection from "@/components/MainSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <MainSection />;
}
