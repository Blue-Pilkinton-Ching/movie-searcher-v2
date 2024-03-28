'use client'

import { Media } from '../../../interfaces'
import { Card } from './card'
import ContentRow from './content-row'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

import '@/utils/client/firebase'

import * as fs from 'firebase/firestore'

export default function RecentContent() {
  const [user] = useAuthState(getAuth())

  const [movies, setMovies] = useState<Media[]>()
  const [tv, setTV] = useState<Media[]>()

  useEffect(() => {
    async function getRecentMedia() {
      await Promise.allSettled([
        (async () => {
          try {
            setMovies(
              Object.entries(
                (
                  await fs.getDoc(
                    fs.doc(
                      fs.collection(fs.getFirestore(), `recent-movies`),
                      user?.uid
                    )
                  )
                ).data() as Object
              ).map(([key, value]) => value as Media)
            )
          } catch (error) {
            console.error(error)
          }
        })(),
        (async () => {
          try {
            setTV(
              Object.entries(
                (
                  await fs.getDoc(
                    fs.doc(
                      fs.collection(fs.getFirestore(), `recent-tv`),
                      user?.uid
                    )
                  )
                ).data() as Object
              ).map(([key, value]) => value as Media)
            )
          } catch (error) {
            console.error(error)
          }
        })(),
      ])
    }

    if (user) {
      getRecentMedia()
    }
  }, [user])
  return (
    <>
      {movies ? (
        <ContentRow
          name={'Recent Movies'}
          cards={movies.map((movie, index) => (
            <Card key={index} data={movie} />
          ))}
        />
      ) : null}
      {tv ? (
        <ContentRow
          name={'Recent TV Shows'}
          cards={tv.map((tvShow, index) => (
            <Card key={index} data={tvShow} />
          ))}
        />
      ) : null}
    </>
  )
}
