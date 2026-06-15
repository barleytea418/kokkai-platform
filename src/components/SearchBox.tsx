'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  placeholder?: string
  size?: 'sm' | 'lg'
  initialValue?: string
}

export function SearchBox({ placeholder = '議事録・議員名・政策キーワードで検索', size = 'lg', initialValue = '' }: Props) {
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <svg
          className={`absolute left-4 text-gray-400 flex-shrink-0 ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-xl bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400 ${
            size === 'lg'
              ? 'pl-12 pr-4 py-4 text-base shadow-sm'
              : 'pl-10 pr-4 py-2.5 text-sm'
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors ${
            size === 'lg' ? 'px-5 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'
          }`}
        >
          検索
        </button>
      </div>
    </form>
  )
}
