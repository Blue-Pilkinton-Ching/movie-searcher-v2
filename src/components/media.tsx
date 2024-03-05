'use client'

import { MouseEvent, useEffect, useState } from 'react'
import ServerButton from './server-button'
import { useRouter, useSearchParams } from 'next/navigation'

type Server = 'Free' | '2embed' | 'Vidsrc.to' | 'Vidsrc.xyz'

export default function Media({
  type,
  id,
}: {
  id: number
  type: 'movie' | 'tv'
}) {
  const params = useSearchParams()
  const [server, setServer] = useState<Server | null>(null)

  const router = useRouter()

  useEffect(() => {
    setServer((params.get('server') as Server | undefined) || 'Free')
  }, [params.get])

  function fetchServer(event: MouseEvent<HTMLButtonElement>, server: string) {
    event.preventDefault()
    router.push(`/browse/media/${type}/${id}?server=${server}`)
  }

  return (
    <>
      <hr className="border-0 h-5" />
      <div className="flex flex-col gap-5 lg:flex-row lg:h-[calc(90vh-116px-20px)] justify-center">
        <div className="h-full lg:max-w-[70%] aspect-video *:w-full *:h-full *:hover:cursor-pointer *:shadow-2xl *:rounded-2xl">
          {server === 'Free' ? (
            <iframe
              src={`https://www.2embed.cc/embed/${id}`}
              allowFullScreen
              sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-presentation"
              frameBorder={0}
              scrolling="no"
            ></iframe>
          ) : null}
          {server === '2embed' ? (
            <iframe
              src={`https://www.2embed.cc/embed/${id}`}
              allowFullScreen
              frameBorder={0}
              scrolling="no"
            ></iframe>
          ) : null}
          {server === 'Vidsrc.xyz' ? (
            <iframe
              src={`https://vidsrc.xyz/embed/${id}`}
              allowFullScreen
              frameBorder={0}
              scrolling="no"
            ></iframe>
          ) : null}
          {server === 'Vidsrc.to' ? (
            <iframe
              src={`https://vidsrc.to/embed/${type}/${id}`}
              allowFullScreen
              frameBorder={0}
              scrolling="no"
            ></iframe>
          ) : null}
        </div>
        <div className="xl:w-[30%] lg:w-[23%] h-20 w-full lg:max-w-80 lg:h-[calc(90vh-116px-20px)] rounded-2xl bg-neutral-700/30 lg:p-3 xl:p-5 text-center">
          <div>
            <h1 className="text-3xl font-bold py-2.5 wrap">Servers</h1>
            <p className="text-sm font-semibold text-neutral-500">
              If one of the servers is not working try another.
            </p>
            <br />
            <div className="flex gap-3 flex-col items-center flex-wrap">
              <ServerButton
                selected={server === 'Free'}
                text={'Ad-Free'}
                onClick={(event) => fetchServer(event, 'Free')}
              />
              <ServerButton
                selected={server === '2embed'}
                text={'2embed'}
                onClick={(event) => fetchServer(event, '2embed')}
              />
              <ServerButton
                selected={server === 'Vidsrc.xyz'}
                text={'Vidsrc.xyz'}
                onClick={(event) => fetchServer(event, 'Vidsrc.xyz')}
              />
              <ServerButton
                selected={server === 'Vidsrc.to'}
                text={'Vidsrc.to'}
                onClick={(event) => fetchServer(event, 'Vidsrc.to')}
              />
            </div>
            <br />
            <p className="text-sm font-semibold text-neutral-500">
              *Note* Ad-Free will attempt to block ads from the video, but will
              often not work. We recommend installing{' '}
              <a
                className="text-mainpurple hover:underline"
                href="https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"
              >
                uBlock Origin{' '}
              </a>
              and using a different server.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
