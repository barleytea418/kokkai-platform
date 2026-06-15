'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MOCK_MEMBERS } from '@/data/mock-members'
import { MOCK_RECORDS } from '@/data/mock-records'
import { PartyBadge } from '@/components/PartyBadge'
import { RecordCard } from '@/components/RecordCard'
import { getPartyColor, houseLabel } from '@/lib/utils'

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>()
  const member = MOCK_MEMBERS.find(m => m.id === id)

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">議員が見つかりません</h1>
        <Link href="/members" className="text-blue-600 hover:underline">議員一覧に戻る</Link>
      </div>
    )
  }

  const color = getPartyColor(member.party)
  const relatedRecords = MOCK_RECORDS.filter(r =>
    r.speakers.some(s => s.name === member.name)
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">ホーム</Link>
        <span>/</span>
        <Link href="/members" className="hover:text-blue-600">議員検索</Link>
        <span>/</span>
        <span className="text-gray-800">{member.name}</span>
      </div>

      {/* Profile header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="h-2" style={{ backgroundColor: color }} />
        <div className="p-6">
          <div className="flex items-start gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {member.name.slice(0, 1)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
                  <p className="text-gray-400 text-sm">{member.nameKana}</p>
                </div>
                <PartyBadge party={member.party} />
              </div>
              {member.position && (
                <p className="text-gray-600 mt-1">{member.position}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span>{houseLabel(member.house)}</span>
                <span>{member.constituency}</span>
                <span>当選{member.electedTimes}回</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{member.speechCount}</div>
              <div className="text-xs text-gray-400">発言回数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{member.billsProposed}</div>
              <div className="text-xs text-gray-400">提出法案</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{member.committees.length}</div>
              <div className="text-xs text-gray-400">所属委員会</div>
            </div>
          </div>
        </div>
      </div>

      {/* Committees */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-bold text-gray-900 mb-3">所属委員会</h2>
        <div className="flex flex-wrap gap-2">
          {member.committees.map(c => (
            <span key={c} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Related records */}
      {relatedRecords.length > 0 && (
        <div>
          <h2 className="font-bold text-gray-900 mb-4">関連する議事録</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedRecords.map(r => <RecordCard key={r.id} record={r} />)}
          </div>
        </div>
      )}
    </div>
  )
}
