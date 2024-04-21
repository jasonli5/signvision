import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center mb-12 mt-4">
        <h1 className="text-4xl font-bold text-center">
          American Sign Language
        </h1>
        <p className="w-full max-w-[80%] text-[20px] text-center">
          American Sign Language is hard. So we’ve made it easier for you by
          breaking it into levels. However, if you already know some ASL, you
          can skip ahead.
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-12">
        <UnitButton unit="1" description="Beginner" />
        <UnitButton unit="2" description="Advanced" />
      </div>
    </>
  );
}

interface UnitButtonProps {
  unit: string;
  description?: string;
}

const UnitButton = ({ unit, description }: UnitButtonProps) => {
  return (
    <Link
      href={`unit/${unit}`}
      className="text-white py-2 px-4 rounded-full h-40 w-40 flex justify-center items-center flex-col"
      style={{
        backgroundColor: description === "Beginner" ? "#68E46D" : "#FF3131",
      }}
    >
      <p className="font-bold">Level</p>
      <p className="italic">{description}</p>
    </Link>
  );
};
