'use client'

import { RootState } from '@/lib/store/store';
import React, {useState} from 'react'
import { useSelector } from "react-redux";
import { Flashcard } from "@/utils/types";



const Edit = () => {
const {flashcards} = useSelector(({flashcards}: RootState) => flashcards)
const {description} = useSelector(({description}: RootState) => description)
const [newDesc, setNewDesc] = useState(description)

console.log(description)

  return (
    <main className='custom-main'>
        <h1 className="text-white  text-2xl font-bold  sm:text-4xl mb-4">
          Edit flashcard set
        </h1>

        <div className="bg-white w-full h-1 rounded "></div>

        <textarea
          placeholder="Description"
          value={newDesc}
          onChange={({ target }) => setNewDesc(target.value)}
          className="mt-5 h-20 text-lg font-bold text-primary resize-none w-full md:w-1/2 rounded bg-gray-400 p-2 focus:outline-none focus:border-b-4 border-b-secondary placeholder:text-gray-200 mb-5"
        />

<div>
      {flashcards.map((card: Flashcard, index) => (
        <div
          className={`h-fit w-full flex-col rounded bg-gray-400 mb-5`}
          key={card.id}
        >
         

          <div className="px-4 py-6  sm:flex justify-between items-center gap-6">
            <label className="w-full ">
              <input
                placeholder="Enter term"
                className="w-full outline-none bg-transparent border-b-2 border-b-gray-200 focus:outline-none focus:border-b-secondary placeholder:font-semibold placeholder:text-md placeholder:text-gray-200 text-md text-gray-200 mb-2 focus:border-b-4 focus:ease-in-out duration-200"
                value={card.term}
               
              />
              <p className="text-md text-gray-200 mb-5 sm:mb-0">TERM</p>
            </label>

            <label className="w-full">
              <input
                placeholder="Enter definition"
                className="w-full outline-none bg-transparent border-b-2 border-b-gray-200 focus:outline-none focus:border-b-secondary placeholder:font-semibold placeholder:text-md placeholder:text-gray-200 text-md text-gray-200 mb-2 focus:border-b-4 focus:ease-in-out duration-200"
                value={card.definition}
                
              />
              <p className="text-md text-gray-200">DEFINITION</p>
            </label>
          </div>
        </div>
      ))}
    </div>
    </main>
  )
}

export default Edit
