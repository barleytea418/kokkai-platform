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
      <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 p-4 group">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {member.name}
              </h3>
              <span className="text-xs text-gray-400">{member.nameKana}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              <PartyBadge party={member.party} size="sm" />
              <span className="text-xs text-gray-500">
                {member.house === 'shugiin' ? '衆' : '参'} · {member.constituency}
              </span>
            </div>
            {member.position && (
              <p className="text-xs text-gray-600 mb-2">{member.position}</p>
            )}
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
