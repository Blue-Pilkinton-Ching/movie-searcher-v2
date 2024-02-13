import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query') as string

  const request = new Request(
    `https://api.themoviedb.org/3/search/multi?query=${decodeURIComponent(
      query
    )}&include_adult=${false}&language=en-US&page=${1}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_KEY}`,
      },
    }
  )

  const data = (await fetch(request)).body

  return new Response(data)
}
