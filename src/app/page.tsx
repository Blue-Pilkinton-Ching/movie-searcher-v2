import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/home')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between"></main>
  )
}
