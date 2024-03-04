import { Suspense } from 'react'
import { MediaSearch } from '../../../../interfaces'
import { Card } from '../card'
import TMDBAuthHeader from '@/utils/server/tmdb-header'

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

export async function Search({ query }: { query: string }) {
  let media

  try {
    media = (await JSON.parse(
      await (
        await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${decodeURIComponent(
            query
          )}&include_adult=${false}&language=en-US&page=${1}`,
          { ...TMDBAuthHeader(), cache: 'no-store' }
        )
      ).text()
    )) as MediaSearch
  } catch (error) {
    console.error(error)
    return <p className="text-2xl font-bold">Something went wrong :(</p>
  }

  if (media.results.length < 1) {
    return <p className="text-2xl font-bold">{`Couldn't find ${query} :(`}</p>
  }

  return (
    <div className="flex flex-wrap gap-5 sm:gap-8 justify-evenly ">
      {media.results.map((element, index) => {
        return <Card key={index} data={element} />
      })}
    </div>
  )
}
