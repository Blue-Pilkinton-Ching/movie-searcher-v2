import TMDBAuthHeader from '@/utils/server/tmdb-header'
import { MediaSearch } from '../../../interfaces'
import { Card } from './card'
import ContentRow from './content-row'

export default async function Content() {
  let movies: MediaSearch | undefined
  let tv: MediaSearch | undefined

  async function trendingMovies() {
    try {
      movies = await (
        await fetch(
          'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
          {
            ...TMDBAuthHeader(),
          }
        )
      ).json()
    } catch (error) {
      console.error(error)
    }
  }
  async function trendingTV() {
    try {
      tv = await (
        await fetch(
          'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
          {
            ...TMDBAuthHeader(),
          }
        )
      ).json()
    } catch (error) {
      console.error(error)
    }
  }

  await Promise.all([trendingMovies(), trendingTV()])

  return (
    <>
      {movies ? (
        <ContentRow
          name={'Trending Movies'}
          cards={movies.results.map((movie, index) => (
            <Card key={index} data={movie} />
          ))}
        />
      ) : null}
      {tv ? (
        <ContentRow
          name={'Trending TV Shows'}
          cards={tv.results.map((tvShow, index) => (
            <Card key={index} data={tvShow} />
          ))}
        />
      ) : null}
    </>
  )
}
