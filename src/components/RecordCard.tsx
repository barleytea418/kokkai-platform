import Link from 'next/link'
import { DiaryRecord } from '@/types'
import { formatDate, houseLabel, recordTypeLabel } from '@/lib/utils'
import { PartyBadge } from './PartyBadge'

interface Props {
  record: DiaryRecord
  compact?: boolean
}

export function RecordCard({ record, compact }: Props) {
  const houseBg =
    record.house === 'shugiin'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-green-50 text-green-700 border-green-200'

  return (
    <Link href={`/records/${record.id}`}>
      <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-blue-400 hover:shadow-md">
        <div className="p-5">
          {/* Header badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded border px-2 py-0.5 text-xs font-semibold ${houseBg}`}>
              {houseLabel(record.house)}
            </span>
            <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
              {recordTypeLabel(record.type)}
              {record.committee && ` / ${record.committee}`}
            </span>
            {record.votes && (
              <span
                className={`rounded border px-2 py-0.5 text-xs font-semibold ${
                  record.votes.passed
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}
              >
                {record.votes.passed ? '可決' : '否決'}
              </span>
            )}
          </div>

          {/* Date */}
          <p className="mb-1 text-xs text-gray-400">{formatDate(record.date)}</p>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {record.title}
          </h3>

          {/* Topics */}
          <div className="mb-3 flex flex-wrap gap-1">
            {record.topics.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {t}
              </span>
            ))}
          </div>

          {!compact && (
            <>
              {/* Summary */}
              <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                {record.summary.split('\n')[0]}
              </p>

              {/* Speakers */}
              <div className="flex flex-wrap gap-1.5 border-t border-gray-100 pt-3">
                {record.speakers.slice(0, 3).map((s) => (
                  <div key={s.name} className="flex items-center gap-1">
                    <PartyBadge party={s.party} size="sm" />
                    <span className="text-xs text-gray-600">{s.name}</span>
                  </div>
                ))}
                {record.speakers.length > 3 && (
                  <span className="text-xs text-gray-400">+{record.speakers.length - 3}名</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Vote result bar */}
        {record.votes && (
          <div className="px-5 pb-4">
            <div className="flex h-1.5 gap-1 overflow-hidden rounded-full">
              <div
                className="h-full bg-blue-500"
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
            <div className="mt-1 flex gap-3 text-xs text-gray-400">
              <span className="text-blue-500">賛成 {record.votes.yes}</span>
              <span className="text-red-400">反対 {record.votes.no}</span>
              {record.votes.abstain > 0 && <span>棄権 {record.votes.abstain}</span>}
            </div>
          </div>
        )}
      </article>
    </Link>
  )
}
