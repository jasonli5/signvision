import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-10">Units</h1>
      <div className="flex flex-row justify-center items-center gap-12">
        <UnitButton unit="1" description="Fingerspelling" />
        <UnitButton unit="2" description="" />
        <UnitButton unit="3" description="" />
      </div>
    </>
  );
}

interface UnitButtonProps {
  unit: string;
  description?: string;
}

export const UnitButton = ({ unit, description }: UnitButtonProps) => {
  return (
    <Link
      href={`unit/${unit}`}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full h-40 w-40 flex justify-center items-center flex-col"
    >
      <p className="font-bold">Unit {unit}</p>
      <p>{description}</p>
    </Link>
  );
};
