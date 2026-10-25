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
        <meta name="mylead-verification" content="b1cc463159fd900403d5d969917c5eb4" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5062837450367714"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
