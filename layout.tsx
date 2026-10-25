import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coins App",
  description: "Earn Coins Daily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* METHOD 1: Meta Tag */}
        <meta name="mylead-verification" content="b1cc463159fd900403d5d969917c5eb4" />
        {/* METHOD 2: HTML Comment */}
        {/* mylead-verification: b1cc463159fd900403d5d969917c5eb4 */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossOrigin="anonymous"></script>
      </head>
      <body>
        {/* METHOD 2 & 3: Body lo token */}
        {/* mylead-verification: b1cc463159fd900403d5d969917c5eb4 */}
        <div style={{ display: 'none' }}>b1cc463159fd900403d5d969917c5eb4</div>
        <span style={{ display: 'none' }}>b1cc463159fd900403d5d969917c5eb4</span>
        <div style={{ display: 'none' }}>b1cc463159fd900403d5d969917c5eb4</div>
        {children}
        <div style={{ display: 'none' }}>b1cc463159fd900403d5d969917c5eb4</div>
      </body>
    </html>
  );
}
