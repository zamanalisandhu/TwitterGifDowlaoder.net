export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

const WP_API_URL = "https://admin.twittergifdownloader.net/wp-json/wp/v2";

function decodeHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&nbsp;/g, " ");
}

function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const cleanText = text.replace(/<[^>]+>/g, ''); // Remove HTML tags
  const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes || 1} min read`;
}

export async function getBlogPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`, {
      next: { revalidate: 10 } // Cache for 10 seconds
    });
    
    if (!res.ok) {
      console.error("Failed to fetch posts from WordPress API, status:", res.status);
      return [];
    }

    const wpPosts = await res.json();
    if (!Array.isArray(wpPosts)) {
      return [];
    }

    return wpPosts.map((post: any) => {
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
      const categories = post._embedded?.['wp:term']?.[0] || [];
      const categoryName = categories.length > 0 ? categories[0].name : "General";
      
      const rawContent = post.content?.rendered || "";
      const contentHtml = decodeHtml(rawContent);
      
      const rawExcerpt = post.excerpt?.rendered || "";
      const cleanExcerpt = decodeHtml(
        rawExcerpt.replace(/<[^>]+>/g, '').replace(/\[&hellip;\]/g, '...').trim()
      );

      // Support fallback fields if wp:featuredmedia is forbidden/restricted
      const featuredImageUrl = post.featured_image_url || 
                               post.featured_image_src || 
                               post.featured_media_src_url || 
                               featuredMedia?.source_url;
      const fallbackImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800";
      const finalImageUrl = (featuredImageUrl && typeof featuredImageUrl === 'string' && featuredImageUrl.startsWith('http')) 
        ? featuredImageUrl 
        : fallbackImage;

      return {
        id: post.id.toString(),
        slug: post.slug,
        title: decodeHtml(post.title?.rendered || ""),
        excerpt: cleanExcerpt,
        date: post.date ? post.date.split("T")[0] : "",
        readTime: calculateReadTime(contentHtml),
        category: decodeHtml(categoryName),
        image: finalImageUrl,
        content: contentHtml,
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts from WordPress:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 10 } // Cache for 10 seconds
    });

    if (!res.ok) {
      console.error(`Failed to fetch post by slug ${slug}, status:`, res.status);
      return undefined;
    }

    const wpPosts = await res.json();
    if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
      return undefined;
    }

    const post = wpPosts[0];
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const categoryName = categories.length > 0 ? categories[0].name : "General";
    
    const rawContent = post.content?.rendered || "";
    const contentHtml = decodeHtml(rawContent);
    
    const rawExcerpt = post.excerpt?.rendered || "";
    const cleanExcerpt = decodeHtml(
      rawExcerpt.replace(/<[^>]+>/g, '').replace(/\[&hellip;\]/g, '...').trim()
    );

    const featuredImageUrl = post.featured_image_url || 
                             post.featured_image_src || 
                             post.featured_media_src_url || 
                             featuredMedia?.source_url;
    const fallbackImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800";
    const finalImageUrl = (featuredImageUrl && typeof featuredImageUrl === 'string' && featuredImageUrl.startsWith('http')) 
      ? featuredImageUrl 
      : fallbackImage;

    return {
      id: post.id.toString(),
      slug: post.slug,
      title: decodeHtml(post.title?.rendered || ""),
      excerpt: cleanExcerpt,
      date: post.date ? post.date.split("T")[0] : "",
      readTime: calculateReadTime(contentHtml),
      category: decodeHtml(categoryName),
      image: finalImageUrl,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error fetching blog post by slug ${slug}:`, error);
    return undefined;
  }
}

