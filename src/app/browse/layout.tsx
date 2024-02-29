'use client'

import { useState } from 'react'
import { Header } from '../header'
import { useRouter } from 'next/navigation'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [searchText, setSearchText] = useState('')

  const router = useRouter()

  function search(search: string) {
    const trim = search.trim()

    if (trim) {
      if (search !== searchText) {
        router.push(`/browse/search?query=${encodeURIComponent(search)}`)
      }
    } else {
      router.push(`/browse`)
    }
    setSearchText(trim)
  }

  return (
    <>
      <Header search={search} />
      {children}
    </>
  )
}