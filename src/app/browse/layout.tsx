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
        gradientBackgroundEnd="black"
        gradientBackgroundStart="black"
        size="20%"
        interactive={false}
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
