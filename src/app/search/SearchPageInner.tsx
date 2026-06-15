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

  const matchedRecords = MOCK_RECORDS.filter(r =>
    query &&
    (r.title.includes(query) ||
    r.summary.includes(query) ||
    r.topics.some(t => t.includes(query)) ||
    r.keywords.some(k => k.includes(query)) ||
    r.fullText.includes(query))
  )

  const matchedMembers = MOCK_MEMBERS.filter(m =>
    query &&
    (m.name.includes(query) ||
    m.party.includes(query) ||
    m.constituency.includes(query) ||
    (m.position && m.position.includes(query)))
  )

  const matchedPress = MOCK_PRESS_CONFERENCES.filter(p =>
    query &&
    (p.title.includes(query) ||
    p.summary.includes(query) ||
    p.topics.some(t => t.includes(query)) ||
    p.transcript.includes(query))
  )

  const totalCount = matchedRecords.length + matchedMembers.length + matchedPress.length

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600">ホーム</Link>
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
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full" />
                議事録 ({matchedRecords.length}件)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {matchedRecords.map(r => <RecordCard key={r.id} record={r} />)}
              </div>
            </section>
          )}

          {matchedPress.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-red-500 rounded-full" />
                記者会見 ({matchedPress.length}件)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {matchedPress.map(p => <PressCard key={p.id} conference={p} />)}
              </div>
            </section>
          )}

          {matchedMembers.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-500 rounded-full" />
                議員 ({matchedMembers.length}名)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {matchedMembers.map(m => <MemberCard key={m.id} member={m} />)}
              </div>
            </section>
          )}

          {totalCount === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-500 mb-2">「{query}」に一致する結果が見つかりませんでした</p>
              <p className="text-sm text-gray-400">別のキーワードで検索してみてください</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">キーワードを入力して検索してください</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['補正予算', '防衛費', 'マイナンバー', '最低賃金', '少子化対策', '脱炭素'].map(kw => (
              <Link
                key={kw}
                href={`/search?q=${encodeURIComponent(kw)}`}
                className="text-sm bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 px-3 py-1.5 rounded-full transition-colors"
              >
                {kw}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
