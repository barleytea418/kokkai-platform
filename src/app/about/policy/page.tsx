import Link from 'next/link'

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">ホーム</Link>
        <span>/</span>
        <span>編集方針</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">編集方針</h1>
      <p className="text-gray-500 mb-10">最終更新：2026年6月14日 · バージョン 1.0</p>

      <div className="prose max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. 中立性確保の4つの観点</h2>

          <div className="space-y-4">
            {[
              {
                title: '情報収集・掲載ルール',
                body: '同一フォーマット・同一順序で全政党の情報を掲載します。掲載基準は議席数（衆議院・参議院に議席を持つ政党または直近の国政選挙で全国得票率1%以上）に基づきます。政党・候補者によるセルフ記入制度は採用していません。',
              },
              {
                title: '表現・言語ルール',
                body: '公式文書からの引用が原則です。評価的表現（「現実的」「過激」など）は使用しません。数値・データは必ず出典を明示します。',
              },
              {
                title: '構造・UIレベル',
                body: '掲載順序は機械的ルール（議席数順など）に基づきます。デザインは全政党に同一のものを使用します。ランキング表示はありません。',
              },
              {
                title: 'ガバナンス',
                body: '編集方針は公開し、年1回以上見直します。異議申し立て窓口を設置し、5営業日以内に回答します。編集委員会が監査を実施します。',
              },
            ].map(item => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. 掲載対象基準</h2>
          <p className="text-sm text-gray-600 mb-3">以下の政治団体を掲載対象とします：</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>衆議院・参議院に議席を持つ政党</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>直近の国政選挙で全国得票率1%以上を獲得した政治団体</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. AI要約について</h2>
          <p className="text-sm text-gray-600 mb-3">
            議事録・記者会見のAI要約は、一次情報（公式議事録）をもとに生成されます。
            要約には以下の制限があります：
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">!</span>AIによる要約は誤りや省略を含む可能性があります</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">!</span>必ず一次情報（公式議事録）をご確認ください</li>
            <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">!</span>評価・解釈を含む表現は除外するよう設計されています</li>
          </ul>
        </section>

        <section className="bg-blue-50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">異議申し立て・お問い合わせ</h2>
          <p className="text-sm text-gray-600 mb-4">
            掲載内容に誤りや偏りを発見した場合は、お問い合わせフォームからご連絡ください。
            5営業日以内に対応します。
          </p>
          <Link
            href="/about/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            お問い合わせフォームへ
          </Link>
        </section>
      </div>
    </div>
  )
}
