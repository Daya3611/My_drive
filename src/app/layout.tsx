import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: '--front-bricolage',
});

export const metadata: Metadata = {
  title: "My Drive",
  description: "A simple file manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={bricolage_grotesque.className}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
