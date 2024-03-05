'use client'

import { MouseEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import ServerPanel from '@/components/servers-panel'

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
        <ServerPanel
          className="lg:block hidden"
          fetchServer={fetchServer}
          server={server as Server}
        />
        <div className="flex lg:hidden gap-5 flex-col md:flex-row">
          <ServerPanel fetchServer={fetchServer} server={server as Server} />
          <ServerPanel fetchServer={fetchServer} server={server as Server} />
        </div>
      </div>
    </>
  )
}
