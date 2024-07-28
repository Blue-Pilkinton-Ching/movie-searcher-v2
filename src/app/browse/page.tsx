import React, { Suspense } from 'react'
import TrendingContent from './trending-content'
import RecentContent from './recent-content'
import TMDBAuthHeader from '@/utils/server/tmdb-header'
import Image from 'next/image'
export default async function Page() {
  const randomIndex = Math.floor(Math.random() * 10) + 1 // pick random between 1 and 10
  const data = (
    await (
      await fetch(`https://api.themoviedb.org/3/movie/popular`, {
        ...TMDBAuthHeader(),
        next: { revalidate: 3600 },
      })
    ).json()
  ).results[randomIndex]

  return (
    <>
      {data && data.backdrop_path ? (
        <div className="w-full h-[60%] sm:block">
          <Image
            className="w-full h-[calc(100svh-4rem)] absolute top-0 left-0 object-cover banner-mask object-[50%,0%]"
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            alt="background"
            width={1280}
            height={720}
            priority
            quality={80}
          ></Image>
          <div className="w-full h-[90%] flex flex-col items-center"></div>
        </div>
      ) : null}
      <div className="w-full px-[5%] h-full">
        <div className="h-full">
          <Suspense
            fallback={<p className="text-2xl font-bold">Loading content...</p>}
          >
            <TrendingContent />
          </Suspense>
          <RecentContent />
        </div>
      </div>
    </>
  )
}
