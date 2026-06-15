import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="text-xl font-bold mb-2">
              <span className="text-blue-400">国会</span>
              <span className="text-white">議事録</span>
            </div>
            <p className="text-sm text-navy-400">
              一次情報から、日本の政治を理解するプラットフォーム
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">国会情報</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shugiin" className="hover:text-white transition-colors">衆議院</Link></li>
              <li><Link href="/sangin" className="hover:text-white transition-colors">参議院</Link></li>
              <li><Link href="/press-conference" className="hover:text-white transition-colors">記者会見</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">調べる</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/members" className="hover:text-white transition-colors">議員検索</Link></li>
              <li><Link href="/policy-compare" className="hover:text-white transition-colors">政策比較</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">全文検索</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">サイトについて</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/policy" className="hover:text-white transition-colors">編集方針</Link></li>
              <li><Link href="/about/sources" className="hover:text-white transition-colors">掲載基準</Link></li>
              <li><Link href="/about/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
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
