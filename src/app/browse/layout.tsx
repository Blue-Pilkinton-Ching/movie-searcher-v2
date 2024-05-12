import HeaderWrapper from './header-wrapper'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="px-[5%] h-svh overflow-auto scrollbar">
        <HeaderWrapper />
        {children}
      </div>
    </>
  )
}
