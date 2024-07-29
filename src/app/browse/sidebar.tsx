import Image from 'next/image'
import { Media } from '../../../interfaces'

export default function Sidebar({ media }: { media: Media | undefined }) {
  return (
    <>
      <div className={media != undefined ? 'block' : 'hidden'}>
        <div className="static top-0 bottom-0 left-0 right-0 bg-red-800"></div>
      </div>
    </>
  )
}
// href={`/browse/media/${data.media_type}/${encodeURIComponent(data.id)}`}
