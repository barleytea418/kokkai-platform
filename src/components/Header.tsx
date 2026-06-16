'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/shugiin', label: '衆議院' },
  { href: '/sangin', label: '参議院' },
  { href: '/press-conference', label: '記者会見' },
  { href: '/members', label: '議員検索' },
  { href: '/policy-compare', label: '政策比較' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-navy-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-blue-400">国会</span>
              <span className="text-white">議事録</span>
            </span>
            <span className="hidden rounded border border-navy-500 px-1.5 py-0.5 text-xs text-navy-300 sm:block">
              BETA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-navy-200 hover:bg-navy-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/search"
              className="flex items-center gap-1.5 rounded bg-navy-700 px-3 py-1.5 text-sm text-navy-200 transition-colors hover:bg-navy-600 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              検索
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="rounded p-2 text-navy-200 hover:bg-navy-700 hover:text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-navy-700 py-2 md:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium ${
                  pathname.startsWith(item.href)
                    ? 'bg-navy-800 text-blue-400'
                    : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-navy-200 hover:bg-navy-800 hover:text-white"
            >
              検索
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
