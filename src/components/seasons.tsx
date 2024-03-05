'use client'

import { ChangeEvent, useState } from 'react'
import Episodes from './episodes'

export default function Seasons({
  selectEpisode,
  seasons,
  id,
  className,
}: {
  className?: string
  selectEpisode: (season: number, episode: number) => void
  seasons: number
  id: number
}) {
  const [season, setSeason] = useState(1)

  function onSeasonChange(event: ChangeEvent<HTMLSelectElement>) {
    setSeason(Number(event.target.value))
  }

  return (
    <>
      <div className={`max-w-[400px] mx-auto ${className}`}>
        <select
          value={season}
          onChange={onSeasonChange}
          className="mb-6 w-[90%] font-semibold cursor-pointer rounded-full border h-8 outline-none border-neutral-500 bg-neutral-900 text-neutral-500 text-center "
        >
          {Array.from({ length: seasons || 0 }, (_, i) => (
            <option className="font-semibold " key={i} value={i + 1}>
              Season {i + 1}
            </option>
          ))}
        </select>
        <Episodes
          season={season}
          id={id}
          selectEpisode={(episode) => {
            selectEpisode(season, episode)
          }}
        />
      </div>
    </>
  )
}
