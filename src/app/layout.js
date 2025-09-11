import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "URJA ACADEMY Pathway to Success",
  description: "Join URJA Academy to achieve excellence in learning and career growth.",
  icons: {
    icon: "https://urrja-static-site.vercel.app/assets/img/logo/logo.svg",       // standard favicon
    shortcut: "https://urrja-static-site.vercel.app/assets/img/logo/logo.svg",   // for older browsers
    apple: "https://urrja-static-site.vercel.app/assets/img/logo/logo.svg", // for iOS devices
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        {/* Main content grows to push footer down */}
        <main className="flex-grow">
          {children}
        </main>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,

          }}
        />
        <Footer />
      </body>
    </html>
  );
}
