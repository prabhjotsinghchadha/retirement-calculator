import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Retirement Calculator | Plan Your Financial Future",
  description: "Plan your retirement with our free calculator. Visualize savings growth, account for inflation, and see how much you need to save for a comfortable retirement.",
  keywords: [
    "retirement calculator", 
    "retirement planning", 
    "financial planning", 
    "investment calculator", 
    "savings calculator",
    "compound interest",
    "retirement savings",
    "retirement planner",
    "investment growth",
    "inflation calculator"
  ],
  authors: [{ name: "Retirement Calculator" }],
  creator: "Retirement Calculator Team",
  publisher: "Retirement Calculator",
  metadataBase: new URL("https://retirement-calculator-tan.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://retirement-calculator-tan.vercel.app",
    title: "Retirement Calculator | Plan Your Financial Future",
    description: "Plan your retirement with our free calculator. Visualize savings growth, account for inflation, and see how much you need to save for a comfortable retirement.",
    siteName: "Retirement Calculator",
    images: [
      {
        url: "https://retirement-calculator-tan.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Retirement Calculator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement Calculator | Plan Your Financial Future",
    description: "Plan your retirement with our free calculator. Visualize savings growth, account for inflation, and see how much you need to save for a comfortable retirement.",
    creator: "@retirementcalc",
    images: ["https://retirement-calculator-tan.vercel.app/twitter-image.jpg"],
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Retirement Calculator",
              "description": "Plan your retirement with our free calculator. Visualize savings growth, account for inflation, and see how much you need to save for a comfortable retirement.",
              "url": "https://retirement-calculator-tan.vercel.app",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Interactive retirement planning",
                "Savings growth visualization",
                "Inflation adjustment calculations",
                "Multiple currency support",
                "Responsive design",
                "Dark mode"
              ],
              "screenshot": "https://retirement-calculator-tan.vercel.app/og-image.jpg",
              "creator": {
                "@type": "Organization",
                "name": "Retirement Calculator Team",
                "url": "https://retirement-calculator-tan.vercel.app"
              },
              "maintainer": {
                "@type": "Organization",
                "name": "Retirement Calculator Team",
                "url": "https://retirement-calculator-tan.vercel.app"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
