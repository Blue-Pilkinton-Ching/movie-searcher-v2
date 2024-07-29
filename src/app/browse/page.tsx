import React from 'react'

import TMDBAuthHeader from '@/utils/server/tmdb-header'
import Image from 'next/image'
import Rows from './rows'
import Link from 'next/link'

import { headers } from 'next/headers'

export default async function Page({
  searchParams,
}: {
  searchParams: { view: string; media_type: string }
}) {
  const popular = (
    await (
      await fetch(`https://api.themoviedb.org/3/movie/popular`, {
        ...TMDBAuthHeader(),
        next: { revalidate: 3600 },
      })
    ).json()
  ).results[0]

  let details = undefined

  const headersList = headers()
  const url = headersList.get('x-url-without-params') || ''

  if (searchParams && searchParams.view) {
    if (searchParams.media_type == 'movie') {
      details = await (
        await fetch(`https://api.themoviedb.org/3/movie/${searchParams.view}`, {
          ...TMDBAuthHeader(),
          next: { revalidate: 3600 },
        })
      ).json()
    } else {
      details = await (
        await fetch(`https://api.themoviedb.org/3/tv/${searchParams.view}`, {
          ...TMDBAuthHeader(),
          next: { revalidate: 3600 },
        })
      ).json()
    }
  }

  return (
    <>
      {popular && popular.backdrop_path ? (
        <div className="w-full h-[60%] sm:block">
          <Image
            className="w-full h-[calc(100svh-4rem)] absolute top-0 left-0 object-cover banner-mask object-[50%,0%]"
            src={`https://image.tmdb.org/t/p/w1280/${popular.backdrop_path}`}
            alt="background"
            width={1280}
            height={720}
            priority
            quality={50}
          ></Image>
          <div className="w-full h-[90%] flex flex-col items-center"></div>
        </div>
      ) : null}
      <div className="w-full px-[5%] h-full">
        <Rows />
      </div>
      {details ? (
        <div
          className={`sticky w-full h-full bg-neutral-700/70 inset-0 z-40 backdrop-blur-sm flex justify-center`}
        >
          <Link
            className="w-full h-full flex justify-center"
            href={url}
            scroll={false}
          ></Link>
          <div className="shadow-2xl h-svh sm:h-[calc(100vh-10vw)] absolute sm:max-w-[min(80vh,90vw)] w-full sm:m-[5vw] sm:rounded-lg bg-black bg-clip-content">
            <Image
              src={`https://image.tmdb.org/t/p/w780/${details?.backdrop_path}`}
              alt={''}
              width={780}
              height={439}
              quality={60}
              priority
              className="w-full sm:rounded-t-lg fade-image"
            ></Image>
          </div>
        </div>
      ) : null}
    </>
  )
}
