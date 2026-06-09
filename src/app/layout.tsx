import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ascendra Advisory | Premium Business Financing & Private Credit",
  description: "Structured corporate financing solutions to optimize cash flow, unlock expansion opportunities, and scale with confidence. Private credit, trade finance, and technology-driven advisory.",
  keywords: "business financing, private credit, working capital, trade finance, bill discounting, venture debt, project finance, CGTMSE, MSME loans, Ascendra Advisory",
  authors: [{ name: "Ascendra Advisory" }],
  openGraph: {
    title: "Ascendra Advisory | Premium Business Financing & Private Credit",
    description: "Structured financing solutions designed to help enterprises scale with confidence. Access a high-end multi-lender network and intelligent capital structuring.",
    type: "website",
    locale: "en_IN",
    url: "https://ascendraadvisory.ai",
    siteName: "Ascendra Advisory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ascendra Advisory | Premium Business Financing",
    description: "Technology-driven financial advisory and private credit structuring for high-growth enterprises.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Financial Service JSON-LD Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Ascendra Advisory",
    "url": "https://ascendraadvisory.ai",
    "logo": "https://ascendraadvisory.ai/logo.png",
    "image": "https://ascendraadvisory.ai/logo-preview.png",
    "description": "Structured corporate financing solutions to optimize cash flow, unlock expansion, and scale. Private credit, trade finance, and technology-driven financial advisory.",
    "telephone": "+91-95828-76556",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Level 8, Naman Centre, Bandra Kurla Complex, Bandra East",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400051",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.0596",
      "longitude": "72.8624"
    },
    "knowsAbout": [
      "Working Capital Loans",
      "Trade Finance & LC/BG",
      "Invoice Discounting & Bill Discounting",
      "Startup Venture Debt",
      "Project Finance",
      "Government Subsidy Linked Schemes"
    ]
  };

  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-navy-dark text-foreground flex flex-col font-sans">
        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
