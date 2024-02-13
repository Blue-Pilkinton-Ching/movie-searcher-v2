'use client'

import { Suspense } from 'react'
import { Search } from './search'

export default function Page({ params }: { params: { search: string } }) {
  return (
    <main className="w-full relative">
      <Suspense
        fallback={
          <p className="text-2xl font-bold">
            Searching for {decodeURIComponent(params.search)}...
          </p>
        }
      >
        <Search search={params.search} />
      </Suspense>
    </main>
  )
}
{
  /* <p className="text-2xl font-bold">Couldn&apos;t find anything :(</p> */
}
