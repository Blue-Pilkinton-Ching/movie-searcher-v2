import React, { Suspense } from 'react'
import Content from './content'

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}
