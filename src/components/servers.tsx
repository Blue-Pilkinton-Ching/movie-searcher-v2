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
        If the video isn&apos;t playing, try choose a different server or
        consider{' '}
        <Link className="text-mainpurple hover:underline" href={'/account'}>
          creating an account.
        </Link>
      </p>
      <br />
      <div className="flex gap-3 flex-col items-center flex-wrap">
        <ServerButton
          selected={server === 'Vidsrc.cc'}
          text={'Vidsrc.cc'}
          onClick={(event) => fetchServer(event, 'Vidsrc.cc')}
        />

        {settings?.showMoreServers ? (
          <>
            <ServerButton
              selected={server === 'Vidsrc.xyz'}
              text={'Vidsrc.xyz'}
              onClick={(event) => fetchServer(event, 'Vidsrc.xyz')}
            />{' '}
            <ServerButton
              selected={server === 'Vidsrc.me'}
              text={'Vidsrc.me'}
              onClick={(event) => fetchServer(event, 'Vidsrc.me')}
            />
            <ServerButton
              selected={server === '2embed'}
              text={'2embed'}
              onClick={(event) => fetchServer(event, '2embed')}
            />
          </>
        ) : (
          <ServerButton
            selected={false}
            text={'More Servers'}
            onClick={() => {
              alert(
                'These extra servers may create NSFW ads. Use at your own discretion.'
              )
              setSettings({ ...settings, showMoreServers: true })
            }}
          />
        )}
      </div>
      <br />
      <p className="text-sm font-semibold text-neutral-500">
        {settings?.showMoreServers ? null : (
          <>
            <br />
            <br />
          </>
        )}
      </p>
      <p className="text-sm font-semibold text-neutral-500">
        Servers other than Vidsrc.cc may create R-18 Pop Up Ads. We recommend
        you install an ad-blocker such as{' '}
        <a
          className="text-mainpurple hover:underline"
          href="https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"
        >
          uBlock Origin{' '}
        </a>
      </p>
    </div>
  )
}
