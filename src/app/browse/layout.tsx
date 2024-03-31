import HeaderWrapper from './header-wrapper'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="px-[5%] overflow-auto max-h-lvh scrollbar">
        <HeaderWrapper />
        {children}
      </div>
    </>
  )
}
