import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FGM Resources Ghana Limited | Building Value. Unearthing Potential.",
  description: "FGM Resources Ghana Limited — gold exploration and mining, guided by geological discipline, responsible development and operational excellence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
