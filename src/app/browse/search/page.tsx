import { Suspense } from 'react'
import { MediaSearch } from '../../../../interfaces'
import { Card } from '../card'
import TMDBAuthHeader from '@/utils/server/tmdb-header'
import { Search } from './search'

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string }
}) {
  return (
    <main className="w-full relative">
      <br />
      <Suspense
        fallback={
          <p className="text-2xl font-bold">
            Searching for {decodeURIComponent(searchParams.query)}...
          </p>
        }
      >
        <Search query={decodeURIComponent(searchParams.query)} />
      </Suspense>
    </main>
  )
}
