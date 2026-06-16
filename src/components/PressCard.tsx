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
      <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-blue-400 hover:shadow-md">
        <div className="p-5">
          <div className="mb-3 flex items-center gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {conference.speakerName.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                  {conference.speakerName}
                </span>
                <PartyBadge party={conference.party} size="sm" />
              </div>
              <p className="text-xs text-gray-500">{conference.position}</p>
            </div>
          </div>

          <p className="mb-1 text-xs text-gray-400">{formatDate(conference.date)}</p>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900">
            {conference.title}
          </h3>

          <p className="mb-3 line-clamp-3 text-sm text-gray-600">{conference.summary}</p>

          <div className="flex flex-wrap gap-1">
            {conference.topics.map((t) => (
              <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {t}
              </span>
            ))}
          </div>
        </div>

        {conference.youtubeVideoId && (
          <div className="px-5 pb-4">
            <div className="flex items-center gap-1.5 text-xs text-red-500">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.71a8.27 8.27 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z" />
              </svg>
              動画あり · {conference.duration}分
            </div>
          </div>
        )}
      </article>
    </Link>
  )
}
