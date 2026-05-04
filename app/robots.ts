import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot'],
        disallow: '/',
      }
    ],
    sitemap: 'https://twittergifdownloader.net/sitemap.xml',
  }
}
