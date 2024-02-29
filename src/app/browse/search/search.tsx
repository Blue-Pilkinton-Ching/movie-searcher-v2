'use client'

import { MediaSearch } from '../../../../interfaces'
import { Card } from '../card'

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
