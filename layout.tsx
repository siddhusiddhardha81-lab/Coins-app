import type { Metadata } from "next";
export const metadata: Metadata = { title: "Cash Coins" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Monetag In-Page Push ONLY - Zone 12126793 Lovely tag - Inside website - No popunder - No external redirect */}
        <script dangerouslySetInnerHTML={{__html: "(function(s){s.dataset.zone='12126793',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))"}} />
      </head>
      <body style={{margin:0,background:"#0f1115"}}>{children}</body>
    </html>
  );
}
