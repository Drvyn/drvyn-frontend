import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Drvyn",
  description: "Your car's best friend",
  icons: {
    icon: "/favicon3.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
              background: '#fff',
              color: '#000',
            },
          }}
        />
      </body>
    </html>
  );
}