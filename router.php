<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Normalize path (remove trailing slash except for root)
if ($uri !== '/' && substr($uri, -1) === '/') {
    $uri = rtrim($uri, '/');
}

// Map /css/* and /js/* requests to /public/* locally
if (preg_match('#^/(css|js)/#', $uri)) {
    $uri = '/public' . $uri;
}

// 1. Static files check
if (file_exists(__DIR__ . $uri) && !is_dir(__DIR__ . $uri)) {
    return false; // serve as-is
}

// 2. Public folder static files check
if (in_array($uri, ['/favicon.ico', '/manifest.json', '/ads.txt', '/apple-icon.png', '/favicon.png', '/og-image.jpg', '/og-image.png'])) {
    $public_file = __DIR__ . '/public' . $uri;
    if (file_exists($public_file)) {
        // Resolve mime type manually for reliability
        $ext = pathinfo($public_file, PATHINFO_EXTENSION);
        $mime = 'application/octet-stream';
        if ($ext === 'ico') $mime = 'image/x-icon';
        elseif ($ext === 'json') $mime = 'application/json';
        elseif ($ext === 'txt') $mime = 'text/plain';
        elseif ($ext === 'png') $mime = 'image/png';
        elseif ($ext === 'jpg' || $ext === 'jpeg') $mime = 'image/jpeg';
        
        header('Content-Type: ' . $mime);
        readfile($public_file);
        exit;
    }
}

// 3. Vercel rewrites emulation
if ($uri === '/sitemap.xml') {
    include __DIR__ . '/api/sitemap.php';
    exit;
}
if ($uri === '/robots.txt') {
    include __DIR__ . '/api/robots.php';
    exit;
}
if ($uri === '/blog') {
    include __DIR__ . '/api/blog.php';
    exit;
}
if ($uri === '/about') {
    include __DIR__ . '/api/about.php';
    exit;
}
if ($uri === '/contact') {
    include __DIR__ . '/api/contact.php';
    exit;
}
if ($uri === '/privacy') {
    include __DIR__ . '/api/privacy.php';
    exit;
}
if ($uri === '/terms') {
    include __DIR__ . '/api/terms.php';
    exit;
}
if ($uri === '/dmca') {
    include __DIR__ . '/api/dmca.php';
    exit;
}

// 4. Dynamic routing (e.g. blog posts /blog/some-slug)
if (preg_match('#^/blog/([^/]+)$#', $uri, $matches)) {
    $_GET['slug'] = $matches[1];
    include __DIR__ . '/api/single-post.php';
    exit;
}

// 5. Default fallback to homepage
if ($uri === '' || $uri === '/') {
    include __DIR__ . '/api/index.php';
    exit;
}

// 6. Redirect standard slug pages /some-slug to /blog/some-slug
if (preg_match('#^/([a-zA-Z0-9\-]+)$#', $uri, $matches)) {
    header("Location: /blog/" . $matches[1], true, 301);
    exit;
}

// 7. Fallback to 404
header("HTTP/1.0 404 Not Found");
echo "404 Not Found";
exit;
