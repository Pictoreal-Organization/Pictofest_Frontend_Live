// app/config/metadata.js
export const siteConfig = {
    title: "Pictofest",
    description: "Pictofest is an intercollegiate art fest organized by Pictoreal, aimed at celebrating creativity and artistic expression among students. This vibrant event brings together participants from different colleges to showcase their talents and compete in various creative competitions.",
    keywords: "Pictofest, PICT, art, pictoreal, workshop, fest, photography, competition, event, pune, digital art, pune",
    authors: [{ name: "Pictoreal" }],
    openGraph: {
      title: "PictoFest",
      description: "Pictofest is an intercollegiate art fest organized by Pictoreal, aimed at celebrating creativity and artistic expression among students. This vibrant event brings together participants from different colleges to showcase their talents and compete in various creative competitions.",
      images: ['/img/common/final_logo.png'],
      url: 'https://pictofest.in/',
      siteName: 'PictoFest',
      type: 'website',
    },
    metadataBase: new URL('https://pictofest.in'),
    canonical: 'https://pictofest.in/',
  }