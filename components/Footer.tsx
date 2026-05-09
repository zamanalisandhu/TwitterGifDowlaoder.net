import Link from "next/link";
import { Gift, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer aria-label="Site Footer" className="py-12 sm:py-16 border-t border-white/10 bg-card px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" aria-label="TwitterGIFDownloader Home" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white" aria-hidden="true">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">TwitterGIF</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The world&apos;s fastest and most reliable Twitter/X GIF downloader. Save your favorite moments in HD quality.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Video Downloader</li>
              <li>Image Downloader</li>
              <li>Thread Saver</li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/dmca" className="hover:text-primary transition-colors">DMCA</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" aria-label="Follow us on Twitter/X" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:text-primary transition-all border border-white/5">
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link href="/contact" aria-label="Contact us" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:text-primary transition-all border border-white/5">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p suppressHydrationWarning className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} TwitterGIFDownloader.net. All rights reserved.
          </p>
          <p className="mt-2 text-[10px] opacity-40 uppercase tracking-[0.2em] text-muted-foreground">
            Not affiliated with Twitter or X Corp.
          </p>
        </div>
      </div>
    </footer>
  );
}
