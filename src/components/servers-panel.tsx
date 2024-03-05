'use client'

import Panel from './panel'
import Seasons from './seasons'
import ServerButton from './server-button'
import { MouseEvent, useState } from 'react'

export default function ServersPanel({
  className,
  server,
  fetchServer,
  type,
  seasons,
  selectEpisode,
  id,
}: {
  className?: string
  server: string
  fetchServer: (event: MouseEvent<HTMLButtonElement>, server: string) => void
  type: 'movie' | 'tv'
  id: number
  seasons?: number
  selectEpisode?: (season: number, episode: number) => void
}) {
  const [displayTV, setDisplayTV] = useState(false)

  return (
    <>
      <Panel className={`${className} lg:h-full xl:p-[3vw]`}>
        {type === 'tv' ? (
          <div className="flex flex-row justify-evenly gap-[20%] items-center text-lg font-semibold mb-8">
            <button onClick={() => setDisplayTV(true)}>TV Episodes</button>
            <button onClick={() => setDisplayTV(false)}>Servers</button>
          </div>
        ) : null}
        <div className="max-h-[calc(100%-80px)] overflow-y-auto">
          <div className={`${displayTV ? 'hidden' : 'block'} `}>
            <h1 className="text-3xl font-bold py-2.5 wrap">Servers</h1>
            <p className="text-sm font-semibold text-neutral-500">
              If one of the servers is not working try another.
            </p>
            <br />
            <div className="flex gap-3 flex-col items-center flex-wrap">
              <ServerButton
                selected={server === 'Vidsrc.to'}
                text={'Vidsrc.to'}
                onClick={(event) => fetchServer(event, 'Vidsrc.to')}
              />
              <ServerButton
                selected={server === 'Vidsrc.xyz'}
                text={'Vidsrc.xyz'}
                onClick={(event) => fetchServer(event, 'Vidsrc.xyz')}
              />
              <ServerButton
                selected={server === '2embed'}
                text={'2embed'}
                onClick={(event) => fetchServer(event, '2embed')}
              />
              <ServerButton
                selected={server === 'Free'}
                text={'Ad-Free'}
                onClick={(event) => fetchServer(event, 'Free')}
              />
            </div>
            <br />
            <p className="text-sm font-semibold text-neutral-500">
              *Note* Ad-Free will attempt to block ads on videos, but will often
              not work. We recommend installing{' '}
              <a
                className="text-mainpurple hover:underline"
                href="https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"
              >
                uBlock Origin{' '}
              </a>
              and using a different server.
            </p>
          </div>
          <div className={displayTV ? 'block' : 'hidden'}>
            <Seasons
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
