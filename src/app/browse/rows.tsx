import TrendingContent from './trending-content'
import RecentContent from './recent-content'
import { Suspense, useState } from 'react'

export default function Rows() {
  return (
    <>
      <div className="h-full">
        <Suspense
          fallback={<p className="text-2xl font-bold">Loading content...</p>}
        >
          <TrendingContent />
        </Suspense>
        <RecentContent />
      </div>
    </>
  )
}
