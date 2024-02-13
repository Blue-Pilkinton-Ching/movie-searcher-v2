'use client'

import { Suspense } from 'react'
import { MediaSearch } from '../../../../interfaces'
import { Card } from '../card'
import { useSearchParams } from 'next/navigation'

export default function Page({ params }: { params: { search: string } }) {
  const searchParams = useSearchParams()

  const search = searchParams.get('query') as string

  return (
    <main className="w-full relative">
      <Suspense
        fallback={
          <p className="text-2xl font-bold">
            Searching for {decodeURIComponent(params.search)}...
          </p>
        }
      >
        <Search search={search} />
      </Suspense>
    </main>
  )
}
{
  /* <p className="text-2xl font-bold">Couldn&apos;t find anything :(</p> */
}

export async function Search({ search }: { search: string }) {
  const media = (await JSON.parse(
    await (
      await fetch(`/api/search?query=${encodeURIComponent(search)}`)
    ).text()
  )) as MediaSearch

  media.results = media.results.filter((x) => x.media_type != 'person')

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
