import type { Metadata } from "next";
export const metadata: Metadata = { title: "Cash Coins - India" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="mylead-verification" content="b1cc463159fd900403d5d969917c5eb4" />
        {/* MITGO VERIFICATION - Replace content with your actual code from id.mitgo.com */}
        <meta name="mitgo-verification" content="REPLACE_WITH_YOUR_MITGO_CODE" />
      </head>
      <body style={{margin:0,background:"#0f1115"}}>
        <div style={{display:"none"}}>b1cc463159fd900403d5d969917c5eb4</div>
        {children}
      </body>
    </html>
  );
