import { PARTY_COLORS } from '@/data/parties'

export function getPartyColor(party: string): string {
  return PARTY_COLORS[party] ?? '#6B7280'
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function houseLabel(house: 'shugiin' | 'sangin'): string {
  return house === 'shugiin' ? '衆議院' : '参議院'
}

export function recordTypeLabel(type: string): string {
  switch (type) {
    case 'plenary':
      return '本会議'
    case 'committee':
      return '委員会'
    case 'special':
      return '特別委員会'
    default:
      return type
  }
}

export function clsx(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
