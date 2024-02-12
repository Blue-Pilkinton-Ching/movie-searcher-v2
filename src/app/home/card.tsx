import Image from 'next/image'
import { Media } from '../../../interfaces'

export interface CardProps {
  data: Media
}

export function Card({ data }: CardProps) {
  return (
    <div className="w-[154px] h-[231px] rounded">
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
