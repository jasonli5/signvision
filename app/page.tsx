import globe from "@/public/icons/globe_blue.svg";
import down from "@/public/icons/down.svg";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfairFont = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <Link href="/">
        <img
          src={globe.src}
          alt="Globe"
          className="absolute -top-[200px] right-0 -z-10"
        />
      </Link>
      <div className={`${playfairFont.className} flex gap-6 flex-col`}>
        <h1 className="text-6xl font-bold italic" style={{ color: "#00A3DC" }}>
          Sign Vision
        </h1>
        <p className="text-3xl w-[300px] italic font-normal">
          Making sign language easier to learn.
        </p>
      </div>
      <div className="flex items-center gap-12 flex-col mt-20">
        <Link
          href="/unit"
          className="bg-slate-700 hover:bg-slate-900 w-[200px] text-center px-4 py-3 rounded-full text-white mt-12 font-bold text-3xl"
        >
          Let's go
        </Link>
        <img src={down.src} alt="Down arrow" className="w-24" />
      </div>
      <div className="flex flex-col gap-5 mt-24">
        <h2 className="text-3xl font-bold">What we're here for</h2>
        <div className="w-[50%]">
          <p className="mb-6">
            We developed a software to teach people how to use sign language
            with the help of AI primarily for people struggling to learn. Those
            who are deaf, or are unable to speak may only communicate with
            others through written notes, which often felt limiting and
            impersonal. Motivated by our desire to engage more deeply and
            effectively with them, we created this tool to make learning sign
            language accessible and engaging for everyone.
          </p>
          <p>
            Our goal is to encourage people who don’t have the tools to learn
            sign language to learn through our creation, our website.
            Accomplishing this goal means that sign language will not be as rare
            as it is today, and communicating with deaf people will be much
            easier and common. Our mission is to bridge the communication gap
            and foster more inclusive interactions.
          </p>
        </div>
      </div>
    </main>
  );
}
