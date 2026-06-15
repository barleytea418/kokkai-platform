'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PartyBadge } from '@/components/PartyBadge'
import { getPartyColor } from '@/lib/utils'

const TOPICS = [
  { id: 'economy', label: '経済・賃金', icon: '💰' },
  { id: 'social', label: '社会保障', icon: '🏥' },
  { id: 'education', label: '教育', icon: '📚' },
  { id: 'defense', label: '外交・防衛', icon: '🛡️' },
  { id: 'energy', label: 'エネルギー', icon: '⚡' },
  { id: 'environment', label: '環境', icon: '🌿' },
  { id: 'digital', label: 'デジタル', icon: '💻' },
  { id: 'tax', label: '財政・税制', icon: '📊' },
]

type PartyPosition = {
  party: string
  summary: string
  stance: 'active' | 'moderate' | 'cautious' | 'oppose'
  source: string
}

const POLICY_DATA: Record<string, PartyPosition[]> = {
  economy: [
    { party: '自由民主党', summary: '賃上げ税制の強化、中小企業支援の拡充。最低賃金は「地域の実情を踏まえ引き上げ」と慎重な表現にとどまる。', stance: 'moderate', source: '衆院予算委員会 2026-06-12' },
    { party: '立憲民主党', summary: '最低賃金を全国一律1,500円に引き上げる政策を旗印に掲げる。中小企業には別途補助金で対応。', stance: 'active', source: '立憲民主党代表記者会見 2026-06-12' },
    { party: '日本維新の会', summary: '規制改革による経済活性化を優先。最低賃金の一律引き上げには財政規律の観点から慎重。', stance: 'cautious', source: '維新代表記者会見 2026-06-11' },
    { party: '公明党', summary: '中小企業の生産性向上支援を通じた賃上げを支持。給付金による物価高対策にも積極的。', stance: 'active', source: '衆院本会議 2026-06-13' },
    { party: '国民民主党', summary: '「手取りを増やす」政策として所得税非課税枠の拡大（103万円→178万円）を主張。', stance: 'active', source: '財務金融委員会 2026-06-10' },
    { party: '日本共産党', summary: '大企業・富裕層への課税強化を財源に最低賃金1,500円・消費税廃止を主張。', stance: 'active', source: '厚生労働委員会 2026-06-11' },
    { party: 'れいわ新選組', summary: '消費税廃止・給付付き税額控除の導入で可処分所得を大幅に増加させる構想。', stance: 'active', source: '参院本会議 2026-06-10' },
  ],
  defense: [
    { party: '自由民主党', summary: 'GDP比2%への防衛費増額を推進。反撃能力（敵基地攻撃能力）の保有を決定済み。日米同盟を基軸に多国間安全保障体制を強化。', stance: 'active', source: '参院外交防衛委員会 2026-06-09' },
    { party: '立憲民主党', summary: '防衛費増額の財源・規模に慎重姿勢。外交・対話による問題解決を優先。反撃能力には憲法上の問題があると主張。', stance: 'cautious', source: '参院外交防衛委員会 2026-06-09' },
    { party: '日本維新の会', summary: '日米同盟強化は支持するが、防衛費の使途の効率性を重視。憲法改正には積極的。', stance: 'moderate', source: '衆院予算委員会 2026-06-12' },
    { party: '公明党', summary: '防衛費増額は一定理解も、外交努力を最優先に求める。専守防衛原則の堅持を主張。', stance: 'moderate', source: '衆院本会議 2026-06-13' },
    { party: '国民民主党', summary: '防衛費増額を支持。反撃能力の保有も容認。台湾有事への備えとして日米連携強化を求める。', stance: 'active', source: '参院外交防衛委員会 2026-06-09' },
    { party: '日本共産党', summary: '防衛費増額に強く反対。日米安保体制そのものを見直し、専守防衛・非核三原則の堅持を訴える。', stance: 'oppose', source: '参院外交防衛委員会 2026-06-09' },
    { party: 'れいわ新選組', summary: '軍拡競争に反対し、平和外交を最優先に掲げる。防衛費増額の財源には強く反対。', stance: 'oppose', source: '参院本会議 2026-06-10' },
  ],
  energy: [
    { party: '自由民主党', summary: '原子力発電の再稼働・新増設を推進。GX（グリーントランスフォーメーション）で再エネも並行して拡大。', stance: 'active', source: '衆院経済産業委員会 2026-06-08' },
    { party: '立憲民主党', summary: '原発に依存しないエネルギー社会を目指す。再生可能エネルギーへの集中投資を主張。', stance: 'cautious', source: '衆院経済産業委員会 2026-06-08' },
    { party: '日本維新の会', summary: '電力の安定供給のため原発再稼働は必要との立場。次世代原発（SMR）開発にも賛成。', stance: 'active', source: '衆院経済産業委員会 2026-06-08' },
    { party: '公明党', summary: '原発依存度の低減を主張しつつも、安全確認された原発の再稼働は容認。', stance: 'moderate', source: '衆院本会議 2026-06-13' },
    { party: '国民民主党', summary: '「エネルギー安全保障」として原発再稼働・新増設を積極支持。核融合技術開発にも前向き。', stance: 'active', source: '衆院経済産業委員会 2026-06-08' },
    { party: '日本共産党', summary: '原発ゼロを求め、再生可能エネルギー100%を2050年より早期に目指す。', stance: 'oppose', source: '衆院経済産業委員会 2026-06-08' },
    { party: 'れいわ新選組', summary: '原発即時ゼロを主張。脱原発と再エネ拡大を最重要政策と位置付ける。', stance: 'oppose', source: '参院本会議 2026-06-10' },
  ],
}

const STANCE_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: '積極的', color: 'bg-blue-100 text-blue-700' },
  moderate: { label: '条件付き', color: 'bg-yellow-100 text-yellow-700' },
  cautious: { label: '慎重', color: 'bg-orange-100 text-orange-700' },
  oppose: { label: '反対', color: 'bg-red-100 text-red-700' },
}

export default function PolicyComparePage() {
  const [selectedTopic, setSelectedTopic] = useState('economy')

  const positions = POLICY_DATA[selectedTopic] ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/" className="hover:text-blue-600">ホーム</Link>
          <span>/</span>
          <span>政策比較</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">政策比較</h1>
        <p className="text-gray-500">各党の立場を議事録・記者会見から抽出して比較します</p>
      </div>

      {/* Topic selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TOPICS.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all ${
              selectedTopic === topic.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            <span>{topic.icon}</span>
            {topic.label}
          </button>
        ))}
      </div>

      {/* Policy comparison cards */}
      {positions.length > 0 ? (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">注意：</span>
              各党の立場は直近の議事録・記者会見からAIが抽出したものです。
              一次情報（議事録・党公式サイト）を必ずご確認ください。
              評価的な表現は使用していません。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {positions.map((pos, i) => {
              const color = getPartyColor(pos.party)
              const stanceInfo = STANCE_LABELS[pos.stance]
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-1" style={{ backgroundColor: color }} />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <PartyBadge party={pos.party} />
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${stanceInfo.color}`}>
                        {stanceInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {pos.summary}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>出典：{pos.source}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          このテーマの比較データはまだ準備中です
        </div>
      )}
    </div>
  )
}
