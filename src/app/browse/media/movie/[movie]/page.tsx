export default function Page({ params }: { params: { movie: string } }) {
  return (
    <>
      <hr className="border-0 h-5" />
      <div className="flex flex-col gap-5 lg:flex-row lg:h-[calc(90vh-116px-20px)] justify-center">
        <div className="h-full lg:max-w-[70%] aspect-video ">
          <iframe
            src={`https://www.2embed.cc/embed/${params.movie}`}
            className="w-full h-full hover:cursor-pointer shadow-2xl rounded-2xl"
            allowFullScreen
            sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-presentation"
            frameBorder={0}
            scrolling="no"
          ></iframe>
        </div>
        <div className="xl:w-[30%] lg:w-[20%] h-20 w-full lg:max-w-80 lg:h-[calc(90vh-116px-20px)] rounded-2xl bg-neutral-700/30"></div>
      </div>
    </>
  )
}
