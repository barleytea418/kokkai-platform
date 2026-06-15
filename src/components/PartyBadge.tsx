import { getPartyColor } from '@/lib/utils'

interface Props {
  party: string
  size?: 'sm' | 'md'
}

export function PartyBadge({ party, size = 'md' }: Props) {
  const color = getPartyColor(party)
  const textSize = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2 py-1'

  return (
    <span
      className={`inline-flex items-center rounded font-medium ${textSize}`}
      style={{ backgroundColor: color + '18', color, border: `1px solid ${color}40` }}
    >
      {party}
    </span>
  )
}
