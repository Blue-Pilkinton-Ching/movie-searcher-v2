import { MediaSearch } from '../../../../../interfaces'
import { Card } from '../../card'

export async function Search({ search }: { search: string }) {
  const media = (await JSON.parse(
    await (await fetch(`/api/search/${search}`)).text()
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
