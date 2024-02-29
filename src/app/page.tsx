'use client'

import React from 'react'
import { WavyBackground } from '@/components/ui/wavy-background'
import SearchBar from '@/components/searchbar'
import { useRouter } from 'next/navigation'

export default function WavyBackgroundDemo() {
  const router = useRouter()

  return (
    <WavyBackground
      speed="slow"
      waveWidth={50}
      className="mx-auto pb-16"
      blur={10}
      colors={['#3c1251', '#a568c4', '#5957ba', '#b83d50']}
    >
      <h1 className="text-4xl md:text-6xl lg:text-8xl text-white font-bold inter-var text-center">
        Watch alot
      </h1>
      <h2 className="md:text-xl lg:text-2xl text-base mt-4 text-white font-normal inter-var text-center">
        All your movie needs in one place
      </h2>
      <br />
      <br />
      <div className="w-full">
        <SearchBar
          backgroundColor="bg-neutral-900/70"
          onEnterKey={(value) =>
            router.push(`/browse/search?query=${encodeURIComponent(value)}`)
          }
        />
      </div>
    </WavyBackground>
  )
}
