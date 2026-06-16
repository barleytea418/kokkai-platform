'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  placeholder?: string
  size?: 'sm' | 'lg'
  initialValue?: string
}

export function SearchBox({
  placeholder = '議事録・議員名・政策キーワードで検索',
  size = 'lg',
  initialValue = '',
}: Props) {
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
          className={`absolute left-4 flex-shrink-0 text-gray-400 ${size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
            size === 'lg' ? 'py-4 pl-12 pr-4 text-base shadow-sm' : 'py-2.5 pl-10 pr-4 text-sm'
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 rounded-lg bg-blue-600 font-medium text-white transition-colors hover:bg-blue-700 ${
            size === 'lg' ? 'px-5 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'
          }`}
        >
          検索
        </button>
      </div>
    </form>
  )
}
