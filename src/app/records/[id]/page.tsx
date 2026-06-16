'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getRecord } from '@/data/mock-records'
import { PartyBadge } from '@/components/PartyBadge'
import { formatDate, houseLabel, recordTypeLabel } from '@/lib/utils'

type Tab = 'summary' | 'full' | 'speeches' | 'video'

export default function RecordDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<Tab>('summary')
  const record = getRecord(id)

  if (!record) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">議事録が見つかりません</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          ホームに戻る
        </Link>
      </div>
    )
  }

  const houseBg = record.house === 'shugiin' ? 'bg-blue-600' : 'bg-green-600'

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'summary', label: '3分要約', icon: '🤖' },
    { key: 'full', label: '全議事録', icon: '📄' },
    { key: 'speeches', label: '議員別発言', icon: '👥' },
    ...(record.youtubeVideoId ? [{ key: 'video' as Tab, label: '動画', icon: '🎬' }] : []),
  ]

  const summaryLines = record.summary.split('\n').filter(Boolean)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          ホーム
        </Link>
        <span>/</span>
        <Link href={`/${record.house}`} className="hover:text-blue-600">
          {houseLabel(record.house)}
        </Link>
        <span>/</span>
        <span className="truncate text-gray-800">{record.title}</span>
      </div>

      {/* Record header */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded px-2.5 py-1 text-xs font-semibold text-white ${houseBg}`}>
            {houseLabel(record.house)}
          </span>
          <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
            {recordTypeLabel(record.type)}
            {record.committee && ` / ${record.committee}`}
          </span>
          <span className="text-xs text-gray-400">第{record.sessionNumber}回国会</span>
        </div>

        <h1 className="mb-2 text-xl font-bold text-gray-900">{record.title}</h1>
        <p className="mb-4 text-sm text-gray-500">{formatDate(record.date)}</p>

        {/* Topics */}
        <div className="mb-4 flex flex-wrap gap-2">
          {record.topics.map((t) => (
            <span
              key={t}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Vote result */}
        {record.votes && (
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-3">
              <span
                className={`rounded px-2.5 py-1 text-sm font-semibold ${
                  record.votes.passed
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {record.votes.passed ? '✓ 可決' : '✗ 否決'}
              </span>
              <span className="text-sm text-gray-600">
                賛成 {record.votes.yes}　反対 {record.votes.no}
                {record.votes.abstain > 0 && `　棄権 ${record.votes.abstain}`}
              </span>
            </div>
            <div className="flex h-2 gap-1 overflow-hidden rounded-full">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{
                  width: `${(record.votes.yes / (record.votes.yes + record.votes.no + record.votes.abstain)) * 100}%`,
                }}
              />
              <div
                className="h-full bg-red-400"
                style={{
                  width: `${(record.votes.no / (record.votes.yes + record.votes.no + record.votes.abstain)) * 100}%`,
                }}
              />
              <div
                className="h-full bg-gray-200"
                style={{
                  width: `${(record.votes.abstain / (record.votes.yes + record.votes.no + record.votes.abstain)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
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

      {/* Tab content */}
      {activeTab === 'summary' && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
            <span className="text-xl">🤖</span>
            <div>
              <h2 className="font-bold text-gray-900">AI生成要約（3分で読める）</h2>
              <p className="text-xs text-gray-400">議事録の全文をもとに要点を整理しています</p>
            </div>
          </div>

          <div className="prose-kokkai max-w-none">
            {summaryLines.map((line, i) => {
              if (line.startsWith('【') && line.endsWith('】')) {
                return (
                  <h3 key={i} className="mb-2 mt-5 text-base font-bold text-gray-800">
                    {line}
                  </h3>
                )
              }
              if (line.startsWith('①') || line.startsWith('②') || line.startsWith('③')) {
                return (
                  <div key={i} className="mb-2 flex gap-2 text-sm text-gray-700">
                    <span className="flex-shrink-0 font-bold text-blue-600">{line[0]}</span>
                    <span>{line.slice(1)}</span>
                  </div>
                )
              }
              return (
                <p key={i} className="mb-3 text-sm leading-relaxed text-gray-700">
                  {line}
                </p>
              )
            })}
          </div>

          {/* Keywords */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              主なキーワード
            </h3>
            <div className="flex flex-wrap gap-2">
              {record.keywords.map((kw) => (
                <Link
                  key={kw}
                  href={`/search?q=${encodeURIComponent(kw)}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  {kw}
                </Link>
              ))}
            </div>
          </div>

          {/* Source link */}
          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400">
            <span>一次情報源：衆議院公式サイト（議事録）</span>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:underline"
            >
              原文を確認
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      )}

      {activeTab === 'full' && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="font-bold text-gray-900">全議事録</h2>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-500 hover:underline"
            >
              公式サイトで見る
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
          <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-sm leading-relaxed text-gray-700">
            {record.fullText}
            <div className="mt-6 border-t border-gray-200 pt-4 text-center text-gray-400">
              （続き：公式サイトでご確認ください）
            </div>
          </div>
        </div>
      )}

      {activeTab === 'speeches' && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 border-b border-gray-100 pb-4 font-bold text-gray-900">
            議員別発言一覧
          </h2>
          <div className="space-y-4">
            {record.speakers.map((speaker, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
                  {speaker.name.slice(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-gray-900">{speaker.name}</span>
                    <PartyBadge party={speaker.party} size="sm" />
                    <span className="text-xs text-gray-400">{speaker.position}</span>
                  </div>
                  <p className="text-xs text-gray-500">発言回数：{speaker.speechCount}回</p>
                </div>
                <Link
                  href={`/members?q=${encodeURIComponent(speaker.name)}`}
                  className="flex-shrink-0 text-xs text-blue-600 hover:underline"
                >
                  議員情報
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'video' && record.youtubeVideoId && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="aspect-video bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${record.youtubeVideoId}`}
              title="国会審議動画"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500">
              ※ 動画は衆議院インターネット審議中継または各党公式YouTubeより提供されています。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
