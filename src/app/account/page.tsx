'use client'

import { FcGoogle } from 'react-icons/fc'
import SignInButton from './sign-in-button'
import { getAuth } from 'firebase/auth'
import { MdOutlineLogout } from 'react-icons/md'

import * as fs from 'firebase/firestore'

import './../../utils/client/firebase'

import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
  const [user, userLoading] = useAuthState(getAuth())
  const [loading, setLoading] = useState(true)
  const [showMoreServers, setShowMoreServers] = useState(false)

  useEffect(() => {
    if (user) {
      Promise.allSettled([
        (async () => {
          try {
            const settings = (
              await fs.getDoc(fs.doc(fs.getFirestore(), `settings/${user.uid}`))
            ).data()

            if (settings) {
              setShowMoreServers(settings.showMoreServers)
            } else {
              console.error('Settings not found')
            }

            setLoading(false)
          } catch (error) {
            console.log(error)
          }
        })(),
      ])
    } else {
      setLoading(false)
    }
  }, [user])

  return (
    <div>
      {userLoading || loading ? (
        <>
          <p>Loading...</p>
          <br />
        </>
      ) : user ? (
        <>
          <div className="">
            <div className="w-full flex gap-3 items-center ">
              <input
                className="w-5 h-5"
                type="checkbox"
                name="showMoreServer"
                id="showMoreServer"
                checked={showMoreServers}
                onChange={(event) => {
                  setShowMoreServers(event.target.checked)

                  fs.setDoc(
                    fs.doc(fs.getFirestore(), `settings/${user.uid}`),
                    {
                      showMoreServers: event.target.checked,
                    },
                    {
                      merge: true,
                    }
                  )
                }}
              />
              <label htmlFor="showMoreServer">
                Display more streaming servers
              </label>
            </div>
          </div>
          <p className="text-sm max-w-[350px] py-2 text-neutral-500">
            The extra servers may create NSFW popup ads. We advise you install
            an{' '}
            <Link
              className="text-mainpurple hover:underline"
              href={'https://ublockorigin.com/'}
            >
              adblocker{' '}
            </Link>{' '}
            before using this feature.
          </p>
          <br />
          <SignInButton
            provider={'sign out'}
            text="Sign out"
            icon={<MdOutlineLogout size={30} />}
            className="border-none bg-neutral-500/20"
          />
        </>
      ) : (
        <>
          <SignInButton
            textClassName="text-neutral-500"
            provider={'google'}
            text="Sign in with Google"
            icon={<FcGoogle size={30} />}
            className="border-neutral-400 bg-white"
          />
          <p className="text-sm max-w-[350px] py-2">
            Creating an account allows you to view recently watched media, and
            create movie lists! You also won&apos;t receive junk mail, ads or
            other crap.
          </p>
        </>
      )}
    </div>
  )
}
