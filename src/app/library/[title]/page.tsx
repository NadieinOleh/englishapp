"use client";

import Link from "next/link";

const FlashCards = ({ params }: { params: { title: string } }) => {
  return (
    <main className="custom-main">
      <div>
        <h1 className="text-white text-3xl font-bold mb-4 sm:text-4xl">
          {params.title}
        </h1>

        <div className="flex justify-center items-center gap-2">
          <Link href="/create-set" className="bg-mainText border-b-8 border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-10 py-10 rounded shadow-md">
            Create Flashcards
          </Link>
          <Link href="/" className="bg-mainText border-b-8 border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-10 py-10 rounded shadow-md">
            Create folder
          </Link>
          <Link href="/" className="bg-mainText border-b-8 border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-10 py-10 rounded shadow-md">
            Create folder
          </Link>
          <Link href="/" className="bg-mainText border-b-8 border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-10 py-10 rounded shadow-md">
            Create folder
          </Link>
        </div>

        <p>This is a dynamic blog post page for .</p>
      </div>
    </main>
  );
};

export default FlashCards;
