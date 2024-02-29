'use client'

import React from 'react'
import { WavyBackground } from '@/components/ui/wavy-background'

export default function WavyBackgroundDemo() {
  return (
    <WavyBackground
      className="max-w-4xl mx-auto pb-40"
      blur={10}
      colors={['#3c1251', '#a568c4', '#686ac4', '#b83d50']}
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold inter-var text-center">
        Watch alot
      </h1>
      <h2 className="md:text-lg mt-4 text-white font-normal inter-var text-center">
        All your movie needs in one place
      </h2>
    </WavyBackground>
  )
}
