'use client'

import { MouseEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import SeversSeasons from '@/components/servers-seasons'

import { Media, MovieDetails, TVDetails } from '@/../interfaces'
import Seasons from './seasons'
import Panel from './panel'
import Servers from './servers'

import '@/utils/client/firebase'

import * as fs from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

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

  const [user] = useAuthState(getAuth())

  const router = useRouter()

  useEffect(() => {
    setServer((params.get('server') as Server | undefined) || 'Vidsrc.to')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get])

  useEffect(() => {
    if (user) {
      try {
        fs.setDoc(
          fs.doc(
            fs.collection(
              fs.getFirestore(),
              `recent-${type === 'movie' ? 'movies' : 'tv'}`
            ),
            user.uid
          ),
          {
            [id]: {
              ...details,
              type: type,
              media_type: type,
              time_watched: Date.now(),
            },
          },
          { merge: true }
        )
      } catch (error) {
        console.log(error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function fetchServer(event: MouseEvent<HTMLButtonElement>, server: string) {
    event.preventDefault()
    router.push(`/browse/media/${type}/${id}?server=${server}`)
  }

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row lg:h-[calc(100vh-116px-20px)] justify-between py-8">
        <div className="h-full lg:max-w-[70%] aspect-video *:flex-grow *:w-full *:h-full *:hover:cursor-pointer *:shadow-2xl *:rounded-2xl">
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
        </div>
        {type === 'tv' ? (
          <SeversSeasons
            type={type}
            className="lg:block block md:hidden"
            fetchServer={fetchServer}
            server={server as Server}
            seasons={
              type === 'tv' ? (details as TVDetails).seasons.length : undefined
            }
            selectEpisode={
              type === 'tv'
                ? (season, episode) => {
                    setEpisodeNumber(episode)
                    setSeason(season)
                  }
                : undefined
            }
            id={id}
          />
        ) : (
          <Panel className="lg:block block md:hidden">
            <Servers fetchServer={fetchServer} server={server as Server} />
          </Panel>
        )}

        <div className="lg:hidden gap-5 hidden md:flex flex-row mb-5">
          <Panel>
            <Servers fetchServer={fetchServer} server={server as Server} />
          </Panel>
          {type === 'tv' ? (
            <Panel>
              <Seasons
                className={`max-h-[600px] overflow-auto`}
                id={id}
                selectEpisode={(season, episode) => {
                  setEpisodeNumber(episode)
                  setSeason(season)
                }}
                seasons={(details as TVDetails).seasons.length}
              />
            </Panel>
          ) : null}
        </div>
      </div>
    </>
  )
}
