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
  const member = MOCK_MEMBERS.find((m) => m.id === id)

  if (!member) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">議員が見つかりません</h1>
        <Link href="/members" className="text-blue-600 hover:underline">
          議員一覧に戻る
        </Link>
      </div>
    )
  }

  const color = getPartyColor(member.party)
  const relatedRecords = MOCK_RECORDS.filter((r) => r.speakers.some((s) => s.name === member.name))

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          ホーム
        </Link>
        <span>/</span>
        <Link href="/members" className="hover:text-blue-600">
          議員検索
        </Link>
        <span>/</span>
        <span className="text-gray-800">{member.name}</span>
      </div>

      {/* Profile header */}
      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="h-2" style={{ backgroundColor: color }} />
        <div className="p-6">
          <div className="flex items-start gap-5">
            <div
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-3xl font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {member.name.slice(0, 1)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
                  <p className="text-sm text-gray-400">{member.nameKana}</p>
                </div>
                <PartyBadge party={member.party} />
              </div>
              {member.position && <p className="mt-1 text-gray-600">{member.position}</p>}
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                <span>{houseLabel(member.house)}</span>
                <span>{member.constituency}</span>
                <span>当選{member.electedTimes}回</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-5">
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
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 font-bold text-gray-900">所属委員会</h2>
        <div className="flex flex-wrap gap-2">
          {member.committees.map((c) => (
            <span key={c} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Related records */}
      {relatedRecords.length > 0 && (
        <div>
          <h2 className="mb-4 font-bold text-gray-900">関連する議事録</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {relatedRecords.map((r) => (
              <RecordCard key={r.id} record={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
