import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'ALTHÉA Mobile',
        short_name: 'ALTHÉA',
        description: 'Application terrain pour la gestion de chancier ALTHÉA.',
        start_url: '/terrain',
        display: 'standalone',
        background_color: '#FAF9F6',
        theme_color: '#B89745',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '192x192',
                type: 'image/ico',
            },
        ],
    }
}
