import Link from 'next/link'
import { PressConference } from '@/types'
import { PartyBadge } from './PartyBadge'
import { formatDate, getPartyColor } from '@/lib/utils'

interface Props {
  conference: PressConference
}

export function PressCard({ conference }: Props) {
  const color = getPartyColor(conference.party)

  return (
    <Link href={`/press-conference/${conference.id}`}>
      <article className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 overflow-hidden group">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {conference.speakerName.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {conference.speakerName}
                </span>
                <PartyBadge party={conference.party} size="sm" />
              </div>
              <p className="text-xs text-gray-500">{conference.position}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-1">{formatDate(conference.date)}</p>
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
            {conference.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
            {conference.summary}
          </p>

          <div className="flex flex-wrap gap-1">
            {conference.topics.map(t => (
              <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {conference.youtubeVideoId && (
          <div className="px-5 pb-4">
            <div className="flex items-center gap-1.5 text-xs text-red-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.71a8.27 8.27 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z"/>
              </svg>
              動画あり · {conference.duration}分
            </div>
          </div>
        )}
      </article>
    </Link>
  )
}
