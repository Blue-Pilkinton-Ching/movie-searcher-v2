'use client'

import TMDBAuthHeader from '@/utils/server/tmdb-header'
import {
  Episode as EpisodeType,
  FilledSeason,
  SeasonHistory,
} from '../../interfaces'
import { useEffect, useState } from 'react'
import Episode from './episode'

export default function Episodes({
  season,
  id,
  selectEpisode,
  history,
}: {
  history: SeasonHistory | undefined
  season: number
  id: number
  selectEpisode: (episode: number) => void
}) {
  const [episodes, setEpisodes] = useState<EpisodeType[]>()
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1)

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

  console.log(selectedEpisode)

  return (
    <div>
      {episodes?.map((episode) => (
        <Episode
          selected={episode.episode_number === selectedEpisode}
          watched={
            history?.episodes.find((x) => x === episode.episode_number) !=
            undefined
          }
          key={episode.episode_number}
          episode={episode}
          selectEpisode={() => {
            setSelectedEpisode(episode.episode_number)
            return selectEpisode
          }}
        />
      ))}
    </div>
  )
}
