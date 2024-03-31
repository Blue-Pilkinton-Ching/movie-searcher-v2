'use client'

import Panel from './panel'
import Seasons from './seasons'
import { MouseEvent, useEffect, useState } from 'react'
import Servers from './servers'
import { TVHistory } from '../../interfaces'

export default function ServersSeasons({
  className,
  server,
  fetchServer,
  type,
  seasons,
  selectEpisode,
  history,
  id,
}: {
  className?: string
  server: string
  fetchServer: (event: MouseEvent<HTMLButtonElement>, server: string) => void
  type: 'movie' | 'tv'
  id: number
  seasons?: number
  history: TVHistory | undefined
  selectEpisode?: (season: number, episode: number) => void
}) {
  useEffect(() => {
    if (type === 'tv') {
      setDisplayTV(true)
    }
  }, [type])

  const [displayTV, setDisplayTV] = useState(false)

  return (
    <>
      <Panel className={`${className} lg:h-full xl:p-[3vw]`}>
        {type === 'tv' ? (
          <div className="flex flex-row justify-evenly md:justify-between xl:justify-evenly items-center text-lg font-semibold mb-8 *:rounded-xl *:px-5 *:py-1.5 hover:*:scale-105 *:duration-200 hover:*:brightness-90">
            <button
              onClick={() => setDisplayTV(true)}
              className={displayTV ? 'bg-mainpurple shadow-md' : ''}
            >
              Episodes
            </button>
            <button
              onClick={() => setDisplayTV(false)}
              className={displayTV ? '' : 'bg-mainpurple shadow-md'}
            >
              Servers
            </button>
          </div>
        ) : null}
        <div className="max-height overflow-y-auto scrollbar">
          <div className={displayTV ? 'hidden' : 'block'}>
            <Servers fetchServer={fetchServer} server={server} />
          </div>
          <div className={displayTV ? 'block' : 'hidden'}>
            <Seasons
              history={history}
              selectEpisode={
                selectEpisode as (season: number, episode: number) => void
              }
              id={id}
              seasons={seasons as number}
            />
          </div>
        </div>
      </Panel>
    </>
  )
}
