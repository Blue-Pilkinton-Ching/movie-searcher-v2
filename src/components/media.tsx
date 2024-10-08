'use client'

import { MouseEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import SeversSeasons from '@/components/servers-seasons'

import { MovieDetails, TVDetails, TVHistory } from '@/../interfaces'
import Seasons from './seasons'
import Panel from './panel'
import Servers from './servers'

import '@/utils/client/firebase'

import * as fs from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { title } from 'process'

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

  const [historyUndefined, setHistoryUndefined] = useState(false)

  const [history, setHistory] = useState<TVHistory>()

  const [user] = useAuthState(getAuth())

  const router = useRouter()

  useEffect(() => {
    setServer((params.get('server') as Server | undefined) || 'Vidsrc.to')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get])

  useEffect(() => {
    if (user) {
      Promise.allSettled([
        (async () => {
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
                  ...(type === 'movie' && {
                    title: (details as MovieDetails).title,
                    id: (details as MovieDetails).id,
                    poster_path: (details as MovieDetails).poster_path,
                    release_date: (details as MovieDetails).release_date,
                  }),
                  ...(type === 'tv' && {
                    name: (details as TVDetails).name,
                    id: (details as TVDetails).id,
                    poster_path: (details as TVDetails).poster_path,
                    first_air_date: (details as TVDetails).first_air_date,
                  }),
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
        })(),
        (async () => {
          try {
            if (type === 'tv') {
              const history = (
                await fs.getDoc(
                  fs.doc(
                    fs.getFirestore(),
                    `recent-tv/${user?.uid}/history/${details.id}`
                  )
                )
              ).data() as TVHistory | undefined

              if (history == undefined) {
                setHistoryUndefined(true)
              } else {
                setHistory(history)
              }
            }
          } catch (error) {
            console.error(error)
          }
        })(),
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (historyUndefined) {
      selectEpisode(1, 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyUndefined])

  useEffect(() => {
    router.refresh()
  }, [params, router])

  function fetchServer(event: MouseEvent<HTMLButtonElement>, server: string) {
    event.preventDefault()
    router.push(`/browse/media/${type}/${id}?server=${server}`)
  }

  function selectEpisode(season: number, episode: number) {
    if (type === 'tv') {
      setEpisodeNumber(episode)
      setSeason(season)

      let newHistory = {} as any

      if (history != undefined) {
        newHistory = { ...history }

        if (history.seasons != undefined) {
          if (
            history.seasons.find((x: any) => x.season === season) != undefined
          ) {
            const seasonIndex = history.seasons.findIndex(
              (x: any) => x.season === season
            )

            newHistory.seasons[seasonIndex].episodes.push(episode)
          } else {
            newHistory.seasons.push({
              season: season,
              episodes: [episode],
            })
          }
        } else {
          newHistory.seasons = []
          newHistory.seasons.push({
            season: season,
            episodes: [episode],
          })
        }
      } else {
        newHistory.id = details.id
        newHistory.seasons = []
        newHistory.seasons.push({
          season: season,
          episodes: [episode],
        })
      }

      setHistory(newHistory)

      fs.setDoc(
        fs.doc(
          fs.getFirestore(),
          `recent-tv/${user?.uid}/history/${details.id}`
        ),
        newHistory
      )
    }
  }

  return (
    <>
      <div className="w-full flex flex-col lg:h-[calc(100svh-116px-20px)] pb-8 px-[5%] xl:pt-5 pt-3">
        <h1 className="font-semibold xl:text-5xl md:text-5xl text-3xl text-nowrap overflow-hidden whitespace-nowrap text-ellipsis lg:text-4xl pl-4 min-h-14 md:min-h-16 xl:min-h-20">
          {type === 'tv'
            ? `S${season} E${episode} - ${(details as TVDetails).name}`
            : (details as MovieDetails).title}
        </h1>
        <div className="flex flex-col gap-5 lg:flex-row justify-between h-full">
          <div className="h-full aspect-video lg:max-w-[70%] flex flex-col">
            <div className="h-full w-full*:flex-grow *:w-full *:h-full *:hover:cursor-pointer *:shadow-2xl *:rounded-2xl">
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
          </div>
          {type === 'tv' ? (
            <SeversSeasons
              history={history}
              type={type}
              className="lg:block block md:hidden"
              fetchServer={fetchServer}
              server={server as Server}
              seasons={
                type === 'tv'
                  ? (details as TVDetails).seasons.length
                  : undefined
              }
              selectEpisode={selectEpisode}
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
                  history={history}
                  className={`max-h-[600px] overflow-auto`}
                  id={id}
                  selectEpisode={selectEpisode}
                  seasons={(details as TVDetails).seasons.length}
                />
              </Panel>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
