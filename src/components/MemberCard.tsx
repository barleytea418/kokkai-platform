import Link from 'next/link'
import { Member } from '@/types'
import { PartyBadge } from './PartyBadge'
import { getPartyColor } from '@/lib/utils'

interface Props {
  member: Member
}

export function MemberCard({ member }: Props) {
  const color = getPartyColor(member.party)
  const initials = member.name.slice(0, 1)

  return (
    <Link href={`/members/${member.id}`}>
      <div className="group rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-400 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                {member.name}
              </h3>
              <span className="text-xs text-gray-400">{member.nameKana}</span>
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              <PartyBadge party={member.party} size="sm" />
              <span className="text-xs text-gray-500">
                {member.house === 'shugiin' ? '衆' : '参'} · {member.constituency}
              </span>
            </div>
            {member.position && <p className="mb-2 text-xs text-gray-600">{member.position}</p>}
            <div className="flex gap-3 text-xs text-gray-400">
              <span>当選{member.electedTimes}回</span>
              <span>発言{member.speechCount}回</span>
              <span>提出法案{member.billsProposed}件</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
