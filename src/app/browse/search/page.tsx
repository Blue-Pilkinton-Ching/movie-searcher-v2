'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from './search'

export default function Page() {
  const searchParams = useSearchParams()

  const search = searchParams.get('query') as string

  return (
    <main className="w-full relative">
      <Suspense
        fallback={
          <p className="text-2xl font-bold">
            Searching for {decodeURIComponent(search)}...
          </p>
        }
      >
        <Search search={search} />
      </Suspense>
    </main>
  )
}
