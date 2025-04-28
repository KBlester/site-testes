import "@/styles/globals.css";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};
export const metadata: Metadata = {
  title: {
    default: "Creatr",
    template: "%s | Creatr"
  },
  description: "Plataforma de avaliação de artistas e sistema de recompensas",
  applicationName: "Creatr",
  keywords: ["avaliação", "artistas", "música", "recompensas", "spotify", "youtube"],
  authors: [{
    name: "Creatr Team"
  }],
  creator: "Creatr Team",
  publisher: "Creatr Team",
  icons: {
    icon: [{
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png"
    }, {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    }, {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon"
    }],
    apple: [{
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png"
    }]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Creatr"
  },
  formatDetection: {
    telephone: false
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="pt-BR" className={`${GeistSans.variable}`} data-unique-id="14352e17-1e6f-45f6-a98f-de915d1cbb43" data-loc="60:9-60:64" data-file-name="app/layout.tsx">
      <body data-unique-id="72f5589a-073f-42b9-a180-8215e070436d" data-loc="61:6-61:12" data-file-name="app/layout.tsx">
        <Navbar />
        <main className="min-h-[calc(100vh-64px)]" data-unique-id="14b6c590-2416-45f7-96ba-bd92f9d4eb00" data-loc="63:8-63:51" data-file-name="app/layout.tsx">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-200 py-8" data-unique-id="2f68e2f8-c824-4768-972b-86d33fb661ba" data-loc="66:8-66:68" data-file-name="app/layout.tsx">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-unique-id="bc14dfa5-b6d6-4ebe-bd87-9ac11f474b36" data-loc="67:10-67:66" data-file-name="app/layout.tsx">
            <p className="text-center text-sm text-slate-500" data-unique-id="2a7a6abe-19c0-46be-8aaf-d2dfd827cc7e" data-loc="68:12-68:62" data-file-name="app/layout.tsx">
              Creatr © {new Date().getFullYear()} - Plataforma de avaliação de artistas
            </p>
          </div>
        </footer>
        <Toaster position="top-center" richColors />
      </body>
    </html>;
}