import React from 'react'

export default function Items({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-600 w-[90%] sm:max-w-[400px] lex flex-col justify-center items-center -translate-y-[10%]">
      {children}
    </div>
  )
}
