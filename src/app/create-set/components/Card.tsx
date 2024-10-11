import React from "react";
import { Flashcard } from "@/utils/types";

interface CardProps {
  flashCards: Flashcard[];
  handleInputChange: (id: string, field: keyof Flashcard, value: string) => void;
  removeFlashCard: (id: string) => void;
  isRemoved: string | null
  id: string
}

const Card: React.FC<CardProps> = ({ flashCards, handleInputChange, removeFlashCard, isRemoved, id }) => {
  return (
    <div>
      {flashCards.map((card: Flashcard, index) => (
        <div
          className={`h-fit w-full flex-col rounded bg-gray-400 mb-5 ${isRemoved === card.id ? 'animate__animated animate__bounceOutRight': ''}`}
          key={card.id}
        >
          <div className="flex justify-between items-center border-b-2 border-primary p-4">
            <p className="text-md font-semibold text-gray-200">{++index}</p>
            <button onClick={() => removeFlashCard(card.id)} className="text-md font-semibold text-gray-200">X</button>
          </div>

          <div className="px-4 py-6  sm:flex justify-between items-center gap-6">
            <label className="w-full ">
              <input
                placeholder="Enter term"
                className="w-full outline-none bg-transparent border-b-2 border-b-gray-200 focus:outline-none focus:border-b-secondary placeholder:font-semibold placeholder:text-md placeholder:text-gray-200 text-md text-gray-200 mb-2 focus:border-b-4 focus:ease-in-out duration-200"
                value={card.term}
                onChange={(e) =>
                  handleInputChange(card.id, "term", e.target.value)
                }
              />
              <p className="text-md text-gray-200 mb-5 sm:mb-0">TERM</p>
            </label>

            <label className="w-full">
              <input
                placeholder="Enter definition"
                className="w-full outline-none bg-transparent border-b-2 border-b-gray-200 focus:outline-none focus:border-b-secondary placeholder:font-semibold placeholder:text-md placeholder:text-gray-200 text-md text-gray-200 mb-2 focus:border-b-4 focus:ease-in-out duration-200"
                value={card.definition}
                onChange={(e) =>
                  handleInputChange(card.id, "definition", e.target.value)
                }
              />
              <p className="text-md text-gray-200">DEFINITION</p>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
