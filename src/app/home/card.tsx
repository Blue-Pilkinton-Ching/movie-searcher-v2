import Image from 'next/image'
import { Media } from '../../../interfaces'
import { useWindowSize } from '@uidotdev/usehooks'

export interface CardProps {
  data: Media
}

export function Card({ data }: CardProps) {
  return (
    <div
      className={`w-[40vw] max-w-[154px] h-auto rounded hover:cursor-pointer hover:duration-300:brightness-75 `}
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
  )
}
