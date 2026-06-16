import Link from 'next/link'

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          ホーム
        </Link>
        <span>/</span>
        <span>編集方針</span>
      </div>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">編集方針</h1>
      <p className="mb-10 text-gray-500">最終更新：2026年6月14日 · バージョン 1.0</p>

      <div className="prose max-w-none space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">1. 中立性確保の4つの観点</h2>

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
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-gray-50 p-5">
                <h3 className="mb-2 font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">2. 掲載対象基準</h2>
          <p className="mb-3 text-sm text-gray-600">以下の政治団体を掲載対象とします：</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-500">•</span>衆議院・参議院に議席を持つ政党
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-500">•</span>
              直近の国政選挙で全国得票率1%以上を獲得した政治団体
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">3. AI要約について</h2>
          <p className="mb-3 text-sm text-gray-600">
            議事録・記者会見のAI要約は、一次情報（公式議事録）をもとに生成されます。
            要約には以下の制限があります：
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-orange-500">!</span>
              AIによる要約は誤りや省略を含む可能性があります
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-orange-500">!</span>
              必ず一次情報（公式議事録）をご確認ください
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-orange-500">!</span>
              評価・解釈を含む表現は除外するよう設計されています
            </li>
          </ul>
        </section>

        <section className="rounded-xl bg-blue-50 p-6">
          <h2 className="mb-2 text-lg font-bold text-gray-900">異議申し立て・お問い合わせ</h2>
          <p className="mb-4 text-sm text-gray-600">
            掲載内容に誤りや偏りを発見した場合は、お問い合わせフォームからご連絡ください。
            5営業日以内に対応します。
          </p>
          <Link
            href="/about/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            お問い合わせフォームへ
          </Link>
        </section>
      </div>
    </div>
  )
}
