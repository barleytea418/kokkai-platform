import { Suspense } from 'react'
import SearchPageInner from './SearchPageInner'

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">読み込み中...</div>}>
      <SearchPageInner />
    </Suspense>
  )
}
