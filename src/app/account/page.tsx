'use client'

import { FcGoogle } from 'react-icons/fc'
import SignInButton from './sign-in-button'
import { getAuth } from 'firebase/auth'
import { MdOutlineLogout } from 'react-icons/md'

import './../../utils/client/firebase'

import { useAuthState } from 'react-firebase-hooks/auth'

export default function Page() {
  const [user, userLoading] = useAuthState(getAuth())

  return (
    <div>
      {userLoading ? (
        <>
          <p>Loading...</p>
          <br />
        </>
      ) : user ? (
        <SignInButton
          provider={'sign out'}
          text="Sign out"
          icon={<MdOutlineLogout size={30} />}
          className="border-none bg-neutral-500/20"
        />
      ) : (
        <SignInButton
          textClassName="text-neutral-500"
          provider={'google'}
          text="Sign in with Google"
          icon={<FcGoogle size={30} />}
          className="border-neutral-400 bg-white"
        />
      )}
    </div>
  )
}
