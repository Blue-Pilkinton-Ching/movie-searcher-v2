'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import ServerButton from './server-button'
import { MouseEvent, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'

import * as fs from 'firebase/firestore'
import { Settings } from '../../interfaces'
import Link from 'next/link'

export default function Servers({
  fetchServer,
  server,
}: {
  fetchServer: (event: MouseEvent<HTMLButtonElement>, server: string) => void
  server: string
}) {
  const [user] = useAuthState(getAuth())

  const [settings, setSettings] = useState<Settings>()

  useEffect(() => {
    if (user) {
      Promise.allSettled([
        (async () => {
          try {
            const settings = (
              await fs.getDoc(fs.doc(fs.getFirestore(), `settings/${user.uid}`))
            ).data() as Settings | undefined

            if (settings) {
              setSettings(settings)
            } else {
              console.error('Settings not found')
            }
          } catch (error) {
            console.error('Settings not found')
          }
        })(),
      ])
    }
  }, [user])

  return (
    <div className="max-w-[400px] mx-auto">
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
        {settings?.showMoreServers ? (
          <>
            <ServerButton
              selected={server === 'Vidsrc.xyz'}
              text={'Vidsrc.xyz'}
              onClick={(event) => fetchServer(event, 'Vidsrc.xyz')}
            />
            <ServerButton
              selected={server === '2embed'}
              text={'2embed'}
              onClick={(event) => fetchServer(event, '2embed')}
            />{' '}
          </>
        ) : null}
        <ServerButton
          selected={server === 'Free'}
          text={'Ad-Free'}
          onClick={(event) => fetchServer(event, 'Free')}
        />
      </div>
      <br />
      <p className="text-sm font-semibold text-neutral-500">
        {settings?.showMoreServers ? null : (
          <>
            To gain access more servers, please{' '}
            <Link className="text-mainpurple hover:underline" href={'/account'}>
              create an account.
            </Link>
            <br />
            <br />
          </>
        )}
      </p>
      <p className="text-sm font-semibold text-neutral-500">
        *Note* Ad-Free will attempt to block ads on videos, but will often not
        work. We recommend installing{' '}
        <a
          className="text-mainpurple hover:underline"
          href="https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"
        >
          uBlock Origin{' '}
        </a>
        and using a different server.
      </p>
    </div>
  )
}
