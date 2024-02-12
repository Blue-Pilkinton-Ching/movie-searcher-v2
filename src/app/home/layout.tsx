'use client'

import { useState } from 'react'
import { Header } from '../header'
import { Media, MediaList } from '../../../interfaces'
import { Card } from './card'
import { useWindowSize } from '@uidotdev/usehooks'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<undefined | MediaList>()
  const [searchText, setSearchText] = useState('')
  const [hideCards, setHideCards] = useState(false)

  const { width } = useWindowSize()

  function search(search: string) {
    setSearchLoading(true)
    setSearchText(search)

    fetch(`/api/search/${search}`).then(async (res) => {
      res.text().then((text) => {
        let media = JSON.parse(text) as MediaList

        media.results = media.results.filter((x) => x.media_type != 'person')

        setSearchResults(media)
        setSearchLoading(false)
      })
    })
  }

  function onCardSelected(data: Media) {
    setHideCards(true)
  }

  return (
    <div className="px-[5%]">
      <Header search={search} />
      <div className="flex">
        <div className="w-full lg:w-[700]"></div>
        <div
          className={hideCards && width && width < 1024 ? 'hidden' : 'block'}
        >
          {searchLoading ? (
            <p className="text-2xl font-bold">Searching for {searchText}...</p>
          ) : searchResults ? (
            searchResults.results.length > 0 ? (
              <>
                <br />
                <main className="flex flex-wrap gap-5 sm:gap-8 justify-evenly ">
                  {searchResults.results.map((element, index) => {
                    return (
                      <Card
                        key={index}
                        data={element}
                        onSelect={onCardSelected}
                      />
                    )
                  })}
                </main>
              </>
            ) : (
              <p className="text-2xl font-bold">
                Couldn&apos;t find anything :(
              </p>
            )
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}
