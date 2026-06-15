'use client'
import { useState } from 'react'
import { MemberCard } from '@/components/MemberCard'
import { SearchBox } from '@/components/SearchBox'
import { MOCK_MEMBERS } from '@/data/mock-members'
import { PARTIES } from '@/data/parties'
import { getPartyColor } from '@/lib/utils'
import Link from 'next/link'

const HOUSES = [
  { key: 'all', label: 'すべて' },
  { key: 'shugiin', label: '衆議院' },
  { key: 'sangin', label: '参議院' },
]

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHouse, setSelectedHouse] = useState<string>('all')
  const [selectedParty, setSelectedParty] = useState<string>('all')

  const filtered = MOCK_MEMBERS.filter(m => {
    const matchesSearch =
      !searchQuery ||
      m.name.includes(searchQuery) ||
      m.nameKana.includes(searchQuery) ||
      m.party.includes(searchQuery) ||
      m.constituency.includes(searchQuery) ||
      (m.position && m.position.includes(searchQuery))

    const matchesHouse = selectedHouse === 'all' || m.house === selectedHouse
    const matchesParty = selectedParty === 'all' || m.party === selectedParty

    return matchesSearch && matchesHouse && matchesParty
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/" className="hover:text-blue-600">ホーム</Link>
          <span>/</span>
          <span>議員検索</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">議員検索</h1>
        <p className="text-gray-500">発言記録・プロフィールを参照できます</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="議員名・政党名・選挙区で検索..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* House filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">議院：</span>
          <div className="flex gap-1">
            {HOUSES.map(h => (
              <button
                key={h.key}
                onClick={() => setSelectedHouse(h.key)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  selectedHouse === h.key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* Party filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 font-medium">政党：</span>
          <button
            onClick={() => setSelectedParty('all')}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              selectedParty === 'all'
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            すべて
          </button>
          {PARTIES.map(p => {
            const color = getPartyColor(p.name)
            return (
              <button
                key={p.name}
                onClick={() => setSelectedParty(selectedParty === p.name ? 'all' : p.name)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                  selectedParty === p.name
                    ? 'text-white'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
                style={selectedParty === p.name ? { backgroundColor: color, borderColor: color } : {}}
              >
                {p.shortName}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results */}
      <div className="mb-3 text-sm text-gray-500">
        {filtered.length}名 / 全{MOCK_MEMBERS.length}名を表示
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length > 0
          ? filtered.map(m => <MemberCard key={m.id} member={m} />)
          : (
            <div className="col-span-3 py-16 text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>該当する議員が見つかりません</p>
            </div>
          )
        }
      </div>
    </div>
  )
}
