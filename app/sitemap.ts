import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: 'https://designedbytd.com/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://designedbytd.com/contact',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
}
