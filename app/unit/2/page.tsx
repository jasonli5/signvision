import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const PlayfairDisplayFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "700"],
});

export default function Page() {
  return (
    <>
      <div className="title-section flex flex-col justify-center items-center mb-10">
        <div className="mb-8 flex justify-center flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-1">
            Advanced Level
          </h1>
          <p className="text-xl">Words, phrases, and sentences</p>
        </div>

        <p
          className={`${PlayfairDisplayFont.className} text-lg text-center w-[70%]`}
        >
          Welcome to the Advanced Level of American Sign Language! In this
          level, you will learn more complex signs and phrases to help you
          communicate with others who are deaf or hard of hearing. Let's get
          started!
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-12">
        <LessonButton lesson="1" description="Greetings" />
        <LessonButton lesson="2" description="Phrases" />
        <LessonButton lesson="3" description="Conversations" />
      </div>
      <Link href="/unit/1" className="flex items-center justify-center mt-12">
        <span className="text-lg font-bold underline text-blue-700">
          Go to Beginner Level
        </span>
      </Link>
    </>
  );
}

interface LessonButtonProps {
  lesson: string;
  description: string;
}

const LessonButton = ({ lesson, description }: LessonButtonProps) => {
  return (
    <Link
      href={`2/${lesson}`}
      className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-full h-32 w-32 flex justify-center items-center flex-col"
    >
      <p className="font-bold">Lesson {lesson}</p>
      <p>{description}</p>
    </Link>
  );
};
