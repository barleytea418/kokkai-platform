import Link from 'next/link'
import { SearchBox } from '@/components/SearchBox'
import { RecordCard } from '@/components/RecordCard'
import { NewsCard } from '@/components/NewsCard'
import { PressCard } from '@/components/PressCard'
import { getLatestRecords } from '@/data/mock-records'
import { MOCK_NEWS, MOCK_PRESS_CONFERENCES } from '@/data/mock-press'

const QUICK_LINKS = [
  { href: '/shugiin', label: '衆議院', icon: '🏛️', desc: '本会議・28委員会' },
  { href: '/sangin', label: '参議院', icon: '⚖️', desc: '本会議・20委員会' },
  { href: '/press-conference', label: '記者会見', icon: '🎙️', desc: '各党代表・閣僚' },
  { href: '/members', label: '議員検索', icon: '👥', desc: '発言・プロフィール' },
  {
    href: '/policy-compare',
    label: '政策比較',
    label2: 'テーマ別',
    icon: '📊',
    desc: '各党の立場を比較',
  },
  { href: '/search', label: '全文検索', icon: '🔍', desc: '議事録を横断検索' },
]

export default function HomePage() {
  const latestRecords = getLatestRecords(4)
  const latestNews = MOCK_NEWS.slice(0, 5)
  const latestPress = MOCK_PRESS_CONFERENCES.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            一次情報から、日本の政治を理解する
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-navy-300 md:text-lg">
            議事録・記者会見・採決結果を直接参照。
            <br className="hidden sm:block" />
            ニュース記事に頼らず、政治家の実際の発言と立場を確認できます。
          </p>
          <div className="mx-auto max-w-2xl">
            <SearchBox />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-navy-400">
            <span>例：</span>
            {['補正予算', '防衛費', 'マイナンバー', '最低賃金', '少子化対策'].map((kw) => (
              <Link
                key={kw}
                href={`/search?q=${encodeURIComponent(kw)}`}
                className="underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                {kw}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neutrality banner */}
      <div className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 text-sm text-blue-700">
          <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            掲載基準を公開中。議席を持つ全政党を同一フォーマットで掲載。特定政党の優遇はありません。
          </span>
          <Link href="/about/policy" className="flex-shrink-0 underline hover:text-blue-900">
            編集方針を見る
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Quick links */}
        <section className="mb-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-gray-200 bg-white p-4 text-center transition-all duration-200 hover:border-blue-400 hover:shadow-md"
              >
                <div className="mb-2 text-2xl">{item.icon}</div>
                <div className="mb-1 text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                  {item.label}
                </div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Latest records */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">最新の議事録</h2>
              <div className="flex gap-2">
                <Link href="/shugiin" className="text-sm text-blue-600 hover:underline">
                  衆議院
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/sangin" className="text-sm text-blue-600 hover:underline">
                  参議院
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {latestRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/shugiin"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                もっと見る
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar: News + Press */}
          <div className="space-y-8">
            {/* Latest news */}
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
                <span className="h-5 w-1 rounded-full bg-blue-500"></span>
                最新ニュース
              </h2>
              {latestNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </section>

            {/* Latest press */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <span className="h-5 w-1 rounded-full bg-red-500"></span>
                  最新の記者会見
                </h2>
                <Link href="/press-conference" className="text-sm text-blue-600 hover:underline">
                  一覧
                </Link>
              </div>
              <div className="space-y-3">
                {latestPress.map((conf) => (
                  <PressCard key={conf.id} conference={conf} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
