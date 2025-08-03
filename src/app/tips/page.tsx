"use client";

import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import { TIPS } from "@/utils/constants";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Tips = () => {
  return (
    <div className="custom-main mt-5">
      <Swiper
        style={
          {
            "--swiper-pagination-bullet-inactive-color": "#B4D6CD",
            "--swiper-pagination-color": "#FFBA08",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
            "--swiper-pagination-bullet-size": "16px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
            "--swiper-pagination-bullet-vertical-gap": "18px",
          } as any
        }
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="lg:h-[400px] h-[100%]"
      >
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row lg:items-center w-full gap-3 items-stretch">
            <div className="w-full lg:w-1/2 relative h-64">
              <Image
                src="/words1.jpg"
                alt="words1"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-2 text-secondary text-center">
                Engage Your Memory with Flashcards
              </h2>
              <p className="text-base leading-relaxed text-secondary">
                Flashcards are an excellent tool for building and retaining
                vocabulary. Start by writing each new word on one side of a card
                and its definition—or a sentence using the word—on the other
                side. This method promotes active recall, which is essential for
                transferring information from short-term to long-term memory. By
                regularly reviewing your cards and testing yourself, you
                reinforce these connections over time. For an added boost, try
                incorporating spaced repetition: focus more on the cards you
                find challenging and gradually increase the interval between
                reviews as your confidence grows. Over time, this consistent
                practice will help you internalize new words and improve your
                language skills.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col lg:flex-row lg:items-center w-full gap-3 items-stretch">
            <div className="w-full lg:w-1/2 relative  h-64">
              <Image
                src="/words2.jpg"
                alt="words2"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-2 text-secondary text-center">
                The Art of Flashcard Learning
              </h2>
              <p className="text-base leading-relaxed text-secondary">
                Using flashcards transforms vocabulary learning into an engaging
                and personalized experience. Not only do they break down complex
                words into manageable bits, but they also allow you to employ
                creative memory techniques. For example, on the reverse side of
                a card, you might add an image, mnemonic, or personal
                association that ties the word to a memorable concept or
                emotion. This multi-sensory approach engages different areas of
                your brain, making it easier to recall the word later. Regularly
                shuffling your cards prevents you from simply memorizing the
                order, ensuring that you truly learn the material. With time,
                this technique builds a robust mental network of words that
                enhances both understanding and retention.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col lg:flex-row lg:items-center w-full gap-3 items-stretch">
            <div className="w-full lg:w-1/2 relative  h-64">
              <Image
                src="/words3.jpg"
                alt="words3"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-2 text-secondary text-center">
                Mastering Vocabulary Through Consistent Review
              </h2>
              <p className="text-base leading-relaxed text-secondary">
                One of the most effective ways to remember new words is to
                create your own set of flashcards and review them consistently.
                Write the target word on one side and its definition, synonyms,
                or an example sentence on the other side. This not only
                clarifies its meaning but also provides context for usage. By
                setting aside a few minutes each day to go through your cards,
                you harness the power of repetition. Over time, as you
                repeatedly test yourself and recall the words, you strengthen
                the neural pathways associated with that vocabulary.
                Incorporating spaced repetition into your study sessions—where
                challenging words are reviewed more frequently than those you
                find easier—ensures that your memory retention steadily
                improves, making learning both effective and sustainable.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <h1 className="text-center text-xl mt-5 mb-5 text-mainText font-bold">
        Tips for Learning Words in Quizlet
      </h1>

      <ol className="mb-5">
        {TIPS.map((tip: { title: string; text: string }, i: number) => (
          <li key={i} className="mb-3">
            <h3 className="text-lg  text-mainText font-bold">{tip.title}</h3>
            <p className="text-lg  text-secondary font-bold">{tip.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Tips;
