import Image from 'next/image'
import { Media } from '../../../interfaces'
import { useWindowSize } from '@uidotdev/usehooks'

export interface CardProps {
  data: Media
  onSelect: (data: Media) => void
}

export function Card({ data, onSelect }: CardProps) {
  return (
    <button
      onClick={() => onSelect(data)}
      className="max-w-[154px] hover:cursor-pointer hover:brightness-75 hover:duration-300"
    >
      <div className={`w-[40vw] max-w-[154px] aspect-[2/3] *:rounded-md`}>
        {data.poster_path == null ? (
          <div className="w-full h-full bg-neutral-500/10 text-center flex">
            <p className="px-5 my-auto">Couldn&apos;t find Image</p>
          </div>
        ) : (
          <Image
            className="w-full h-full shadow-md"
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
    </button>
  )
}
