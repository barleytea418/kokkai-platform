import Link from 'next/link'
import { DiaryRecord } from '@/types'
import { formatDate, houseLabel, recordTypeLabel } from '@/lib/utils'
import { PartyBadge } from './PartyBadge'

interface Props {
  record: DiaryRecord
  compact?: boolean
}

export function RecordCard({ record, compact }: Props) {
  const houseBg = record.house === 'shugiin'
    ? 'bg-blue-50 text-blue-700 border-blue-200'
    : 'bg-green-50 text-green-700 border-green-200'

  return (
    <Link href={`/records/${record.id}`}>
      <article className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 overflow-hidden group">
        <div className="p-5">
          {/* Header badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${houseBg}`}>
              {houseLabel(record.house)}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded border bg-gray-50 text-gray-600 border-gray-200">
              {recordTypeLabel(record.type)}
              {record.committee && ` / ${record.committee}`}
            </span>
            {record.votes && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                record.votes.passed
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {record.votes.passed ? '可決' : '否決'}
              </span>
            )}
          </div>

          {/* Date */}
          <p className="text-xs text-gray-400 mb-1">{formatDate(record.date)}</p>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {record.title}
          </h3>

          {/* Topics */}
          <div className="flex flex-wrap gap-1 mb-3">
            {record.topics.slice(0, 3).map(t => (
              <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {!compact && (
            <>
              {/* Summary */}
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {record.summary.split('\n')[0]}
              </p>

              {/* Speakers */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                {record.speakers.slice(0, 3).map(s => (
                  <div key={s.name} className="flex items-center gap-1">
                    <PartyBadge party={s.party} size="sm" />
                    <span className="text-xs text-gray-600">{s.name}</span>
                  </div>
                ))}
                {record.speakers.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{record.speakers.length - 3}名
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Vote result bar */}
        {record.votes && (
          <div className="px-5 pb-4">
            <div className="flex gap-1 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${(record.votes.yes / (record.votes.yes + record.votes.no + record.votes.abstain)) * 100}%` }}
              />
              <div
                className="bg-red-400 h-full"
                style={{ width: `${(record.votes.no / (record.votes.yes + record.votes.no + record.votes.abstain)) * 100}%` }}
              />
              <div
                className="bg-gray-200 h-full"
                style={{ width: `${(record.votes.abstain / (record.votes.yes + record.votes.no + record.votes.abstain)) * 100}%` }}
              />
            </div>
            <div className="flex gap-3 mt-1 text-xs text-gray-400">
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
