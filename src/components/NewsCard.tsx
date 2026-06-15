import { NewsArticle } from '@/types'
import { formatDateTime } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  '政治': 'bg-blue-100 text-blue-700',
  '経済': 'bg-green-100 text-green-700',
  '安全保障': 'bg-red-100 text-red-700',
  '外交': 'bg-purple-100 text-purple-700',
  '社会': 'bg-orange-100 text-orange-700',
}

interface Props {
  article: NewsArticle
}

export function NewsCard({ article }: Props) {
  const categoryClass = CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600'

  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${categoryClass}`}>
            {article.category}
          </span>
          <span className="text-xs text-gray-400">{article.source}</span>
          <span className="text-xs text-gray-300">
            {formatDateTime(article.publishedAt)}
          </span>
        </div>
        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
          {article.title}
        </h4>
        <p className="text-xs text-gray-500 line-clamp-2">{article.summary}</p>
      </div>
    </div>
  )
}
