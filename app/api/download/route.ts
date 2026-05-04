import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const normalizedUrl = url.replace("x.com", "twitter.com");
    const apiUrl = `https://twittergifapi.techiesline.workers.dev/?url=${encodeURIComponent(normalizedUrl)}`;

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      return NextResponse.json({ error: "External service error" }, { status: response.status });
    }

    const data = await response.json();
    
    // Map to the format the frontend expects
    const mappedData = {
      title: data.title || "Twitter GIF",
      thumbnail: data.thumbnail || data.thumb || data.picture || "https://pbs.twimg.com/tweet_video_thumb/F-X_x-aW8AA8A8.jpg",
      download_url: data.download_url || data.url || data.video || "",
      variants: data.variants || [
        { quality: "HD", url: data.download_url || data.url || data.video || "" }
      ],
    };

    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
