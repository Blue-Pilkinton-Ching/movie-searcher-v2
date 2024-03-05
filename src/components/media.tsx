'use client'

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import ServerPanel from '@/components/servers-panel'

import { Media, MovieDetails, TVDetails } from '@/../interfaces'
import SeasonsPanel from './seasons-panel'

type Server = 'Free' | '2embed' | 'Vidsrc.to' | 'Vidsrc.xyz'

export default function Media({
  type,
  id,
  details,
}: {
  id: number
  type: 'movie' | 'tv'
  details: TVDetails | MovieDetails
}) {
  const params = useSearchParams()
  const [server, setServer] = useState<Server | null>(null)

  const [season, setSeason] = useState(1)
  const [episode, setEpisodeNumber] = useState(1)

  const router = useRouter()

  useEffect(() => {
    setServer(
      (params.get('server') as Server | undefined) ||
        (type === 'movie' ? 'Free' : 'Vidsrc.to')
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get])

  function fetchServer(event: MouseEvent<HTMLButtonElement>, server: string) {
    event.preventDefault()
    router.push(`/browse/media/${type}/${id}?server=${server}`)
  }

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row lg:h-[calc(100vh-116px-20px)] justify-between py-8">
        <div className="h-full lg:max-w-[70%] aspect-video *:flex-grow *:w-full *:h-full *:hover:cursor-pointer *:shadow-2xl *:rounded-2xl">
          {server === 'Free' ? (
            <iframe
              src={
                type === 'movie'
                  ? `https://www.2embed.cc/embed/${id}`
                  : `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`
              }
              allowFullScreen
              sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-presentation"
              frameBorder={0}
              scrolling="no"
            ></iframe>
          ) : null}
          {server === '2embed' ? (
            <iframe
              src={
                type === 'movie'
                  ? `https://www.2embed.cc/embed/${id}`
                  : `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`
              }
              allowFullScreen
              frameBorder={0}
              scrolling="no"
            ></iframe>
          ) : null}
          {server === 'Vidsrc.xyz' ? (
            <iframe
              src={
                type === 'movie'
                  ? `https://vidsrc.xyz/embed/${id}`
                  : `https://vidsrc.xyz/embed/tv/${id}/${season}-${episode}`
              }
              allowFullScreen
              frameBorder={0}
              scrolling="no"
            ></iframe>
          ) : null}
          {server === 'Vidsrc.to' ? (
            <iframe
              src={
                type === 'movie'
                  ? `https://vidsrc.to/embed/${type}/${id}`
                  : `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`
              }
              allowFullScreen
              frameBorder={0}
              scrolling="no"
            ></iframe>
          ) : null}
        </div>
        <ServerPanel
          className="lg:block hidden"
          fetchServer={fetchServer}
          server={server as Server}
        />

        <div className="flex lg:hidden gap-5 flex-col md:flex-row mb-5">
          <ServerPanel fetchServer={fetchServer} server={server as Server} />
          <SeasonsPanel
            type={type}
            value={season}
            onChange={(event) => setSeason(event.target.value)}
            seasons={
              type === 'tv' ? (details as TVDetails).seasons.length : undefined
            }
          />
        </div>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-full"></div>
        <SeasonsPanel
          className="lg:block hidden"
          type={type}
          value={season}
          onChange={(event) => {
            setSeason(event.target.value)
          }}
          seasons={
            type === 'tv' ? (details as TVDetails).seasons.length : undefined
          }
        />
      </div>
    </>
  )
}
