'use client'

import TMDBAuthHeader from '@/utils/server/tmdb-header'
import { Episode as EpisodeType, FilledSeason } from '../../interfaces'
import { useEffect, useState } from 'react'
import Episode from './episode'

export default function Episodes({
  season,
  id,
  selectEpisode,
}: {
  season: number
  id: number
  selectEpisode: (episode: number) => void
}) {
  const [episodes, setEpisodes] = useState<EpisodeType[]>()

  useEffect(() => {
    async function fetchSeason() {
      setEpisodes(undefined)

      let filledSeason
      try {
        filledSeason = (await JSON.parse(
          await (
            await fetch(`/api/tv/${id}/episodes?season=${season}`, {
              ...TMDBAuthHeader(),
            })
          ).text()
        )) as FilledSeason

        setEpisodes(filledSeason.episodes)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSeason()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season, id])

  if (episodes === undefined) {
    return <p className="text-neutral-500 font-medium">Loading Episodes...</p>
  }

  if (episodes?.length === 0) {
    return (
      <p className="text-neutral-500 font-medium">
        Couldn&apos;t find any Episodes!
      </p>
    )
  }

  return (
    <div>
      {episodes?.map((episode) => (
        <Episode
          key={episode.episode_number}
          episode={episode}
          selectEpisode={selectEpisode}
        />
      ))}
    </div>
  )
}
