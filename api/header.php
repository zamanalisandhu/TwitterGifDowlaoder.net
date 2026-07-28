<?php
// Initialize dynamic SEO variables if they aren't already set
$site_name = "TwitterGIFDownloader";
$base_url = "https://twittergifdownloader.net";

$seo_title = isset($page_title) ? $page_title : "Twitter GIF Downloader — Save X GIFs in HD, Free & Fast";
$seo_desc = isset($page_desc) ? $page_desc : "Download Twitter and X GIFs in HD instantly. No watermarks, no signup, no limits. Free online tool works on iPhone, Android & desktop. Save any GIF fast.";
$seo_canonical = isset($canonical_url) ? $canonical_url : $base_url . $_SERVER['REQUEST_URI'];
$seo_keywords = "twitter gif downloader, x gif downloader, save twitter gif, download tweet gif, twitter gif saver, x.com gif download";

$og_title = isset($og_title) ? $og_title : "Twitter GIF Downloader — Free HD GIF Downloader";
$og_desc = isset($og_desc) ? $og_desc : "Download any Twitter/X GIF in HD instantly. Free, no watermarks, no signup. Works on iPhone, Android & Desktop.";
$og_image = isset($og_image) ? $og_image : $base_url . "/og-image.png";
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta name="theme-color" content="#1DA1F2">
    
    <title><?php echo htmlspecialchars($seo_title); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($seo_desc); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($seo_keywords); ?>">
    <link rel="canonical" href="<?php echo htmlspecialchars($seo_canonical); ?>">
    
    <meta name="author" content="TwitterGIFDownloader">
    <meta name="creator" content="TwitterGIFDownloader.net">
    <meta name="publisher" content="TwitterGIFDownloader.net">
    
    <!-- Mobile Web App Capable -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="TwitterGIFDownloader">
    <link rel="manifest" href="/manifest.json">
    
    <!-- Robots Crawler Directives -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- OpenGraph Metadata -->
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <meta property="og:url" content="<?php echo htmlspecialchars($seo_canonical); ?>">
    <meta property="og:title" content="<?php echo htmlspecialchars($og_title); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($og_desc); ?>">
    <meta property="og:site_name" content="TwitterGIF">
    <meta property="og:image" content="<?php echo htmlspecialchars($og_image); ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Twitter GIF Downloader">
    
    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($seo_title); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($og_desc); ?>">
    <meta name="twitter:image" content="<?php echo htmlspecialchars($og_image); ?>">
    
    <!-- Verification -->
    <meta name="google-site-verification" content="HSWPL4OMveot57q_f_aFJ1tudIHP_nyyONIxjuJDe-g">
    
    <!-- Icons -->
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
    <link rel="apple-touch-icon" href="/apple-icon.png">
    
    <!-- Preconnect hints for third-party origins (CWV: LCP optimization) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://twittergifapi.techiesline.workers.dev">
    
    <!-- Google Fonts (non-blocking with swap) -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap"></noscript>
    
    <!-- Main stylesheet (high priority) -->
    <link rel="stylesheet" href="/css/main.min.css" fetchpriority="high">
    
    <!-- Third-party scripts deferred to idle (CWV: TBT/INP optimization) -->
    <script>
        function _loadScript(src){var s=document.createElement('script');s.src=src;s.async=true;document.head.appendChild(s);}
        function _onIdle(fn){if('requestIdleCallback' in window){requestIdleCallback(fn);}else{setTimeout(fn,2000);}}
        window.addEventListener('load',function(){
            _onIdle(function(){
                // Google AdSense
                _loadScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1175254374210149');
                // Google Analytics
                _loadScript('https://www.googletagmanager.com/gtag/js?id=G-37H5WQHP4P');
                window.dataLayer=window.dataLayer||[];
                function gtag(){dataLayer.push(arguments);}
                gtag('js',new Date());
                gtag('config','G-37H5WQHP4P');
            });
        });
    </script>
