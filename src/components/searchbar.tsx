'use client'

import Link from 'next/link'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'

export default function SearchBar({
  onValueChange,
  onEnterKey,
  backgroundColor,
  placeholder,
}: {
  onValueChange?: (value: string) => void
  onEnterKey?: (value: string) => void
  backgroundColor?: string
  placeholder?: string
}) {
  const [searchValue, setSearchValue] = useState('')
  const searchRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [searchRef])

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (onEnterKey) {
        onEnterKey(event.currentTarget.value)
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
    <div className="w-full px-[5%] flex items-center gap-3">
      <textarea
        ref={searchRef}
        value={searchValue}
        onKeyDown={onKeyDown}
        onChange={onChange}
        className={`w-full ${
          backgroundColor ? backgroundColor : 'bg-neutral-700/30'
        } h-10 resize-none focus:outline-none rounded line py-1.5 overflow-hidden px-5 text-lg shadow-lg`}
        name="search"
        cols={1}
        rows={1}
        placeholder={
          placeholder ? placeholder : 'Search for movies or TV shows...'
        }
      ></textarea>
      <Link
        className="rounded-md aspect-square bg-neutral-900/70 h-10 hover:scale-105 active:scale-95 shadow-lg"
        href={'/account'}
      >
        <FaRegUser color="#6b7280" size={'100%'} className="p-2" />
      </Link>
    </div>
  )
}
