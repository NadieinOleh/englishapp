import React, {FC} from 'react'

interface AddBtnSetProps {
    addFlashCard: () => void
}

const AddBtnSet:FC<AddBtnSetProps> = ({addFlashCard}) => {
  return (
    <div className="h-fit mb-5 w-full flex-col rounded bg-gray-400 flex justify-center items-center px-4 py-6">
    <button
      onClick={addFlashCard}
      className="flex justify-center items-center gap-1 border-b-4 border-b-primary text-md font-semibold text-primary hover:border-b-secondary hover:text-secondary"
    >
      <span className="font-bold text-lg">+</span>
      <span className="font-bold ">ADD CARD</span>
    </button>
  </div>
  )
}

export default AddBtnSet
