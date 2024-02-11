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

  function search(search: string) {
    setSearchLoading(true)

    fetch(`/api/search/${search}`).then(async (res) => {
      res.text().then((text) => {
        setSearchResults(text)
        setSearchLoading(false)
      })
    })
  }

  return (
    <>
      <Header search={search} />
      {searchLoading ? <p>Loading...</p> : searchResults ? searchResults : ''}
    </>
  )
}
