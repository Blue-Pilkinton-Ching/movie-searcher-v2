'use client'

import { useState } from 'react'
import { Header } from '../header'
import { Media, MediaList } from '../../../interfaces'
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
    const trim = search.trim()

    if (trim) {
      if (trim !== searchText) {
        setSearchLoading(true)
        setSearchText(search)

        fetch(`/api/search/${search}`).then(async (res) => {
          res.text().then((text) => {
            let media = JSON.parse(text) as MediaList

            media.results = media.results.filter(
              (x) => x.media_type != 'person'
            )

            setSearchResults(media)
            setSearchLoading(false)
          })
        })
      }
    } else {
      setSearchLoading(false)
      setSearchText('')
    }
  }

  return (
    <>
      <Header search={search} />
      <main className="w-full relative">
        {searchLoading ? (
          <p className="text-2xl font-bold">Searching for {searchText}...</p>
        ) : searchResults && searchText ? (
          searchResults.results.length > 0 ? (
            <>
              <br />
              <div className="flex flex-wrap gap-5 sm:gap-8 justify-evenly ">
                {searchResults.results.map((element, index) => {
                  return <Card key={index} data={element} />
                })}
              </div>
            </>
          ) : (
            <p className="text-2xl font-bold">Couldn&apos;t find anything :(</p>
          )
        ) : (
          children
        )}
      </main>
    </>
  )
}
