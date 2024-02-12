'use client'

import { ChangeEvent, useState } from 'react'

interface HeaderProps {
  search: (search: string) => void
}

export function Header(props: HeaderProps) {
  const [searchValue, setSearchValue] = useState('')

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setSearchValue(event.currentTarget.value)

    if (event.currentTarget.value.trim()) {
      props.search(event.currentTarget.value)
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <header className="w-full h-fit min-h-24 flex items-center lg:justify-between flex-col *:h-full *:flex *:items-center lg:flex-row py-5">
      <div>
        <div className="text-3xl py-5">Watchalot</div>
      </div>
      <div className="w-full px-[5%]">
        <textarea
          value={searchValue}
          onKeyDown={onKeyDown}
          onChange={onChange}
          className="flex-grow bg-neutral-700/40 h-10 resize-none focus:outline-none rounded line py-1.5 overflow-hidden px-5 text-lg"
          name="search"
          cols={1}
          rows={1}
          placeholder="Search for movies or TV shows..."
        ></textarea>
      </div>
    </header>
  )
}
