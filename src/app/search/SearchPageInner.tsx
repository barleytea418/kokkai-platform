'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SearchBox } from '@/components/SearchBox'
import { RecordCard } from '@/components/RecordCard'
import { MemberCard } from '@/components/MemberCard'
import { PressCard } from '@/components/PressCard'
import { MOCK_RECORDS } from '@/data/mock-records'
import { MOCK_MEMBERS } from '@/data/mock-members'
import { MOCK_PRESS_CONFERENCES } from '@/data/mock-press'

export default function SearchPageInner() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const matchedRecords = MOCK_RECORDS.filter(
    (r) =>
      query &&
      (r.title.includes(query) ||
        r.summary.includes(query) ||
        r.topics.some((t) => t.includes(query)) ||
        r.keywords.some((k) => k.includes(query)) ||
        r.fullText.includes(query))
  )

  const matchedMembers = MOCK_MEMBERS.filter(
    (m) =>
      query &&
      (m.name.includes(query) ||
        m.party.includes(query) ||
        m.constituency.includes(query) ||
        (m.position && m.position.includes(query)))
  )

  const matchedPress = MOCK_PRESS_CONFERENCES.filter(
    (p) =>
      query &&
      (p.title.includes(query) ||
        p.summary.includes(query) ||
        p.topics.some((t) => t.includes(query)) ||
        p.transcript.includes(query))
  )

  const totalCount = matchedRecords.length + matchedMembers.length + matchedPress.length

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            ホーム
          </Link>
          <span>/</span>
          <span>検索</span>
        </div>
        <SearchBox initialValue={query} />
      </div>

      {query ? (
        <>
          <div className="mb-6 text-sm text-gray-500">
            「<strong className="text-gray-800">{query}</strong>」の検索結果：{totalCount}件
          </div>

          {matchedRecords.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="h-5 w-1 rounded-full bg-blue-500" />
                議事録 ({matchedRecords.length}件)
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {matchedRecords.map((r) => (
                  <RecordCard key={r.id} record={r} />
                ))}
              </div>
            </section>
          )}

          {matchedPress.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="h-5 w-1 rounded-full bg-red-500" />
                記者会見 ({matchedPress.length}件)
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {matchedPress.map((p) => (
                  <PressCard key={p.id} conference={p} />
                ))}
              </div>
            </section>
          )}

          {matchedMembers.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="h-5 w-1 rounded-full bg-purple-500" />
                議員 ({matchedMembers.length}名)
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {matchedMembers.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            </section>
          )}

          {totalCount === 0 && (
            <div className="py-16 text-center">
              <svg
                className="mx-auto mb-4 h-16 w-16 text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="mb-2 text-gray-500">「{query}」に一致する結果が見つかりませんでした</p>
              <p className="text-sm text-gray-400">別のキーワードで検索してみてください</p>
            </div>
          )}
        </>
      ) : (
        <div className="py-16 text-center text-gray-400">
          <p className="text-lg">キーワードを入力して検索してください</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['補正予算', '防衛費', 'マイナンバー', '最低賃金', '少子化対策', '脱炭素'].map(
              (kw) => (
                <Link
                  key={kw}
                  href={`/search?q=${encodeURIComponent(kw)}`}
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  {kw}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
