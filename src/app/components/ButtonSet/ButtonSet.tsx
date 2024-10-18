import React, { FC } from 'react'

interface ButtonSetProps {
    isDisabled: boolean,
    createOrEdit: () => void,
    value: string,
    style: boolean,
}

const ButtonSet:FC<ButtonSetProps> = ({createOrEdit, isDisabled, value, style}) => {
  return (
    <input
          type="button"
          disabled={isDisabled}
          value={value}
          onClick={createOrEdit}
          className={`${style ? 'p-2' : 'p-2 px-10'}  rounded border-2 font-bold  
    ${
      !isDisabled
        ? "animate__animated animate__jello animate__infinite animate__slower cursor-pointer"
        : ""
    } 
    ${
      isDisabled
        ? "border-mainText/45 text-secondary/45 bg-gray-600"
        : "bg-secondary text-primary"
    }
  `} />
  )
}

export default ButtonSet
