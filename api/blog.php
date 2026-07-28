<?php
$page_title = "Blog | TwitterGIF";
$page_desc = "Latest guides and tips for downloading Twitter GIFs and videos.";
$canonical_url = "https://twittergifdownloader.net/blog";

include 'header.php';

// Helper to fetch posts from WordPress API
function fetchWpPosts() {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://admin.twittergifdownloader.net/wp-json/wp/v2/posts?_embed&per_page=100");
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
        return [];
    }
    
    return json_decode($response, true) ?: [];
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

$wpPosts = fetchWpPosts();
$posts = array_map('parseWpPost', $wpPosts);
?>

<main id="main-content" class="min-h-screen saas-gradient">
    <div class="pt-24 pb-16 container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-20">
            <h1 class="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-800">
                Our <span class="text-gradient">Blog</span>
            </h1>
            <p class="text-lg sm:text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
                Guides, insights, and updates from the TwitterGIF team.
            </p>
        </div>

        <?php if (empty($posts)): ?>
            <div class="text-center py-24">
                <p class="text-slate-500 text-lg">No blog posts found. Please check back later.</p>
            </div>
        <?php else: ?>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <?php foreach ($posts as $post): ?>
                    <a href="/blog/<?php echo urlencode($post['slug']); ?>">
                        <article class="group h-full saas-card p-8 flex flex-col justify-between">
                            <div>
                                <?php if ($post['image']): ?>
                                    <div class="aspect-[1200/628] w-full mb-6 rounded-2xl overflow-hidden relative border border-slate-100 bg-slate-50">
                                        <img 
                                            src="<?php echo htmlspecialchars($post['image']); ?>" 
                                            alt="<?php echo htmlspecialchars($post['title']); ?>" 
                                            class="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                <?php endif; ?>
                                
                                <div class="flex items-center justify-between mb-6">
                                    <div class="px-3 py-1 rounded-full bg-indigo-50 text-primary text-[10px] font-bold uppercase tracking-wider">
                                        <?php echo htmlspecialchars($post['category']); ?>
                                    </div>
                                    <div class="flex items-center gap-4 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                        <div class="flex items-center gap-1">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"></path></svg>
                                            <?php echo htmlspecialchars($post['date']); ?>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path></svg>
                                            <?php echo htmlspecialchars($post['readTime']); ?>
                                        </div>
                                    </div>
                                </div>
                                  
                                <h2 class="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 text-slate-800">
                                    <?php echo htmlspecialchars($post['title']); ?>
                                </h2>
                                
                                <p class="text-slate-500 mb-6 line-clamp-3 leading-relaxed text-sm">
                                    <?php echo htmlspecialchars($post['excerpt']); ?>
                                </p>
                            </div>
                            
                            <div class="flex items-center gap-2 text-primary font-bold text-sm mt-4">
                                Read More
                                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </article>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php include 'footer.php'; ?>
