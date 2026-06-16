import { NewsArticle } from '@/types'
import { formatDateTime } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  政治: 'bg-blue-100 text-blue-700',
  経済: 'bg-green-100 text-green-700',
  安全保障: 'bg-red-100 text-red-700',
  外交: 'bg-purple-100 text-purple-700',
  社会: 'bg-orange-100 text-orange-700',
}

interface Props {
  article: NewsArticle
}

export function NewsCard({ article }: Props) {
  const categoryClass = CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600'

  return (
    <div className="-mx-2 flex gap-3 rounded border-b border-gray-100 px-2 py-3 transition-colors last:border-0 hover:bg-gray-50">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${categoryClass}`}>
            {article.category}
          </span>
          <span className="text-xs text-gray-400">{article.source}</span>
          <span className="text-xs text-gray-300">{formatDateTime(article.publishedAt)}</span>
        </div>
        <h4 className="mb-1 line-clamp-2 text-sm font-medium text-gray-800">{article.title}</h4>
        <p className="line-clamp-2 text-xs text-gray-500">{article.summary}</p>
      </div>
    </div>
  )
}
