import { createContext, useContext } from 'react'
import { GlobalStateWrapper } from '../../interfaces'

export function useGlobalState() {
  const context = useContext(GlobalStateContext)

  if (context == undefined) {
    throw 'Global Context is null or undefined'
  }

  return context
}

// @ts-ignore
export const GlobalStateContext = createContext<GlobalStateWrapper>({})
