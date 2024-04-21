"use client";

import useAICamera from "@/hooks/useAICamera";
import unitData from "@/public/data/unit_1.json";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import left_arrow from "@/public/icons/left-arrow.svg";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Page({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0);

  const [spelling, setSpelling] = useState<string>("");
  const [toggleHint, setToggleHint] = useState(false);

  const [nameInput, setNameInput] = useState<string>("");

  const unit = unitData.find((lesson) => lesson.lesson === params.id);

  const content = unit?.content[currentStep];
  const contentType = content?.type;

  const { label, confidence, videoRef, canvasRef } = useAICamera(
    contentType === "attempt" || contentType === "spell"
  );

  if (!unit || !content || !contentType) return <div>Lesson not found</div>;

  const onContinue = () => {
    console.log(currentStep, unit.content.length - 1);
    if (currentStep < unit.content.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setSpelling("");
  }, [currentStep]);

  return (
    <>
      <div className="flex-col w-auto justify-center items-center m-auto py-5 bg-slate-100 rounded-lg shadow-md inline-flex relative">
        <Link href="/unit/1" className="absolute top-4 left-4">
          <img src={left_arrow.src} alt="Go back" className="w-8 h-8" />
        </Link>
        {contentType === "spell" && (
          <div className="absolute top-4 right-4 flex justify-center items-center gap-2">
            <Label htmlFor="toggle-hint">Toggle Hint</Label>
            <Switch
              id="toggle-hint"
              checked={toggleHint}
              onClick={() => setToggleHint(!toggleHint)}
            />
          </div>
        )}

        {contentType === "learn" && (
          <>
            <LearningCard
              character={content.character!}
              description={content.description!}
            />
            <ContinueButton onClick={onContinue} />
          </>
        )}
        {contentType === "attempt" && (
          <AttemptCard
            videoRef={videoRef}
            canvasRef={canvasRef}
            label={label}
            character={content.character!}
            confidence={confidence}
            continueOnClick={onContinue}
          />
        )}
        {contentType === "finish" && <FinishCard />}
        {contentType === "challenge" && <ChallengeCard onClick={onContinue} />}
        {contentType === "spell" && nameInput === "" && (
          <SpellCard
            word={content.character!}
            label={label}
            confidence={confidence}
            currentSpelling={spelling}
            setSpelling={setSpelling}
            videoRef={videoRef}
            canvasRef={canvasRef}
            onClick={onContinue}
          />
        )}
        {contentType === "spell_name" && (
          <InputCard onClick={onContinue} setNameInput={setNameInput} />
        )}
        {contentType === "spell" && nameInput != "" && (
          <SpellCard
            word={nameInput.toUpperCase()}
            label={label}
            confidence={confidence}
            currentSpelling={spelling}
            setSpelling={setSpelling}
            videoRef={videoRef}
            canvasRef={canvasRef}
            onClick={onContinue}
          />
        )}
        <div
          className="h-2 bg-green-500 absolute bottom-0 left-0 rounded-b transition-all duration-500"
          style={{
            width: `${((currentStep + 1) / unit.content.length) * 100}%`,
          }}
        ></div>
      </div>
      {contentType === "spell" && toggleHint && (
        <HintCard
          letter={
            content.character![spelling.length] === ""
              ? content.character![spelling.length]
              : nameInput[spelling.length]
          }
        />
      )}
    </>
  );
}

interface LearningCardProps {
  character: string;
  description: string;
}

const LearningCard = ({ character, description }: LearningCardProps) => {
  return (
    <div className="p-4 w-[500px] h-full flex justify-center items-center flex-col">
      <h2 className="text-xl font-bold">Letter "{character}"</h2>
      <div className="p-4 flex flex-col gap-3">
        <video
          src={`/videos/${character}.mp4`}
          autoPlay
          loop
          className="rounded"
          width={600}
        />
        <p className="">{description}</p>
      </div>
    </div>
  );
};

interface AttemptCardProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  label: string;
  character: string;
  confidence: number;
  continueOnClick: () => void;
}

