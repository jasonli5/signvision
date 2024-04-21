import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import footer_icon from "@/public/icons/footer.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SignVision",
  description: "An application for learning sign language.",
};

const playfairFont = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700"],
});

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
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
