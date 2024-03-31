import Link from 'next/link'
import { IoMdArrowBack } from 'react-icons/io'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-svh flex items-center justify-center flex-col gap-3">
      {children}
      {/* <hr className="w-[300px] border-neutral-500 my-5" />
      <Link
        className={
          'shadow-md bg-neutral-900/70 rounded-xl px-5 py-1 active:scale-95 duration-200 flex items-center h-10'
        }
        href={''}
      >
        Create new Account
      </Link> */}
      <p className="text-neutral-500 text-sm">
        (You won&apos;t receive junk mail, ads or other crap)
      </p>
      <br />
      <Link
        className="flex gap-3 hover:brightness-75 active:scale-95 duration-200"
        href={'/browse'}
      >
        <IoMdArrowBack size={24} />
        <div>Back to browsing</div>
      </Link>
    </div>
  )
}
