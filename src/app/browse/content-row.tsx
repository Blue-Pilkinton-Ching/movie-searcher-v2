'use client'

import { useEffect, useRef, useState } from 'react'

import { MdArrowBackIos } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'

export default function ContentRow({
  name,
  cards,
}: {
  name: string
  cards: React.ReactNode
}) {
  const [scrollValue, setScrollValue] = useState(0)

  const row = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (row.current) {
      row.current.addEventListener('scroll', () => {
        setScrollValue(row.current?.scrollLeft || -1)
      })
    }
    setScrollValue(row.current?.scrollLeft || -1)
  }, [])

  function onClickLeft() {
    if (row.current) {
      row.current.scrollTo({
        left: row.current.scrollLeft - (row.current.clientWidth - 100),
        behavior: 'smooth',
      })
    }
  }
  function onClickRight() {
    if (row.current) {
      row.current.scrollTo({
        left: row.current.scrollLeft + (row.current.clientWidth - 100),
        behavior: 'smooth',
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <br />
      <div className="relative group">
        <div
          ref={row}
          className="flex gap-5 sm:gap-8 w-min justify-start max-w-full px-5 mask overflow-y-hidden hide-scrollbar py-2 relative"
        >
          {cards}
        </div>
        <div className="absolute top-0 w-full h-[285px] my-2 hidden sm:block pointer-events-none">
          <div className="relative h-full *:w-9 *:h-full *:absolute hover:*:*:brightness-75 active:*:*:scale-90 *:hover:opacity-100 duration-200 group-hover:opacity-100 *:cursor-pointer opacity-0 *:*:duration-200 *:duration-200 *:pointer-events-auto">
            <button
              onClick={onClickLeft}
              className="-translate-x-full left-0"
              style={{
                cursor: `${
                  row.current?.scrollLeft === 0 ? 'default' : 'pointer'
                }`,
                opacity: `${row.current?.scrollLeft === 0 ? '0' : '100'}`,
              }}
            >
              <MdArrowBackIos size={36} className="-translate-y-6" />
            </button>
            <button
              onClick={onClickRight}
              className="translate-x-full right-0 "
              style={{
                cursor: `${
                  row.current?.scrollLeft ===
                  (row.current?.scrollWidth || -1) -
                    (row.current?.clientWidth || -1)
                    ? 'default'
                    : 'pointer'
                }`,
                opacity: `${
                  row.current?.scrollLeft ===
                  (row.current?.scrollWidth || -1) -
                    (row.current?.clientWidth || -1)
                    ? '0'
                    : '100'
                }`,
              }}
            >
              <MdArrowForwardIos size={36} className="-translate-y-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
