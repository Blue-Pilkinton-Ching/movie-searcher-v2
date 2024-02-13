'use client'

import { useGlobalState } from '@/app/globalState'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { globalState } = useGlobalState()

  return (
    <>
      {globalState.currentMedia?.id}
      {children}
    </>
  )
}
