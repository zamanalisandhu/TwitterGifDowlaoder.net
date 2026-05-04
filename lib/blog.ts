import { client } from "./sanity.client";
import { groq } from "next-sanity";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mainImage: any;
  category: string;
  body: any;
}

export async function getBlogPosts() {
  try {
    const query = groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      "category": category->title,
    }`;
    const posts = await client.fetch(query, {}, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    if (!posts || posts.length === 0) return mockPosts;
    return posts.map(transformPost);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return mockPosts;
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const query = groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      "category": category->title,
      body
    }`;
    const post = await client.fetch(query, { slug }, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    if (!post) return mockPosts.find(p => p.slug === slug);
    return transformPost(post);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return mockPosts.find(p => p.slug === slug);
  }
}

function transformPost(post: any) {
  return {
    id: post._id,
    title: post.title || "Untitled Post",
    slug: post.slug?.current || "untitled",
    excerpt: post.excerpt || "No excerpt available",
    date: post.publishedAt 
      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Draft",
    readTime: "5 min read",
    category: post.category || "General",
    image: post.mainImage ? urlFor(post.mainImage) : "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=800",
    content: post.body || ""
  };
}

// Mock data as fallback
const mockPosts = [
  {
    id: "1",
    title: "How to Download Twitter GIFs in 2024",
    slug: "how-to-download-twitter-gifs",
    excerpt: "Learn the fastest and easiest ways to save your favorite Twitter GIFs to any device without losing quality.",
    date: "May 2, 2024",
    readTime: "5 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=800",
    content: `<p>Downloading GIFs from Twitter... (Mock Content)</p>`
  }
];

// Helper for images (needs @sanity/image-url)
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}
