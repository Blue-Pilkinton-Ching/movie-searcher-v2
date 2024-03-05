export default function Panel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`w-full rounded-2xl bg-neutral-700/30 lg:p-3 p-5 text-center ${className}`}
    >
      {children}
    </div>
  )
}
