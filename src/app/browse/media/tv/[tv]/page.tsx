import Media from '@/components/media'
import TMDBAuthHeader from '@/utils/server/tmdb-header'
import { MediaSearch, TVDetails } from '../../../../../../interfaces'

export default async function Page({ params }: { params: { tv: number } }) {
  let media
  try {
    media = (await JSON.parse(
      await (
        await fetch(
          `https://api.themoviedb.org/3/tv/${
            params.tv
          }&include_adult=${false}&language=en-US&page=${1}`,
          { ...TMDBAuthHeader(), cache: 'no-store' }
        )
      ).text()
    )) as TVDetails
  } catch (error) {
    console.error(error)
    return <p className="text-2xl font-bold">Something went wrong :(</p>
  }

  return <Media id={params.tv} type="tv" details={media} />
}
