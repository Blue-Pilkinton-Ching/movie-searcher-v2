'use client'

import React, { useEffect } from 'react'
import { WavyBackground } from '@/components/ui/wavy-background'
import SearchBar from '@/components/searchbar'
import { useRouter } from 'next/navigation'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import './../utils/client/firebase'

export default function WavyBackgroundDemo() {
  const [user, userLoading] = useAuthState(getAuth())

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/browse')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <WavyBackground
      speed="slow"
      waveWidth={50}
      className="mx-auto pb-16"
      blur={10}
      colors={['#3c1251', '#a568c4', '#5957ba', '#b83d50']}
    >
      {userLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-white font-bold inter-var text-center">
            Watch alot
          </h1>
          <h2 className="md:text-xl lg:text-2xl text-base mt-4 text-white font-normal inter-var text-center">
            All your streaming needs in one place
          </h2>
          <hr className="h-16 border-0" />
          <div className="w-[90vw] sm:w-[500px] flex ">
            <SearchBar
              backgroundColor="bg-neutral-900/70"
              onEnterKey={(value) =>
                router.push(
                  `/browse/${
                    value ? `search?query=${encodeURIComponent(value)}` : ''
                  }`
                )
              }
            />
          </div>
        </>
      )}
    </WavyBackground>
  )
}
