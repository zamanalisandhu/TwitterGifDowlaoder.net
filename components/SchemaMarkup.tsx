import React from 'react';

export default function SchemaMarkup() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "TwitterGIFDownloader",
      "url": "https://twittergifdownloader.net",
      "description": "Free online tool to download Twitter/X GIFs and videos in HD quality without watermarks.",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "12847",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this tool free to use?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, TwitterGIFDownloader.net is 100% free. You can download as many GIFs as you want without any hidden charges or subscriptions." }
        },
        {
          "@type": "Question",
          "name": "Do I need to sign up for an account?",
          "acceptedAnswer": { "@type": "Answer", "text": "No signup or login is required. Just paste the tweet URL and download your GIF instantly." }
        }
        // Additional FAQ items could be added here based on components/FAQ.tsx
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Download GIFs from Twitter",
      "description": "Save any Twitter/X GIF in 4 simple steps",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Find the Tweet",
          "text": "Locate the tweet containing the GIF you want to download."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Copy URL",
          "text": "Click the share icon and copy the link to the tweet."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Paste in Tool",
          "text": "Paste the URL into the TwitterGIFDownloader input box."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Download",
          "text": "Click download and choose your preferred format (MP4 or GIF)."
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TwitterGIFDownloader",
      "url": "https://twittergifdownloader.net",
      "logo": "https://twittergifdownloader.net/og-image.png"
    }
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
