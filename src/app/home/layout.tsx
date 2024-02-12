'use client'

import { useState } from 'react'
import { Header } from '../header'
import { MediaList } from '../../../interfaces'
import Image from 'next/image'
import { Card } from './card'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<undefined | MediaList>()
  const [searchText, setSearchText] = useState('')

  function search(search: string) {
    setSearchLoading(true)
    setSearchText(search)

    fetch(`/api/search/${search}`).then(async (res) => {
      res.text().then((text) => {
        setSearchResults(JSON.parse(text))
        setSearchLoading(false)
      })
    })
  }

  return (
    <div className="px-[5%]">
      <Header search={search} />
      {searchLoading ? (
        <p className="text-4xl">Searching for {searchText}...</p>
      ) : searchResults ? (
        <main className="flex flex-wrap gap-5 justify-evenly ">
          {searchResults.results.map((element, index) => {
            return <Card key={index} data={element} />
          })}
        </main>
      ) : (
        children
      )}
    </div>
  )
}
