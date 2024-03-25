import TMDBAuthHeader from '@/utils/server/tmdb-header'

export default async function Content() {
  async function trendingMovies() {
    await fetch(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      {
        ...TMDBAuthHeader(),
      }
    )
  }
  async function trendingTV() {
    await fetch('https://api.themoviedb.org/3/trending/tv?language=en-US', {
      ...TMDBAuthHeader(),
    })
  }

  return (
    <>
      <div></div>
    </>
  )
}