const AttemptCard = ({
  videoRef,
  canvasRef,
  label,
  character,
  confidence,
  continueOnClick,
}: AttemptCardProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (character === label && isCorrect === null && confidence > 0.85) {
    setIsCorrect(true);
  }

  return (
    <>
      <div className="p-4 w-full h-full flex justify-center items-center">
        <div className="p-4 flex flex-col gap-3 justify-center items-center relative">
          <h2 className="text-xl font-bold">Letter "{character}"</h2>
          <div className="flex flex-row justify-center items-center gap-4">
            <video
              src={`/videos/${character}.mp4`}
              autoPlay
              playsInline
              loop
              width={400}
              className="rounded"
            />
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                width={400}
                className="rounded"
              />
              <canvas
                ref={canvasRef}
                className="w-[400px] absolute top-0 left-0 rounded"
              />
            </div>
          </div>
          <p className="text-xl">Try it out!</p>
          {isCorrect && <p className="text-green-500">Correct!</p>}
        </div>
      </div>
      <ContinueButton onClick={continueOnClick} disabled={!isCorrect} />
    </>
  );
};

const ContinueButton = ({
  onClick,
  label = "Continue",
  disabled,
}: {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed mb-2"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

const FinishCard = () => {
  return (
    <div className="p-4 w-[400px] h-full flex justify-center items-center">
      <div className="p-4 flex flex-col gap-6 justify-center items-center">
        <h2 className="text-xl font-bold">Congratulations!</h2>
        <p>You've completed this lesson.</p>
        <Link
          href="/unit/1"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

interface ChallengeCardProps {
  onClick: () => void;
}

const ChallengeCard = ({ onClick }: ChallengeCardProps) => {
  return (
    <div className="p-4 w-full h-full flex justify-center items-center">
      <div className="p-4 flex flex-col gap-6 justify-center items-center">
        <h2 className="text-xl font-bold">Challenge</h2>
        <p>Test your skills by fingerspelling the words shown on the screen.</p>
        <ContinueButton onClick={onClick} label="Start challenge" />
      </div>
    </div>
  );
};

interface SpellCardProps {
  word: string;
  label: string;
  confidence: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setSpelling: Dispatch<SetStateAction<string>>;
  currentSpelling: string;
  onClick: () => void;
}

const SpellCard = ({
  word,
  label,
  confidence,
  videoRef,
  canvasRef,
  setSpelling,
  currentSpelling,
  onClick,
}: SpellCardProps) => {
  const letters = word.split("");

  const isCorrect = word === currentSpelling;

  console.log(label, letters[currentSpelling.length]);

  if (
    currentSpelling.length < word.length &&
    label === letters[currentSpelling.length] &&
    confidence > 0.85 &&
    !isCorrect
  ) {
    console.log("first");
    const newSpell = currentSpelling + label;

    if (word.includes(newSpell)) {
      setSpelling(newSpell);
    }
  }

  return (
    <div className="p-4 w-full h-full flex justify-center items-center">
      <div className="p-4 flex flex-col gap-3 justify-center items-center">
        <h2 className="text-xl font-bold">Spell the word</h2>
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width={400}
            className="rounded"
          />
          <canvas
            ref={canvasRef}
            className="w-[400px] rounded absolute left-0 top-0"
          />
        </div>
        <div className="my-4">
          {letters.map((letter, index) => (
            <span
              className={`text-6xl font-bold
                ${
                  currentSpelling.length > index
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
            >
              {letter}
            </span>
          ))}
        </div>
        {isCorrect && <p className="text-green-500">Correct! Good job</p>}
        <ContinueButton onClick={onClick} disabled={!isCorrect} />
      </div>
    </div>
  );
};

interface HintCardProps {
  letter: string;
}

const HintCard = ({ letter }: HintCardProps) => {
  if (!letter) return null;

  return (
    <div className="p-4 flex flex-col gap-3 justify-center items-center">
      <h2 className="text-xl font-bold">Hint</h2>
      <img
        src={`/sign_images/${letter.toLowerCase()}.png`}
        alt={letter}
        className="w-[200px]"
      />
    </div>
  );
};

interface InputCardProps {
  onClick: () => void;
  setNameInput: Dispatch<SetStateAction<string>>;
}

const InputCard = ({ onClick, setNameInput }: InputCardProps) => {
  return (
    <div className="p-4 w-[450px] h-full flex justify-center items-center">
      <div className="p-4 flex flex-col gap-5 justify-center items-center">
        <h2 className="text-xl font-bold">Spell your name!</h2>
        <p className="text-xl">What is your name?</p>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded"
          placeholder="Enter your spelling"
          onChange={(e) => setNameInput(e.target.value)}
        />
        <ContinueButton onClick={onClick} label="Continue" />
      </div>
    </div>
  );
};
