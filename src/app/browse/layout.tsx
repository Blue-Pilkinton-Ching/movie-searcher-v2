'use client'

import { useState } from 'react'
import { Header } from '../header'
import { useRouter } from 'next/navigation'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'

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
      <BackgroundGradientAnimation
        size="15%"
        interactive={false}
        fifthColor="60, 18, 81"
      >
        <div className="z-50 absolute inset-0">
          <div className="px-[5%]">
            <Header search={search} />
            {children}
          </div>
        </div>
      </BackgroundGradientAnimation>
    </>
  )
}
