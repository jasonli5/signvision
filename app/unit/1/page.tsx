import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="title-section flex flex-col justify-center items-center mb-10">
        <div className="mb-8 flex justify-center flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-1">
            Beginner Level
          </h1>
          <p className="text-xl">Fingerspelling</p>
        </div>
        <p className="text-center w-[70%]">
          Fingerspelling is a method of communicating visually using hand
          gestures to represent letters of the alphabet. It's commonly used by
          individuals who are deaf or hard of hearing to spell out words or
          names that don't have specific signs in sign language.
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-12">
        <LessonButton lesson="1" description="A to E" />
        <LessonButton lesson="2" description="F to J" />
        <LessonButton lesson="3" description="K to O" />
        <LessonButton lesson="4" description="P to T" />
        <LessonButton lesson="5" description="U to Z" />
      </div>
      <div className="flex items-center justify-center">
        <Link
          href="/unit/1/challenge"
          className="flex items-center justify-center rounded-xl text-xl text-white bg-red-500 hover:bg-red-700 py-4 px-6 mt-12"
        >
          Test your skills
        </Link>
      </div>
      <Link href="/unit/2" className="flex items-center justify-center mt-12">
        <span className="text-lg font-bold underline text-blue-700">
          Go to Advanced Level
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
      href={`1/${lesson}`}
      className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-full h-32 w-32 flex justify-center items-center flex-col"
    >
      <p className="font-bold">Lesson {lesson}</p>
      <p>{description}</p>
    </Link>
  );
};
