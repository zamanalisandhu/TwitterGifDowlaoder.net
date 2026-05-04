import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen premium-gradient">
      <Navbar />
      
      <article className="pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="mb-12">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit mb-6">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between py-6 border-y border-white/5">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
              <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-black prose-headings:tracking-tight
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground prose-a:text-primary">
            {typeof post.content === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <PortableText value={post.content} />
            )}
          </div>
          
          <div className="mt-20 p-12 rounded-3xl glass-morphism border border-white/10 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to save more GIFs?</h3>
            <p className="text-muted-foreground mb-8">Download high-quality GIFs and videos from Twitter instantly.</p>
            <Link href="/">
              <button className="px-8 py-4 rounded-2xl bg-primary text-white font-bold hover:opacity-90 transition-all glow-primary">
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
