import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "~~/components/ui/toaster";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini URL Shortener",
  description:
    "Shorten your links quickly and easily. Because Shorter is Better",
  category: "url shortener",
  generator: "Mini URL Shortener",
  applicationName: "Mini URL Shortener",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Url Shortener",
    "Best url shortener",
    "Mini url shortener",
    "Shorten your links quickly and easily",
    "Shorter is Better",
    "Shorten your links",
    "Tiny url",
    "mini url",
    "free url shortener",
    "free tiny url",
  ],
  creator: "Mahmudul Hasan Nayeem",
  publisher: "Mahmudul Hasan Nayeem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://miniuri.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    images: "/og-preview.png",
    title: "Mini URL Shortener",
    description:
      "Shorten your links quickly and easily. Because Shorter is Better",
    url: "https://miniuri.vercel.app/",
    siteName: "Mini URL Shortener",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.png",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini URL Shortener",
    description:
      "Shorten your links quickly and easily. Because Shorter is Better",
    creator: "@yay_nayeem",
    images: ["/og-preview.png"], //must be an absolute URL
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["mahmudulnayeem71@gmail.com"],
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-HEX9Q97VF4" />
    </html>
  );
}
