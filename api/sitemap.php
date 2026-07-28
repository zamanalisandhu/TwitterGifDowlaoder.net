<?php
header("Content-Type: application/xml; charset=utf-8");

$base_url = "https://twittergifdownloader.net";
$last_modified = date("Y-m-d");

// Helper to fetch posts from WordPress API
function fetchBlogSlugs() {
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
    
    $posts = json_decode($response, true);
    if (!is_array($posts)) {
        return [];
    }
    
    $slugs = [];
    foreach ($posts as $post) {
        $slugs[] = [
            'slug' => $post['slug'] ?? '',
            'date' => isset($post['date']) ? explode("T", $post['date'])[0] : date("Y-m-d")
        ];
    }
    return $slugs;
}

$blog_posts = fetchBlogSlugs();

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
?>
  <!-- Homepage -->
  <url>
    <loc><?php echo $base_url; ?>/</loc>
    <lastmod><?php echo $last_modified; ?></lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Blog Index -->
  <url>
    <loc><?php echo $base_url; ?>/blog</loc>
    <lastmod><?php echo $last_modified; ?></lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Static Pages -->
  <url>
    <loc><?php echo $base_url; ?>/about</loc>
    <lastmod><?php echo $last_modified; ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc><?php echo $base_url; ?>/contact</loc>
    <lastmod><?php echo $last_modified; ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc><?php echo $base_url; ?>/privacy</loc>
    <lastmod><?php echo $last_modified; ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc><?php echo $base_url; ?>/terms</loc>
    <lastmod><?php echo $last_modified; ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc><?php echo $base_url; ?>/dmca</loc>
    <lastmod><?php echo $last_modified; ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
<?php foreach ($blog_posts as $post): if (empty($post['slug'])) continue; ?>
  <!-- Blog Post: <?php echo htmlspecialchars($post['slug']); ?> -->
  <url>
    <loc><?php echo $base_url; ?>/blog/<?php echo htmlspecialchars($post['slug']); ?></loc>
    <lastmod><?php echo htmlspecialchars($post['date']); ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
<?php endforeach; ?>
</urlset>
