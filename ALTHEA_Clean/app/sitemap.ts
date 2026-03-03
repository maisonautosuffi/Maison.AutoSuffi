import { MetadataRoute } from 'next';

const BASE_URL = 'https://axiomia.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/models',
        '/quartiers',
        '/faq',
        '/blog',
        '/contact-chat',
        '/legal',
        '/privacy',
    ];

    return routes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
