export default function Panel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`lg:w-[30%] lw-full lg:max-w-80 lg:h-[calc(90vh-116px-20px)] rounded-2xl bg-neutral-700/30 lg:p-3 xl:p-5 p-5 text-center ${className}`}
    >
      {children}
    </div>
  )
}
