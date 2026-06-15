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
    <header className="bg-navy-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-blue-400">国会</span>
              <span className="text-white">議事録</span>
            </span>
            <span className="hidden sm:block text-xs text-navy-300 border border-navy-500 rounded px-1.5 py-0.5">
              BETA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  pathname.startsWith(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-navy-200 hover:bg-navy-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/search"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-700 hover:bg-navy-600 rounded text-sm text-navy-200 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              検索
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded text-navy-200 hover:text-white hover:bg-navy-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-2 border-t border-navy-700">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium ${
                  pathname.startsWith(item.href)
                    ? 'text-blue-400 bg-navy-800'
                    : 'text-navy-200 hover:text-white hover:bg-navy-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-navy-200 hover:text-white hover:bg-navy-800"
            >
              検索
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
