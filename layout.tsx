import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coins App - 500 Coins = 50 Rupees",
  description: "Watch ads, complete offers, 500 coins = 50 rupees withdrawal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 
          REAL MONETAG IN-PUSH TAG - NEW - 12138304 
          nap5k.com/tag.min.js - ONLY DISPLAY - NO COINS
          OLD TAGS DELETED: 12128255 al5sm.com (popunder), 12128279 n6wxm.com (vignette), 12126793 lovely
          This tag stays inside website, no external redirect, only display
          All files layout.tsx, page.tsx, index.html lo idhe okkate undali
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='12138304',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, background: "#000", fontFamily: "system-ui" }}>
        {children}
      </body>
    </html>
  );
}