</head>
<body class="bg-[#eef2f6] text-slate-900 overflow-x-hidden font-sans antialiased">

    <!-- Skip to main content links for accessibility -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-full">
        Skip to content
    </a>
    
    <!-- Floating Header Navbar -->
    <header class="main-header w-full relative z-20 pt-4">
        <div class="max-w-5xl mx-auto px-4 sm:px-6">
            <div class="header-container flex items-center justify-between bg-white/70 backdrop-blur-md border border-indigo-150 rounded-full px-6 py-2.5 shadow-sm">
                <!-- Logo -->
                <a href="/" aria-label="TwitterGIF Home" class="logo-link flex items-center gap-2 text-decoration-none">
                    <div class="logo-badge w-9 h-9 rounded-lg flex items-center justify-center text-white transition-transform duration-300 hover:rotate-12 hover:scale-105">
                        <svg class="w-7 h-7 text-[#1DA1F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </div>
                    <span class="logo-text font-black text-[1.15rem] tracking-tight text-slate-800 hover:text-[#1DA1F2] transition-colors">
                        Twitter<span class="text-[#1DA1F2]">GIF</span>
                    </span>
                </a>
                
                <!-- Desktop Navigation Links -->
                <div class="desktop-nav hidden md:flex items-center gap-1 flex-grow justify-center px-4">
                    <a href="/" class="nav-link text-slate-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-xs px-4 py-2 rounded-full transition-all">Home</a>
                    <a href="/#features" class="nav-link text-slate-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-xs px-4 py-2 rounded-full transition-all">Features</a>
                    <a href="/#how-it-works" class="nav-link text-slate-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-xs px-4 py-2 rounded-full transition-all">How it Works</a>
                    <a href="/#faq" class="nav-link text-slate-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-xs px-4 py-2 rounded-full transition-all">FAQ</a>
                    <a href="/blog" class="nav-link text-slate-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-xs px-4 py-2 rounded-full transition-all">Blog</a>
                    <a href="/contact" class="nav-link text-slate-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-xs px-4 py-2 rounded-full transition-all">Contact</a>
                </div>
                
                <!-- Action Buttons -->
                <div class="header-actions flex items-center gap-2">
                    <button id="nav-cta" aria-label="Get Started" class="extension-btn bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-sm shadow-[#1DA1F2]/20 transition-all duration-300">
                        Get Started
                    </button>
                    <!-- Mobile Hamburger Button -->
                    <button id="mobile-menu-btn" aria-label="Open menu" class="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition-colors">
                        <svg id="hamburger-icon" class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>
                        <svg id="close-icon" class="w-5 h-5 text-slate-600 hidden" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation Drawer -->
            <div id="mobile-menu" class="md:hidden hidden mt-2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
                <nav class="flex flex-col p-4 gap-1">
                    <a href="/" class="text-slate-700 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-sm px-4 py-3 rounded-xl transition-all">Home</a>
                    <a href="/#features" class="text-slate-700 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-sm px-4 py-3 rounded-xl transition-all">Features</a>
                    <a href="/#how-it-works" class="text-slate-700 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-sm px-4 py-3 rounded-xl transition-all">How it Works</a>
                    <a href="/#faq" class="text-slate-700 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-sm px-4 py-3 rounded-xl transition-all">FAQ</a>
                    <a href="/blog" class="text-slate-700 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-sm px-4 py-3 rounded-xl transition-all">Blog</a>
                    <a href="/contact" class="text-slate-700 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 font-semibold text-sm px-4 py-3 rounded-xl transition-all">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Mobile Menu Toggle Script -->
    <script>
        (function() {
            var btn = document.getElementById('mobile-menu-btn');
            var menu = document.getElementById('mobile-menu');
            var hamburger = document.getElementById('hamburger-icon');
            var closeIcon = document.getElementById('close-icon');
            if (btn && menu) {
                btn.addEventListener('click', function() {
                    var isOpen = !menu.classList.contains('hidden');
                    menu.classList.toggle('hidden');
                    hamburger.classList.toggle('hidden');
                    closeIcon.classList.toggle('hidden');
                    btn.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
                });
                // Close menu when a link is clicked
                menu.querySelectorAll('a').forEach(function(link) {
                    link.addEventListener('click', function() {
                        menu.classList.add('hidden');
                        hamburger.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    });
                });
            }
        })();
    </script>
