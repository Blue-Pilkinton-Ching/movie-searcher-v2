'use client'

import { useState } from 'react'
import { Header } from '../header'
import { MediaList } from '../../../interfaces'
import Image from 'next/image'

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
        <main className="flex min-h-screen flex-wrap justify-between">
          {searchResults.results.map((element, index) => {
            return (
              <div key={index} className="w-[154px] h-[231px] rounded">
                {element.poster_path == null ? (
                  `null`
                ) : (
                  <Image
                    className="w-full h-full rounded shadow-md"
                    src={`https://image.tmdb.org/t/p/w${154}/${
                      element.poster_path
                    }`}
                    alt={`${
                      element.title ? element.title : element.name
                    } poster`}
                    width={154}
                    height={231}
                  ></Image>
                )}
              </div>
            )
          })}
        </main>
      ) : (
        children
      )}
    </div>
  )
}
