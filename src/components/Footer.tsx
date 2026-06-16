import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-16 bg-navy-950 text-navy-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-2 text-xl font-bold">
              <span className="text-blue-400">国会</span>
              <span className="text-white">議事録</span>
            </div>
            <p className="text-sm text-navy-400">
              一次情報から、日本の政治を理解するプラットフォーム
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">国会情報</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shugiin" className="transition-colors hover:text-white">
                  衆議院
                </Link>
              </li>
              <li>
                <Link href="/sangin" className="transition-colors hover:text-white">
                  参議院
                </Link>
              </li>
              <li>
                <Link href="/press-conference" className="transition-colors hover:text-white">
                  記者会見
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">調べる</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/members" className="transition-colors hover:text-white">
                  議員検索
                </Link>
              </li>
              <li>
                <Link href="/policy-compare" className="transition-colors hover:text-white">
                  政策比較
                </Link>
              </li>
              <li>
                <Link href="/search" className="transition-colors hover:text-white">
                  全文検索
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">サイトについて</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about/policy" className="transition-colors hover:text-white">
                  編集方針
                </Link>
              </li>
              <li>
                <Link href="/about/sources" className="transition-colors hover:text-white">
                  掲載基準
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="transition-colors hover:text-white">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-navy-700 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-navy-500">
            掲載情報は衆議院・参議院の公式サイトを一次情報としています。
            特定政党の優遇はなく、編集方針は公開しています。
          </p>
          <p className="text-xs text-navy-600">© 2026 国会議事録プラットフォーム</p>
        </div>
      </div>
    </footer>
  )
}
