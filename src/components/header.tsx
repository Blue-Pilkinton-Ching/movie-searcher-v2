'use client'

import SearchBar from '@/components/searchbar'
import Link from 'next/link'

interface HeaderProps {
  search: (search: string) => void
}

export function Header(props: HeaderProps) {
  function onChange(value: string) {
    props.search(value)
  }

  return (
    <header className="px-[5%] w-full h-fit min-h-24 flex items-center lg:justify-between flex-col *:h-full *:flex *:items-center sm:flex-row py-5">
      <div>
        <Link href={'/browse'} className="hover:brightness-75 duration-200">
          <div className="text-3xl py-5">Watchalot</div>
        </Link>
      </div>
      <div className="w-full px-[5%]">
        <SearchBar onValueChange={onChange} />
      </div>
    </header>
  )
}
