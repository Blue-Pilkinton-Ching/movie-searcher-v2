'use client'

import { MouseEvent } from 'react'

export default function ServerButton({
  selected,
  text,
  onClick,
}: {
  selected: boolean
  text: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <>
      <button
        onClick={onClick}
        className={`${
          selected ? 'bg-mainpurple' : 'bg-black'
        } px-8 min-w-40 h-10 shadow-md hover:brightness-90 hover:scale-105 scale-100 rounded-full duration-200`}
      >
        <p className="font-semibold text-lg">{text}</p>
      </button>
    </>
  )
}
