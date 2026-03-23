import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { GlobalNav } from "@/components/printtie/global-nav";
import { GlobalFooter } from "@/components/printtie/global-footer";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  title: "printtie",
  description: "작가와 팬을 잇는, 작품 발견에서 배송까지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={atkinson.variable}>
      <body className="min-h-dvh bg-[#ECFEFF] text-[#0F4B57] font-atkinson">
        <GlobalNav />
        <div className="pt-[76px]">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
