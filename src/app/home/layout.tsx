'use client'

import { useState } from 'react'
import { Header } from '../header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState('')
  const [searchText, setSearchText] = useState('')

  function search(search: string) {
    console.log(search)

    setSearchLoading(true)
    setSearchText(search)

    fetch(`/api/search/${search}`).then(async (res) => {
      res.text().then((text) => {
        setSearchResults(text)
        setSearchLoading(false)
      })
    })
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Header search={search} />
        {searchLoading ? (
          <p>Searching for {searchText}...</p>
        ) : searchResults ? (
          searchResults
        ) : (
          children
        )}
      </main>
    </>
  )
}
