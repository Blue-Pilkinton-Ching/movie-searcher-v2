'use client'

import { ChangeEvent } from 'react'
import Panel from './panel'

export default function SeasonsPanel({
  className,
  type,
  selectEpisode,
  seasons,
  value,
  onChange,
}: {
  className?: string
  type: 'tv' | 'movie'
  selectEpisode?: (season: number) => void
  seasons?: number
  value: number
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <Panel className={`${className} py-8 lg:max-w-[600px]`}>
      {type === 'tv' ? (
        <>
          <div className="max-w-[400px] mx-auto">
            <select
              value={value}
              onChange={onChange}
              className="w-[80%] font-semibold rounded-full border h-8 outline-none border-neutral-500 bg-transparent text-neutral-500 text-center"
            >
              {Array.from({ length: seasons || 0 }, (_, i) => (
                <option
                  className="bg-transparent font-semibold "
                  key={i}
                  value={i + 1}
                >
                  Season {i + 1}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : null}
    </Panel>
  )
}
