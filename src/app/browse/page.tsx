import React, { Suspense } from 'react'
import TrendingContent from './trending-content'
import RecentContent from './recent-content'

export default function Page() {
  return (
    <>
      <Suspense
        fallback={<p className="text-2xl font-bold">Loading content...</p>}
      >
        <TrendingContent />
      </Suspense>
      <RecentContent />
    </>
  )
}
