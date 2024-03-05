'use client'

import Panel from './panel'
import ServerButton from './server-button'
import { MouseEvent } from 'react'

export default function ServersPanel({
  className,
  server,
  fetchServer,
}: {
  className?: string
  server: string
  fetchServer: (event: MouseEvent<HTMLButtonElement>, server: string) => void
}) {
  return (
    <Panel className={`${className} lg:h-full xl:p-[3vw]`}>
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
        *Note* Ad-Free will attempt to block ads on movies, but will often not
        work. We recommend installing{' '}
        <a
          className="text-mainpurple hover:underline"
          href="https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"
        >
          uBlock Origin{' '}
        </a>
        and using a different server.
      </p>
    </Panel>
  )
}
