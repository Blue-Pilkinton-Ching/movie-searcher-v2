import Media from '@/components/media'

export default function Page({ params }: { params: { movie: number } }) {
  return <Media id={params.movie} type="movie" />
}
