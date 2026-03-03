import type { Metadata, Route } from 'next';

const BASE_URL = 'https://axiomia.com';

export function GET(request: Request) {
    return new Response(`User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
