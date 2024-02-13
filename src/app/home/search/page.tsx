'use client'

import { Suspense } from 'react'
import { MediaSearch } from '../../../../interfaces'
import { Card } from '../card'
import { useSearchParams } from 'next/navigation'

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
{
}

export async function Search({ search }: { search: string }) {
  let media
  try {
    media = (await JSON.parse(
      await (
        await fetch(`/api/search?query=${encodeURIComponent(search)}`)
      ).text()
    )) as MediaSearch
  } catch (error) {
    return <p className="text-2xl font-bold">Something went wrong :(</p>
  }

  media.results = media.results.filter((x) => x.media_type != 'person')

  if (media.results.length < 1) {
    return <p className="text-2xl font-bold">Couldn&apos;t find anything :(</p>
  }

  return (
    <>
      <br />
      <div className="flex flex-wrap gap-5 sm:gap-8 justify-evenly ">
        {media.results.map((element, index) => {
          return <Card key={index} data={element} />
        })}
      </div>
    </>
  )
}
