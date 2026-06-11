import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import SchemaMarkup from "@/components/SchemaMarkup";
import Script from "next/script";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  adjustFontFallback: true,
  weight: ['400','500','600','700','800']
});

export const viewport: Viewport = {
  themeColor: '#1DA1F2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://twittergifdownloader.net'),
  title: {
    default: 'Twitter GIF Downloader — Save X GIFs in HD, Free & Fast',
    template: '%s | TwitterGIFDownloader.net'
  },
  description: 'Download Twitter and X GIFs in HD instantly. No watermarks, no signup, no limits. Free online tool works on iPhone, Android & desktop. Save any GIF fast.',
  keywords: ['twitter gif downloader', 'x gif downloader', 'save twitter gif', 'download tweet gif', 'twitter gif saver', 'x.com gif download'],
  authors: [{ name: 'TwitterGIFDownloader' }],
  creator: 'TwitterGIFDownloader.net',
  publisher: 'TwitterGIFDownloader.net',
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { 
    canonical: 'https://twittergifdownloader.net' 
  },
  applicationName: 'TwitterGIFDownloader',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TwitterGIFDownloader',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://twittergifdownloader.net',
    title: 'Twitter GIF Downloader — Free HD GIF Downloader',
    description: 'Download any Twitter/X GIF in HD instantly. Free, no watermarks, no signup. Works on iPhone, Android & Desktop.',
    siteName: 'TwitterGIFDownloader',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Twitter GIF Downloader' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter GIF Downloader — Free HD',
    description: 'Download Twitter/X GIFs in HD. Free, fast, no watermarks.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'HSWPL4OMveot57q_f_aFJ1tudIHP_nyyONIxjuJDe-g',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1175254374210149"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-37H5WQHP4P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-37H5WQHP4P');
          `}
        </Script>
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SchemaMarkup />
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
