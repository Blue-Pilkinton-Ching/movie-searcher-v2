export default function Panel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`lg:w-[20vw] w-full rounded-2xl bg-neutral-700/30 p-5 text-center flex-grow ${className}`}
    >
      {children}
    </div>
  )
}
