'use client'

import { Header } from '@/components/header'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './../../utils/client/firebase'

export default function HeaderWrapper() {
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

  return <Header search={search} />
}
