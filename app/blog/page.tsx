import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest guides and tips for downloading Twitter GIFs and videos.',
  alternates: {
    canonical: 'https://twittergifdownloader.net/blog',
  },
};


export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen premium-gradient">
      <Navbar />
      
      <div className="pt-20 pb-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Guides, insights, and updates from the TwitterGIF team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/${post.slug}`}>
              <article className="group relative h-full glass-morphism rounded-3xl border border-white/5 overflow-hidden hover:border-white/20 transition-all p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                    {post.category}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                  
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
