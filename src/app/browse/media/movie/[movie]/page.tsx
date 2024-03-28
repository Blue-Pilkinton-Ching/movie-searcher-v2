import Media from '@/components/media'
import TMDBAuthHeader from '@/utils/server/tmdb-header'
import { MovieDetails } from '../../../../../../interfaces'

export default async function Page({ params }: { params: { movie: number } }) {
  let media
  try {
    media = (await JSON.parse(
      await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${
            params.movie
          }&include_adult=${false}&language=en-US&page=${1}`,
          { ...TMDBAuthHeader() }
        )
      ).text()
    )) as MovieDetails
  } catch (error) {
    console.error(error)
    return <p className="text-2xl font-bold">Something went wrong :(</p>
  }

  return <Media id={params.movie} type="movie" details={media} />
}
