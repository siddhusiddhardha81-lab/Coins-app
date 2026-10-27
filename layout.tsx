import type { Metadata } from "next";
export const metadata: Metadata = { title: "Cash Coins" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Monetag - CORRECT FOR SCROLLING */}
        {/* 12126793 In-Page Push - Corner push */}
        <script dangerouslySetInnerHTML={{__html: "(function(s){s.dataset.zone='12126793',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))"}} />
        {/* 12128279 Vignette Banner - SCROLLING ADS - Shorts style */}
        <script dangerouslySetInnerHTML={{__html: "(function(s){s.dataset.zone='12128279',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))"}} />
        {/* DELETE 12128255 OnClick - Popunder - Other site open - Ban */}
      </head>
      <body style={{margin:0,background:"#000"}}>{children}</body>
    </html>
  );
}
