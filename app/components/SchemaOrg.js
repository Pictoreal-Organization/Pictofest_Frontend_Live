// app/components/SchemaOrg.js
import Script from 'next/script'

export default function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Pictofest',
    description: siteConfig.description,
    image: siteConfig.openGraph.images[0],
    url: siteConfig.openGraph.url,
    organizer: {
      '@type': 'Organization',
      name: 'Pictoreal',
      url: siteConfig.openGraph.url
    },
    // Add more event-specific details like dates, location, etc.
  }

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}