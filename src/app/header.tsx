'use client'

interface HeaderProps {
  search: (search: string) => void
}

export function Header(props: HeaderProps) {
  async function onSearch(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
    }

    if (event.currentTarget.value.trim()) {
      props.search(event.currentTarget.value)
    }
  }

  return (
    <header className="w-full h-fit min-h-24 flex items-center lg:justify-between flex-col *:h-full *:flex *:items-center lg:flex-row px-[5%]">
      <div>
        <div className="text-3xl p-5">Watchalot</div>
      </div>
      <div className="w-full px-[5%]">
        <textarea
          onKeyDown={onSearch}
          className="flex-grow bg-neutral-900 h-10 resize-none focus:outline-none rounded line py-1.5 overflow-hidden px-5 text-lg"
          name="search"
          cols={1}
          rows={1}
          placeholder="Search for movies or TV shows..."
        ></textarea>
      </div>
    </header>
  )
}
