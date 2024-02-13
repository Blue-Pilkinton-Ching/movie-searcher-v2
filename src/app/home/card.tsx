import Image from 'next/image'
import { GlobalState, Media } from '../../../interfaces'
import Link from 'next/link'
import { useGlobalState } from '../globalState'

export interface CardProps {
  data: Media
}

export function Card({ data }: CardProps) {
  const { setGlobalState } = useGlobalState()

  function onClick() {
    setGlobalState((oldState: GlobalState) => ({
      ...oldState,
      currentMedia: data,
    }))
  }

  return (
    <Link
      onClick={onClick}
      className="max-w-[154px] hover:cursor-pointer hover:brightness-75 hover:duration-300"
      href={`/home/media/${data.media_type}/${encodeURIComponent(data.id)}`}
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
    </Link>
  )
}
