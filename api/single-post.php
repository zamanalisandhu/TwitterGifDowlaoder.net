<?php
// Retrieve the slug parameter
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';

if (empty($slug)) {
    header("Location: /blog", true, 302);
    exit;
}

// Fetch single post by slug from WordPress API
function fetchWpPostBySlug($slug) {
    $ch = curl_init();
    $url = "https://admin.twittergifdownloader.net/wp-json/wp/v2/posts?slug=" . urlencode($slug) . "&_embed";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, "TwitterGIFDownloader.net Migration Agent");
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code !== 200 || !$response) {
        return null;
    }
    
    $posts = json_decode($response, true);
    if (!is_array($posts) || empty($posts)) {
        return null;
    }
    
    return $posts[0]; // Return the first matched post
}

function parseWpPost($post) {
    $title = html_entity_decode($post['title']['rendered'] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    
    $rawExcerpt = $post['excerpt']['rendered'] ?? '';
    $cleanExcerpt = html_entity_decode(strip_tags($rawExcerpt), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $cleanExcerpt = trim(str_replace('[&hellip;]', '...', $cleanExcerpt));
    
    $rawContent = $post['content']['rendered'] ?? '';
    $content = html_entity_decode($rawContent, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    
    $date = isset($post['date']) ? explode("T", $post['date'])[0] : '';
    
    $category = "General";
    if (isset($post['_embedded']['wp:term'][0]) && is_array($post['_embedded']['wp:term'][0])) {
        $categories = $post['_embedded']['wp:term'][0];
        if (count($categories) > 0) {
            $category = html_entity_decode($categories[0]['name'] ?? 'General', ENT_QUOTES | ENT_HTML5, 'UTF-8');
        }
    }
    
    $featuredMedia = isset($post['_embedded']['wp:featuredmedia'][0]) ? $post['_embedded']['wp:featuredmedia'][0] : null;
    $featuredImageUrl = $post['featured_image_url'] ?? 
                         $post['featured_image_src'] ?? 
                         $post['featured_media_src_url'] ?? 
                         ($featuredMedia['source_url'] ?? null);
    
    $fallbackImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800";
    $finalImageUrl = ($featuredImageUrl && is_string($featuredImageUrl) && strpos($featuredImageUrl, 'http') === 0) 
        ? $featuredImageUrl 
        : $fallbackImage;
        
    $words = str_word_count(strip_tags($content));
    $minutes = ceil($words / 200);
    $readTime = ($minutes ?: 1) . " min read";
    
    return [
        'id' => $post['id'] ?? '',
        'slug' => $post['slug'] ?? '',
        'title' => $title,
        'excerpt' => $cleanExcerpt,
        'date' => $date,
        'readTime' => $readTime,
        'category' => $category,
        'image' => $finalImageUrl,
        'content' => $content
    ];
}

$rawPost = fetchWpPostBySlug($slug);

if (!$rawPost) {
    // Return 404 Header and render a clean not-found layout
    http_response_code(404);
    $page_title = "404 Not Found | TwitterGIF";
    $page_desc = "The page you are looking for does not exist.";
    include 'header.php';
    ?>
    <main id="main-content" class="min-h-screen saas-gradient text-slate-800 flex items-center justify-center py-24 px-4">
        <div class="text-center max-w-md mx-auto bg-white p-10 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50">
            <h1 class="text-7xl font-black mb-6 tracking-tight text-primary">404</h1>
            <h2 class="text-2xl font-bold mb-4 text-slate-800">Post Not Found</h2>
            <p class="text-slate-500 mb-8 text-sm">The blog post "<?php echo htmlspecialchars($slug); ?>" could not be found or has been moved.</p>
            <a href="/blog" class="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-[#06B6D4] text-white font-bold hover:opacity-95 active:scale-95 transition-all inline-block shadow-md shadow-indigo-100">
                Back to Blog
            </a>
        </div>
    </main>
    <?php
    include 'footer.php';
    exit;
}

$post = parseWpPost($rawPost);

// Set dynamic SEO tags for header
$page_title = $post['title'];
$page_desc = $post['excerpt'];
$canonical_url = "https://twittergifdownloader.net/blog/" . $post['slug'];
$og_image = $post['image'];

include 'header.php';
?>

<!-- JSON-LD BlogPosting Schema Markup -->
<script type="application/ld+json">
<?php
$schema = [
  '@context' => 'https://schema.org',
  '@type' => 'BlogPosting',
  'headline' => $post['title'],
  'image' => $post['image'],
  'datePublished' => $post['date'],
  'author' => [
    '@type' => 'Organization',
    'name' => 'TwitterGIFDownloader',
    'url' => 'https://twittergifdownloader.net'
  ],
  'publisher' => [
    '@type' => 'Organization',
    'name' => 'TwitterGIFDownloader',
    'logo' => [
      '@type' => 'ImageObject',
      'url' => 'https://twittergifdownloader.net/og-image.png'
    ]
  ],
  'description' => $post['excerpt'],
  'mainEntityOfPage' => [
    '@type' => 'WebPage',
    '@id' => 'https://twittergifdownloader.net/blog/' . $post['slug']
  ]
];
echo json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
?>
</script>

<main id="main-content" class="min-h-screen saas-gradient text-slate-800">
    <article class="pt-24 pb-16 container mx-auto px-4 max-w-4xl">
        <div class="mb-12 text-center">
            <a 
                href="/blog"
                class="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8 transition-all font-bold"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Back to Blog
            </a>

            <div class="flex items-center justify-center gap-3 mb-6">
                <span class="px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-bold uppercase tracking-wider">
                    <?php echo htmlspecialchars($post['category']); ?>
                </span>
                <span class="text-slate-300 text-xs font-semibold">•</span>
                <span class="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <?php echo htmlspecialchars($post['readTime']); ?>
                </span>
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight leading-[1.1] text-slate-800">
                <?php echo htmlspecialchars($post['title']); ?>
            </h1>
            
            <div class="flex items-center justify-center gap-6 text-sm font-semibold text-slate-500 py-6 border-y border-slate-100">
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"></path></svg>
                    Last Updated: <?php echo htmlspecialchars($post['date']); ?>
                </div>
            </div>
        </div>
        
        <?php if ($post['image']): ?>
            <div class="mb-12 rounded-[28px] overflow-hidden border border-slate-100 aspect-[1200/628] relative max-w-4xl mx-auto shadow-xl shadow-slate-100 bg-slate-50">
                <img 
                    src="<?php echo htmlspecialchars($post['image']); ?>" 
                    alt="<?php echo htmlspecialchars($post['title']); ?>" 
                    class="object-cover w-full h-full"
                />
            </div>
        <?php endif; ?>

        <!-- Content Area with Tailwind Typography classes -->
        <div class="prose prose-slate prose-lg max-w-none 
            prose-headings:text-slate-800 prose-headings:font-extrabold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-100
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
            prose-ul:list-disc prose-li:text-slate-600
            prose-strong:text-slate-800
            prose-table:border-collapse prose-th:bg-slate-50 prose-th:p-4 prose-td:p-4 prose-td:border prose-td:border-slate-150">
            <?php echo $post['content']; ?>
        </div>
        
        <!-- Bottom Call to Action block -->
        <div class="mt-20 p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-primary/5 via-transparent to-[#06B6D4]/5 border border-slate-100 text-center relative overflow-hidden group shadow-md shadow-indigo-100/10">
            <div class="absolute inset-0 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
            <div class="relative z-10">
                <h3 class="text-2xl font-bold mb-4 text-slate-800">Want to save more GIFs?</h3>
                <p class="text-slate-500 mb-8 max-w-md mx-auto text-sm font-semibold">Download high-quality GIFs and videos from Twitter instantly with our free tool.</p>
                <a href="/">
                    <button class="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-[#06B6D4] text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-md shadow-indigo-100">
                        Try Twitter Downloader
                    </button>
                </a>
            </div>
        </div>
    </article>
</main>

<?php include 'footer.php'; ?>
