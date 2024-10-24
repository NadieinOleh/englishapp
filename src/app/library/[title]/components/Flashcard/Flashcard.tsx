import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Flashcard as Card } from "@/utils/types";
import { RootState } from "@/lib/store/store";
import Loading from "@/app/components/Loading/Loading";

interface FlashCardsProps {
  isShuffled: boolean;
  currentIndex: number;
  setCurrentIndex: (value: number) => void;
}

const Flashcard: FC<FlashCardsProps> = ({
  isShuffled,
  setCurrentIndex,
  currentIndex,
}) => {
  const { flashcards } = useSelector(({ flashcards }: RootState) => flashcards);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col m-auto items-center justify-center mt-10 ">
      <div
        className="relative w-[100%] h-[300px] min-[861px]:w-[820px]  md:h-96 mb-10"
        onClick={handleFlip}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`flashcard-inner w-full h-full  rounded-lg shadow-xl transition-transform duration-700 ${
            isFlipped ? "flashcard-flipped" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="flashcard-front absolute w-full  h-full flex items-center justify-center bg-mainText text-black rounded-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="absolute top-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary font-bold">
              {isShuffled ? "FRONT" : "BACK"}
            </p>
            <p className="text-3xl">
              {isShuffled
                ? flashcards[currentIndex]?.term || "..."
                : flashcards[currentIndex]?.definition || "..."}
            </p>
          </div>

          <div
            className="flashcard-back absolute w-full h-full flex items-center justify-center bg-mainText text-black rounded-lg transform rotateY-180"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="absolute top-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary font-bold">
              {isShuffled ? " BACK" : "FRONT"}
            </p>
            <p className="text-3xl">
              {isShuffled
                ? flashcards[currentIndex]?.definition || "..."
                : flashcards[currentIndex]?.term || "..."}
            </p>
          </div>
        </div>
      </div>

      {!!flashcards.length && (
        <div className="flex space-x-4">
          <button
            onClick={handlePrevious}
            className="bg-secondary hover:bg-primaryHover text-primary font-bold px-6 py-2 rounded  flex justify-content items-center shadow-md"
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>
          <p className="flex justify-center items-center font-bold text-secondary">
            {currentIndex + 1} / {flashcards.length}
          </p>
          <button
            onClick={handleNext}
            className="bg-secondary hover:bg-primaryHover text-primary font-bold px-6 py-2 rounded  flex justify-content items-center shadow-md"
            disabled={currentIndex === flashcards.length - 1}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
