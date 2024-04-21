import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import footer_icon from "@/public/icons/footer.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SignVision",
  description: "An application for learning sign language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="w-screen p-10 flex flex-col justify-center">
          {children}
        </main>
        <div className="w-screen h-12">
          <img
            src={footer_icon.src}
            alt="Footer icon"
            className="w-full overflow-hidden object-cover"
          />
        </div>
      </body>
    </html>
  );
}
