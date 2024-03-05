import { Episode } from '../../interfaces'

export default function Episode({
  episode,
  selectEpisode,
}: {
  episode: Episode
  selectEpisode: (episode: number) => void
}) {
  return (
    <button
      onClick={() => selectEpisode(episode.episode_number)}
      className="w-[90%] h-8 m-1 text-left overflow-y-hidden shadow border hover:bg-mainpurple hover:text-white duration-200 hover:scale-[1.025] active:scale-95 border-neutral-700  text-neutral-500 bg-neutral-900 rounded-full"
    >
      <div className="w-full px-7 truncate">
        <b className="pr-3">{episode.episode_number}:</b>
        {episode.name}
      </div>
    </button>
  )
}
