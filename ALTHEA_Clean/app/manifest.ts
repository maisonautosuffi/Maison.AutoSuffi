import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'AXIOMIA Mobile',
        short_name: 'AXIOMIA',
        description: 'Application terrain pour la gestion de chantier AXIOMIA.',
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
