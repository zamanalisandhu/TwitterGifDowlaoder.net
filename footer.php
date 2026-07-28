    <footer aria-label="Site Footer" class="py-16 border-t border-slate-100 bg-[#FAFBFD] px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
                <div class="col-span-1">
                    <a href="/" aria-label="TwitterGIFDownloader Home" class="flex items-center gap-3 mb-6 group">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[#06B6D4] flex items-center justify-center text-white shadow-sm shadow-indigo-100/50" aria-hidden="true">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg>
                        </div>
                        <span class="text-xl font-black text-slate-800">TwitterGIF</span>
                    </a>
                    <p class="text-slate-500 text-sm leading-relaxed max-w-xs">
                        The world's fastest and most reliable Twitter/X GIF downloader. Save your favorite moments in HD quality.
                    </p>
                </div>

                <div>
                    <h4 class="font-bold text-slate-400 mb-6 uppercase text-xs tracking-wider">Company</h4>
                    <ul class="space-y-4 text-sm font-medium text-slate-600">
                        <li><a href="/blog" class="hover:text-primary transition-colors">Blog</a></li>
                        <li><a href="/about" class="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="/contact" class="hover:text-primary transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-bold text-slate-400 mb-6 uppercase text-xs tracking-wider">Legal</h4>
                    <ul class="space-y-4 text-sm font-medium text-slate-600">
                        <li><a href="/privacy" class="hover:text-primary transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms" class="hover:text-primary transition-colors">Terms of Service</a></li>
                        <li><a href="/dmca" class="hover:text-primary transition-colors">DMCA</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-bold text-slate-400 mb-6 uppercase text-xs tracking-wider">Recommended</h4>
                    <ul class="space-y-4 text-sm font-medium text-slate-600 mb-6">
                        <li>
                            <a href="https://pinvideodownload.net/" target="_blank" rel="noopener" class="hover:text-primary transition-colors">
                                Pinterest Downloader
                            </a>
                        </li>
                        <li>
                            <a href="https://rdtvideodownloader.com/" target="_blank" rel="noopener" class="hover:text-primary transition-colors">
                                Reddit Downloader
                            </a>
                        </li>
                    </ul>

                    <h4 class="font-bold text-slate-400 mb-4 uppercase text-[10px] tracking-wider">Connect</h4>
                    <div class="flex gap-4">
                        <a href="https://x.com/TwitterGIF" target="_blank" rel="noopener" aria-label="Follow us on Twitter/X" class="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 hover:shadow-md hover:shadow-indigo-100/30 transition-all border border-slate-100">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </a>
                        <a href="/contact" aria-label="Contact us" class="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 hover:shadow-md hover:shadow-indigo-100/30 transition-all border border-slate-100">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="pt-8 border-t border-slate-100 text-center">
                <p class="text-xs sm:text-sm text-slate-400">
                    &copy; <?php echo date("Y"); ?> TwitterGIFDownloader.net. All rights reserved.
                </p>
                <p class="mt-2 text-[10px] opacity-35 uppercase tracking-[0.2em] text-slate-400">
                    Not affiliated with Twitter or X Corp.
                </p>
            </div>
        </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button id="scroll-to-top" aria-label="Scroll to top" class="fixed bottom-8 right-8 p-3.5 rounded-full bg-gradient-to-r from-primary to-[#06B6D4] text-white shadow-lg shadow-indigo-100/60 hover:scale-105 active:scale-95 transition-all opacity-0 pointer-events-none z-50">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"></path></svg>
    </button>

    <!-- Main JavaScript Bundle -->
    <script src="/js/main.js" defer></script>
</body>
</html>
