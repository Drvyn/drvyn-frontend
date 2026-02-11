import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drvyn.in"),

  title: {
    default: "Drvyn - Car Service in Coimbatore | Mechanic Near Selvapuram",
    template: "%s | Drvyn Coimbatore",
  },

  description:
    "Expert car service in Coimbatore at Sokkamputhur Rd, Selvapuram. Doorstep pickup, car wash, detailing, denting, painting & 24/7 breakdown support.",

  keywords: [
    "Car service Coimbatore",
    "Car repair Coimbatore",
    "Car mechanic near me",
    "Doorstep car service Coimbatore",
    "Car wash Selvapuram",
    "Car detailing Coimbatore",
    "Car painting Coimbatore",
    "Car breakdown assistance Coimbatore",
    "Drvyn car service",
  ],

  authors: [{ name: "Drvyn" }],
  
  alternates: {
    canonical: "https://drvyn.in",
  },

  openGraph: {
    title: "Drvyn - Best Car Service in Coimbatore",
    description:
      "Professional car service, repair, and detailing in Coimbatore with doorstep pickup. Visit us at Selvapuram or book online.",
    url: "https://drvyn.in",
    siteName: "Drvyn",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Drvyn Car Service Center Coimbatore",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Drvyn - Car Service Coimbatore",
    description: "Expert car repair and maintenance in Coimbatore. Doorstep pickup available.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon3.png",
    apple: "/favicon3.png",
  },

  verification: {
    google: "SyxIAgGg2SdZJVYbQM1-vMFSq15N5nWkLcF-r0mZFUc", 
  },

  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore",
    "geo.position": "10.9920;76.9327",
    "ICBM": "10.9920, 76.9327",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Drvyn",
    image: "https://drvyn.in/og-image.jpg",
    "@id": "https://drvyn.in",
    url: "https://drvyn.in",
    telephone: "+919840277116", 
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      "streetAddress": "Sokkamputhur Rd, Shanmuga Nagar, Selvapuram North",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "postalCode": "641039",
      "addressCountry": "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      "latitude": 10.9920,
      "longitude": 76.9327,
    },
    areaServed: {
      "@type": "City",
      "name": "Coimbatore"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    sameAs: [
      "https://www.facebook.com/share/1FBSPqrZLe/?mibextid=wwXIfr",
      "https://www.instagram.com/drvynindia?igsh=MW04MjU4MGIzcjB4dA%3D%3D&utm_source=qr"
    ],
    paymentAccepted: ["Cash", "Credit Card", "UPI", "Debit Card"],
    makesOffer: {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Car Repair, Detailing, Painting, General Service"
      }
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J9GJZ6BMKP"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J9GJZ6BMKP');
          `}
        </Script>

        {/* Microsoft Clarity Tracking */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vfryqkoe0d");
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>

      <body className={`${poppins.className} antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}