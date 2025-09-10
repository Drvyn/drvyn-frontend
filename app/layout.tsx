import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Drvyn - Premier Car Services in Coimbatore",
  description: "Experience premier car services in Coimbatore. Get instant quotes for your car service, maintenance, and repairs with Drvyn.",
  keywords: "car service, Coimbatore, auto repair, car maintenance, car service near me",
  authors: [{ name: "Drvyn" }],
  creator: "Drvyn",
  publisher: "Drvyn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://drvyn.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Drvyn - Premier Car Services in Coimbatore",
    description: "Experience premier car services in Coimbatore. Get instant quotes for your car service.",
    url: 'https://drvyn.in',
    siteName: 'Drvyn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Drvyn - Car Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Drvyn - Premier Car Services in Coimbatore",
    description: "Experience premier car services in Coimbatore. Get instant quotes for your car service.",
    images: ['/favicon3.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon3.png",
    apple: "/favicon3.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-J9GJZ6BMKP"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J9GJZ6BMKP');
          `}
        </Script>
      </head>
      <body
        className={`${poppins.className} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#000",
            },
          }}
        />
      </body>
    </html>
  );
}
