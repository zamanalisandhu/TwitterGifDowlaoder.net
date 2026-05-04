const API_URL = 'https://twittergifapi.techiesline.workers.dev';

const TWITTER_URL_REGEX = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+\/status\/\d+/i;

export interface VideoResult {
  resolution: string;
  download_url: string;
  source_url: string;
}

export interface ApiResponse {
  title?: string;
  thumbnail?: string;
  videos?: VideoResult[];
  error?: string;
}

export function isValidTwitterUrl(url: string): boolean {
  return TWITTER_URL_REGEX.test(url.trim());
}

export async function fetchTweetGif(tweetUrl: string): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append('url', tweetUrl.trim());

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  return res.json();
}

export function getGifDownloadUrl(sourceUrl: string): string {
  return `${API_URL}/?gif=1&url=${encodeURIComponent(sourceUrl)}`;
}
