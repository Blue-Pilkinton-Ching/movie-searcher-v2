import HeaderWrapper from './header-wrapper'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="h-svh overflow-auto relative">
        <HeaderWrapper />
        {children}
      </div>
    </>
  )
}
