'use client'

import React from 'react'
import { Provider } from '../../../interfaces'

import * as auth from 'firebase/auth'
import '../../utils/client/firebase'
import { useRouter } from 'next/navigation'

export default function SignInButton({
  provider,
  icon,
  textClassName,
  className,
  text,
}: {
  provider: Provider
  icon: React.ReactNode
  textClassName?: string
  className?: string
  text: string
}) {
  const router = useRouter()

  async function onButtonClick() {
    let action
    switch (provider) {
      case 'google':
        action = auth.signInWithPopup(
          auth.getAuth(),
          new auth.GoogleAuthProvider()
        )
        break
      case 'sign out':
        action = auth.signOut(auth.getAuth())
        break

      default:
        break
    }

    if (action) {
      try {
        await action
      } catch (error) {
        alert(
          `An error occurred while ${
            provider === 'google' ? 'signing in' : 'signing out'
          }`
        )
        console.error(error)
        return
      }

      router.push('/browse')
    }
  }

  return (
    <button
      onClick={onButtonClick}
      className={`border-2 shadow-md w-[90vw] max-w-[350px] h-10 items-center active:scale-95 rounded-xl px-5 py-1 hover:brightness-75 duration-200 flex ${className} `}
      //   href={''}
    >
      {icon}
      <div className={`${textClassName} w-full text-lg font-semibold`}>
        {text}
      </div>
    </button>
  )
}
