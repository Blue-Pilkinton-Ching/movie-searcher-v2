import Image from 'next/image'
import { Media } from '../../../interfaces'
import Link from 'next/link'

export interface CardProps {
  data: Media
}

export function Card({ data }: CardProps) {
  return (
    <Link
      className="relative max-w-[154px] hover:brightness-75 hover:cursor-pointer duration-200 hover:scale-[1.03] active:scale-100"
      href={`/browse/media/${data.media_type}/${encodeURIComponent(data.id)}`}
    >
      <div className={`w-[40vw] max-w-[154px] aspect-[2/3]`}>
        {data.poster_path == null ? (
          <div className="w-full h-full rounded-md bg-neutral-500/10 text-center flex">
            <p className="px-5 my-auto">Couldn&apos;t find Image</p>
          </div>
        ) : (
          <>
            <Image
              className="w-full h-full shadow-md rounded-md"
              src={`https://image.tmdb.org/t/p/w${154}/${data.poster_path}`}
              alt={`${data.title ? data.title : data.name} poster`}
              width={154}
              height={231}
            ></Image>
          </>
        )}
      </div>
      <div className="max-w-[calc(154px)] pt-3 pb-7">
        <p className="text-ellipsis text-nowrap overflow-hidden font-semibold">
          {data.title ? data.title : data.name}
        </p>
        <p>
          {data.media_type === 'movie' ? 'Movie ' : 'TV '} •{'  '}
          {(data.release_date ? data.release_date : data.first_air_date)?.slice(
            0,
            4
          )}
        </p>
      </div>
    </Link>
  )
}
