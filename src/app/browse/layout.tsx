'use client'

import { useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { useRouter } from 'next/navigation'
import { initializeApp } from 'firebase/app'

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

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDleFcM-7ohh4diMcVIz7sxb8EUlsjGLLE',
      authDomain: 'watchalot-27b1c.firebaseapp.com',
      projectId: 'watchalot-27b1c',
      storageBucket: 'watchalot-27b1c.appspot.com',
      messagingSenderId: '1059512127171',
      appId: '1:1059512127171:web:7f759589859065fba21c76',
    }
    initializeApp(firebaseConfig)
  }, [])

  return (
    <>
      <div className="px-[5%] overflow-auto max-h-dvh">
        <Header search={search} />
        {children}
      </div>
    </>
  )
}
