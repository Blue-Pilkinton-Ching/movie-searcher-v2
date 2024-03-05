'use client'

import { useState } from 'react'
import { GlobalStateContext } from './globalState'
import { GlobalState } from '../../interfaces'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [globalState, setGlobalState] = useState<GlobalState>({})

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  )
}
