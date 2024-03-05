import TMDBAuthHeader from '@/utils/server/tmdb-header'
import { FilledSeason } from '../../../../../../interfaces'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string }
  }
) {
  const id = params.id
  const season = req.nextUrl.searchParams.get('season')

  let filledSeason
  try {
    filledSeason = (await JSON.parse(
      await (
        await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season}`, {
          ...TMDBAuthHeader(),
        })
      ).text()
    )) as FilledSeason
  } catch (error) {
    console.error(error)
    return new NextResponse('', { status: 500 })
  }

  return new NextResponse(JSON.stringify(filledSeason))
}
