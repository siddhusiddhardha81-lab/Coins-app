import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Coins App",
  description: "Earn Coins Daily",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <【entity-meta¦canonical_name=Meta】 name="mylead-verification" content="b1cc463159fd900403d5d969917c5eb4" />
      </head>
      <body>
        <div style={{ display: 'none' }}>b1cc463159fd900403d5d969917c5eb4</div>
        {children}
      </body>
    </html>
  );
}
