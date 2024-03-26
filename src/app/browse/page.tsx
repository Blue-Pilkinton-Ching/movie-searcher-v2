import React, { Suspense } from 'react'
import Content from './content'

export default function Page() {
  return (
    <Suspense
      fallback={<p className="text-2xl font-bold">Loading content...</p>}
    >
      <Content />
    </Suspense>
  )
}
