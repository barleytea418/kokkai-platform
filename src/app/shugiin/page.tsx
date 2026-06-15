'use client'
import { useState } from 'react'
import Link from 'next/link'
import { RecordCard } from '@/components/RecordCard'
import { SearchBox } from '@/components/SearchBox'
import { getRecordsByHouse } from '@/data/mock-records'
import { SHUGIIN_COMMITTEES } from '@/data/parties'

const COMMITTEE_ICONS: Record<string, string> = {
  '予算委員会': '💰',
  '内閣委員会': '🏛️',
  '総務委員会': '📋',
  '法務委員会': '⚖️',
  '外務委員会': '🌐',
  '財務金融委員会': '💴',
  '文部科学委員会': '📚',
  '厚生労働委員会': '🏥',
  '農林水産委員会': '🌾',
  '経済産業委員会': '🏭',
  '国土交通委員会': '🚄',
  '環境委員会': '🌿',
  '安全保障委員会': '🛡️',
  '憲法審査会': '📜',
}

export default function ShugiinPage() {
  const [activeTab, setActiveTab] = useState<'plenary' | 'committee'>('plenary')
  const records = getRecordsByHouse('shugiin')
  const plenary = records.filter(r => r.type === 'plenary')
  const committees = records.filter(r => r.type === 'committee')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/" className="hover:text-blue-600">ホーム</Link>
          <span>/</span>
          <span>衆議院</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">衆議院</h1>
            <p className="text-gray-500">本会議・28委員会の議事録を掲載</p>
          </div>
          <div className="hidden md:flex items-center gap-3 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">465</div>
              <div className="text-gray-400">議席</div>
            </div>
            <div className="text-gray-200">|</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">28</div>
              <div className="text-gray-400">委員会</div>
            </div>
            <div className="text-gray-200">|</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">216</div>
              <div className="text-gray-400">第〇回国会</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <SearchBox placeholder="衆議院の議事録を検索..." size="sm" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('plenary')}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'plenary'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          本会議
          <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
            {plenary.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('committee')}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'committee'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          委員会
          <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
            28
          </span>
        </button>
      </div>

      {activeTab === 'plenary' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {plenary.length > 0
              ? plenary.map(r => <RecordCard key={r.id} record={r} />)
              : (
                <div className="col-span-3 text-center py-12 text-gray-400">
                  本会議の議事録がありません
                </div>
              )
            }
          </div>
        </div>
      )}

      {activeTab === 'committee' && (
        <div>
          {/* Committee grid */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">委員会一覧</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {SHUGIIN_COMMITTEES.map(name => {
                const icon = COMMITTEE_ICONS[name] ?? '📌'
                const hasRecords = committees.some(r => r.committee === name)
                return (
                  <button
                    key={name}
                    className={`text-left p-3 rounded-lg border transition-all text-sm ${
                      hasRecords
                        ? 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-sm cursor-pointer'
                        : 'bg-gray-50 border-gray-100 text-gray-400 cursor-default'
                    }`}
                  >
                    <span className="mr-1.5">{icon}</span>
                    {name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Committee records */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">最近の委員会議事録</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {committees.length > 0
                ? committees.map(r => <RecordCard key={r.id} record={r} />)
                : (
                  <div className="col-span-3 text-center py-12 text-gray-400">
                    委員会の議事録がありません
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
