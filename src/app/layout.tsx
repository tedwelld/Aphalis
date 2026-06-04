import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "primeicons/primeicons.css";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppButton";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const bokunLoader = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${siteConfig.bokunChannelUUID}`;
  const bokunConfigured = !siteConfig.bokunChannelUUID.startsWith("00000000");

  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before paint: marks JS-enabled (so scroll-reveal elements only
            hide when JS can reveal them) and applies the saved theme to avoid a
            flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var e=document.documentElement;e.classList.add('js');if(localStorage.getItem('theme')==='dark'){e.classList.add('dark');}}catch(err){}})();",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-cream text-foreground">
        {/* Bokun loader — injected once; scans the page for .bokunWidget elements
            and renders the booking iframe + site-wide floating cart. */}
        {bokunConfigured && <Script src={bokunLoader} strategy="afterInteractive" />}

        <StructuredData />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
