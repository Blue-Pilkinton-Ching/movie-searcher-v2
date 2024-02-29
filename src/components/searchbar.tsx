'use client'

import { ChangeEvent, useState } from 'react'

export default function SearchBar({
  onValueChange,
  onEnterKey,
}: {
  onValueChange?: (value: string) => void
  onEnterKey?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
}) {
  const [searchValue, setSearchValue] = useState('')

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (onEnterKey) {
        onEnterKey(event)
      }
    }
  }

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setSearchValue(event.currentTarget.value)
    if (onValueChange) {
      onValueChange(event.currentTarget.value)
    }
  }

  return (
    <div className="w-full px-[5%]">
      <textarea
        value={searchValue}
        onKeyDown={onKeyDown}
        onChange={onChange}
        className="w-full bg-neutral-700/40 h-10 resize-none focus:outline-none rounded line py-1.5 overflow-hidden px-5 text-lg"
        name="search"
        cols={1}
        rows={1}
        placeholder="Search for movies or TV shows..."
      ></textarea>
    </div>
  )
}
