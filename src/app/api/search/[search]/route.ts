export async function GET(
  req: Request,
  { params }: { params: { search: string } }
) {
  const request = new Request(
    `https://api.themoviedb.org/3/search/movie?query=${
      params.search
    }&include_adult=${true}&language=en-US&page=${1}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_KEY}`,
      },
    }
  )

  const data = (await fetch(request)).body
  return new Response(data)
}
