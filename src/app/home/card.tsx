import Image from 'next/image'
import { Media } from '../../../interfaces'
import { useWindowSize } from '@uidotdev/usehooks'

export interface CardProps {
  data: Media
}

export function Card({ data }: CardProps) {
  return (
    <div className="max-w-[154px]">
      <div
        className={`w-[40vw] max-w-[154px] aspect-[2/3] rounded hover:cursor-pointer hover:brightness-75 hover:duration-300 `}
      >
        {data.poster_path == null ? (
          `null`
        ) : (
          <Image
            className="w-full h-full rounded shadow-md"
            src={`https://image.tmdb.org/t/p/w${154}/${data.poster_path}`}
            alt={`${data.title ? data.title : data.name} poster`}
            width={154}
            height={231}
          ></Image>
        )}
      </div>
      <div className="pt-3 w-[40vw] max-w-[154px]">
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
        <br />
      </div>
    </div>
  )
}
