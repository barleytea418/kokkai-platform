'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MOCK_PRESS_CONFERENCES } from '@/data/mock-press'
import { PartyBadge } from '@/components/PartyBadge'
import { formatDate, getPartyColor } from '@/lib/utils'
import { useState } from 'react'

export default function PressConferenceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'video'>('summary')
  const conference = MOCK_PRESS_CONFERENCES.find(p => p.id === id)

  if (!conference) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">記者会見が見つかりません</h1>
        <Link href="/press-conference" className="text-blue-600 hover:underline">一覧に戻る</Link>
      </div>
    )
  }

  const color = getPartyColor(conference.party)
  const tabs = [
    { key: 'summary' as const, label: 'AI要約', icon: '🤖' },
    { key: 'transcript' as const, label: '文字起こし', icon: '📄' },
    ...(conference.youtubeVideoId ? [{ key: 'video' as const, label: '動画', icon: '🎬' }] : []),
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">ホーム</Link>
        <span>/</span>
        <Link href="/press-conference" className="hover:text-blue-600">記者会見</Link>
        <span>/</span>
        <span className="text-gray-800 truncate">{conference.title}</span>
      </div>

      {/* Conference header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            {conference.speakerName.slice(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{conference.speakerName}</h1>
              <PartyBadge party={conference.party} />
            </div>
            <p className="text-sm text-gray-500">{conference.position}</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">{conference.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{formatDate(conference.date)} · 約{conference.duration}分</p>

        <div className="flex flex-wrap gap-2">
          {conference.topics.map(t => (
            <span key={t} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'summary' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
            <span className="text-xl">🤖</span>
            <div>
              <h3 className="font-bold text-gray-900">AI生成要約</h3>
              <p className="text-xs text-gray-400">発言内容をもとに要点を整理しています</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {conference.summary}
          </p>
        </div>
      )}

      {activeTab === 'transcript' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100">
            発言文字起こし
          </h3>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-mono">
            {conference.transcript}
            <div className="mt-6 text-gray-400 text-center border-t border-gray-200 pt-4 text-xs not-italic">
              （続き：動画タブよりご確認ください）
            </div>
          </div>
        </div>
      )}

      {activeTab === 'video' && conference.youtubeVideoId && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="aspect-video bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${conference.youtubeVideoId}`}
              title="記者会見動画"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}
