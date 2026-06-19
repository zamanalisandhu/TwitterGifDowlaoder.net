import { getPostBySlug, getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://twittergifdownloader.net/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  console.log("Fetching post for slug:", params.slug);
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0]">
      <Navbar />
      
      <article className="pt-20 pb-12 container mx-auto px-4 max-w-4xl">
        <div className="mb-12 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8 transition-all font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-muted-foreground text-xs font-medium">•</span>
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tighter leading-[1.1] text-white">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground py-6 border-y border-white/5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last Updated: {post.date}
            </div>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
        
        {post.image && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-white/10 aspect-[1200/628] relative max-w-4xl mx-auto shadow-2xl bg-white/5">
            <img 
              src={post.image} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "image": post.image,
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": "TwitterGIFDownloader",
                "url": "https://twittergifdownloader.net"
              },
              "publisher": {
                "@type": "Organization",
                "name": "TwitterGIFDownloader",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://twittergifdownloader.net/og-image.png"
                }
              },
              "description": post.excerpt,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://twittergifdownloader.net/${post.slug}`
              }
            })
          }}
        />

        <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/5
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-[#94A3B8] prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic
            prose-ul:list-disc prose-li:text-[#94A3B8]
            prose-strong:text-white
            prose-table:border-collapse prose-th:bg-white/5 prose-th:p-4 prose-td:p-4 prose-td:border prose-td:border-white/5">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-white/10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 text-white">Want to save more GIFs?</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Download high-quality GIFs and videos from Twitter instantly with our free tool.</p>
            <Link href="/">
              <button className="px-10 py-4 rounded-2xl bg-primary text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                Try Twitter Downloader
              </button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
