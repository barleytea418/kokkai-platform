'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PressCard } from '@/components/PressCard'
import { MOCK_PRESS_CONFERENCES } from '@/data/mock-press'
import { PARTIES } from '@/data/parties'
import { getPartyColor } from '@/lib/utils'

export default function PressConferencePage() {
  const [selectedParty, setSelectedParty] = useState('all')

  const filtered = MOCK_PRESS_CONFERENCES.filter(
    (p) => selectedParty === 'all' || p.party === selectedParty
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            ホーム
          </Link>
          <span>/</span>
          <span>記者会見</span>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">記者会見</h1>
        <p className="text-gray-500">首相・大臣・各党代表の記者会見を文字起こし・AI要約で掲載</p>
      </div>

      {/* Party filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedParty('all')}
          className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
            selectedParty === 'all'
              ? 'border-gray-800 bg-gray-800 text-white'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
          }`}
        >
          すべて
        </button>
        {PARTIES.map((p) => {
          const color = getPartyColor(p.name)
          return (
            <button
              key={p.name}
              onClick={() => setSelectedParty(selectedParty === p.name ? 'all' : p.name)}
              className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                selectedParty === p.name
                  ? 'text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
              }`}
              style={selectedParty === p.name ? { backgroundColor: color, borderColor: color } : {}}
            >
              {p.shortName}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((conf) => <PressCard key={conf.id} conference={conf} />)
        ) : (
          <div className="col-span-3 py-16 text-center text-gray-400">記者会見が見つかりません</div>
        )}
      </div>
    </div>
  )
}
