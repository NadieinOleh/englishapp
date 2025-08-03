import React, { FC } from 'react'

interface TextareaProps {
    description: string,
    setDescription: (value: string) => void
}

const TextareaSet:FC<TextareaProps> = ({description, setDescription}) => {
  return (
    <textarea
    placeholder="Description"
    value={description}
    onChange={({ target }) => setDescription(target.value)}
    className=" h-20 text-lg font-bold text-primary dark:text-primaryDark resize-none w-full md:w-1/2 rounded bg-gray-400 p-2 focus:outline-none focus:border-b-4 border-b-secondary placeholder:text-gray-200 mb-5"
  />
  )
}

export default TextareaSet
