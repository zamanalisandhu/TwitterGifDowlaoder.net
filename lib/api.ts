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

export async function downloadAsGif(
  mp4Url: string,
  onProgress?: (pct: number, status: string) => void
): Promise<void> {
  const reportProgress = (pct: number, status: string) => {
    if (onProgress) {
      onProgress(pct, status);
    }
  };

  reportProgress(5, 'Starting browser conversion');

  const [{ FFmpeg }, { fetchFile }] = await Promise.all([
    import('@ffmpeg/ffmpeg'),
    import('@ffmpeg/util'),
  ]);

  const ffmpeg = new FFmpeg();

  reportProgress(10, 'Downloading MP4');
  const proxyUrl = `${API_URL}/?download=${encodeURIComponent(mp4Url)}`;
  const fileData = await fetchFile(proxyUrl);

  reportProgress(30, 'Loading FFmpeg');
  await ffmpeg.load({
    coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
    wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm',
    workerURL: 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd/ffmpeg-core.worker.js',
  });

  reportProgress(50, 'Converting MP4 to GIF');
  await ffmpeg.writeFile('input.mp4', fileData);

  await ffmpeg.exec([
    '-i', 'input.mp4',
    '-vf', 'fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer',
    '-loop', '0',
    'output.gif',
  ]);

  reportProgress(90, 'Preparing download');
  const gifData = (await ffmpeg.readFile('output.gif')) as Uint8Array;
  const blob = new Blob([new Uint8Array(gifData)], { type: 'image/gif' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'twitter.gif';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  reportProgress(100, 'Download ready');
}
