import { DiaryRecord } from '@/types'

export const MOCK_RECORDS: DiaryRecord[] = [
  {
    id: 'rec-001',
    house: 'shugiin',
    type: 'plenary',
    date: '2026-06-13',
    sessionNumber: 216,
    title: '第216回国会 衆議院本会議 第28号',
    topics: ['補正予算案', '物価対策', '賃金上昇'],
    summary: `今回の本会議では、2026年度補正予算案が主要な議題となりました。物価高への対応として総額3.5兆円の対策が審議され、与野党間で激しい議論が交わされました。

【主な論点】
①政府は電気・ガス料金支援の延長と低所得者への給付金（1人5万円）を盛り込んだ補正予算案を提出。与党は「即効性ある対策」と評価。
②中道改革連合は「バラマキではなく構造的対策を」と批判。維新は「財政規律の観点から慎重な審議を求める」と主張。
③採決の結果、与党の賛成多数で可決。参議院に送付された。`,
    fullText: `○議長（額賀福志郎君）　これより会議を開きます。
　日程第一　令和八年度一般会計補正予算（第1号）

○内閣総理大臣（高市早苗君）　ただいま議題となりました令和8年度一般会計補正予算案につきまして提案の趣旨を申し上げます。
　現下の経済情勢は、物価上昇が続く中、実質賃金がプラスに転じつつある転換期にあります。この好機を確実に捉え、成長と分配の好循環を実現するため、本補正予算を提出しました。

○野田佳彦君（中道改革連合）　ただいまの総理の説明について、われわれ中道改革連合を代表して質問いたします。
　政府は今回も給付金という形での対策を講じておりますが、根本的な物価高の原因に対処できていないのではないでしょうか。エネルギー価格の高騰は国際要因だけでなく、政府のエネルギー政策の失敗によるものでもあります...`,
    speakers: [
      { name: '額賀福志郎', party: '自由民主党', position: '議長', speechCount: 8 },
      { name: '高市早苗', party: '自由民主党', position: '内閣総理大臣', speechCount: 5 },
      { name: '野田佳彦', party: '中道改革連合', position: '代表', speechCount: 4 },
      { name: '馬場伸幸', party: '日本維新の会', position: '代表', speechCount: 3 },
      { name: '玉木雄一郎', party: '国民民主党', position: '代表', speechCount: 2 },
    ],
    keywords: ['補正予算', '物価対策', '給付金', 'エネルギー', '賃金'],
    sourceUrl: 'https://www.shugiin.go.jp/internet/itdb_kaigiroku.nsf/',
    youtubeVideoId: 'dQw4w9WgXcQ',
    votes: { yes: 316, no: 143, abstain: 0, passed: true },
  },
  {
    id: 'rec-002',
    house: 'shugiin',
    type: 'committee',
    committee: '予算委員会',
    date: '2026-06-12',
    sessionNumber: 216,
    title: '第216回国会 衆議院予算委員会 第15号',
    topics: ['物価対策予算', '社会保障費', '防衛費'],
    summary: `予算委員会では補正予算の各項目について集中審議が行われました。

【主な論点】
①防衛費増額分の財源について与野党が対立。政府は「国債発行を最小限に」と説明するも、野党は「将来世代への負担転嫁」と批判。
②社会保障費の自然増への対応が焦点。厚生労働大臣は「持続可能な制度設計を優先」と答弁。
③物価対策の効果検証を求める野党の質問に対し、財務大臣は「効果測定の方法論を検討する」と述べるにとどまった。`,
    fullText: `○委員長（西村康稔君）　予算委員会を開会します。
　本日は、令和8年度一般会計補正予算案について集中審議を行います。

○辻元清美君（立憲民主党）　防衛費の増額について伺います。今回の補正予算にも防衛関連費が含まれておりますが、その財源について明確にしていただきたいと思います。
　昨年度から防衛費はGDP比2%を目指すという方針が示されましたが、具体的な財源確保の見通しが不透明なままです。増税なのか、国債なのか、はっきり答えてください。

○防衛大臣（中谷元君）　防衛力の抜本的強化については、歳出改革、決算剰余金の活用、防衛力強化資金などを財源として確保することとしております。増税については、2027年度以降において、法人税、所得税、たばこ税の税制措置を予定しており...`,
    speakers: [
      { name: '西村康稔', party: '自由民主党', position: '委員長', speechCount: 12 },
      { name: '辻元清美', party: '立憲民主党', position: '委員', speechCount: 8 },
      { name: '中谷元', party: '自由民主党', position: '防衛大臣', speechCount: 6 },
      { name: '片山さつき', party: '自由民主党', position: '財務大臣', speechCount: 5 },
      { name: '足立康史', party: '国民民主党', position: '委員', speechCount: 4 },
    ],
    keywords: ['防衛費', '財源', '国債', '社会保障', '増税'],
    sourceUrl: 'https://www.shugiin.go.jp/internet/itdb_kaigiroku.nsf/',
    votes: { yes: 18, no: 9, abstain: 0, passed: true },
  },
  {
    id: 'rec-003',
    house: 'shugiin',
    type: 'committee',
    committee: '厚生労働委員会',
    date: '2026-06-11',
    sessionNumber: 216,
    title: '第216回国会 衆議院厚生労働委員会 第22号',
    topics: ['医療保険改革', '少子化対策', '介護保険'],
    summary: `厚生労働委員会では、医療・介護制度改革について審議されました。

【主な論点】
①後期高齢者医療保険料の上限引き上げに対し、野党から「高齢者への負担増」と批判。政府は「制度持続性のため必要な措置」と説明。
②少子化対策の財源となる「こども・子育て支援金」制度について審議。支援金の月額負担について与野党で議論が紛糾。
③介護人材不足解消のための処遇改善加算の拡充が提案され、与野党おおむね賛成の方向で一致した。`,
    fullText: `○委員長（加藤勝信君）　厚生労働委員会を開会します。

○田村智子君（日本共産党）　後期高齢者の医療費負担増について質問します。
　現在、2割負担となった後期高齢者は約370万人ですが、さらに対象が拡大される可能性があると聞いています。高齢者の受診抑制につながりかねません。大臣の見解を伺います。

○厚生労働大臣（福岡資麿君）　後期高齢者医療制度については、団塊の世代が後期高齢者となる中、現役世代の負担増を抑制しつつ、医療・介護保険の持続可能性を確保することが重要です。一定所得以上の方に応分の負担をお願いしていますが、必要な医療へのアクセスが阻害されないよう十分に配慮してまいります...`,
    speakers: [
      { name: '加藤勝信', party: '自由民主党', position: '委員長', speechCount: 10 },
      { name: '田村智子', party: '日本共産党', position: '委員', speechCount: 6 },
      { name: '福岡資麿', party: '自由民主党', position: '厚生労働大臣', speechCount: 7 },
      { name: '塩村文夏', party: '中道改革連合', position: '委員', speechCount: 5 },
    ],
    keywords: ['後期高齢者', '医療保険', '介護', '少子化', 'こども支援金'],
    sourceUrl: 'https://www.shugiin.go.jp/internet/itdb_kaigiroku.nsf/',
  },
  {
    id: 'rec-004',
    house: 'sangin',
    type: 'plenary',
    date: '2026-06-10',
    sessionNumber: 216,
    title: '第216回国会 参議院本会議 第25号',
    topics: ['地方分権推進法案', 'デジタル行財政改革'],
    summary: `参議院本会議では地方分権推進に関する法案が審議されました。

【主な論点】
①デジタル行財政改革の一環として、地方自治体のデジタル化支援を拡充する法案が提出。政府は「2030年までに行政手続きの完全デジタル化」を目標に掲げた。
②地方への権限委譲について、知事会からの意見を踏まえた修正案が示されたが、野党は「財源の裏付けが不十分」と指摘。
③参議院での審議を経て、修正可決。`,
    fullText: `○議長（尾辻秀久君）　これより会議を開きます。

○デジタル大臣（小野田紀美君）　ただいま議題となりましたデジタル行財政改革関連4法案について御説明申し上げます。
　本法案は、地方公共団体における行政手続きのデジタル化を推進し、国民の利便性向上と行政コスト削減を図るものです。マイナンバーカードの活用拡大、行政データの標準化、そして各種申請手続きのオンライン化を義務付けるものです...

○山本太郎君（れいわ新選組）　デジタル化は便利な一面がありますが、デジタルデバイドの問題を無視することはできません。高齢者や障害者、外国人など、デジタルにアクセスしにくい方々への配慮はどのようにお考えですか？`,
    speakers: [
      { name: '尾辻秀久', party: '自由民主党', position: '議長', speechCount: 9 },
      { name: '小野田紀美', party: '自由民主党', position: 'デジタル大臣', speechCount: 6 },
      { name: '山本太郎', party: 'れいわ新選組', position: '議員', speechCount: 5 },
      { name: '辻元清美', party: '立憲民主党', position: '議員', speechCount: 4 },
    ],
    keywords: ['デジタル化', '地方分権', 'マイナンバー', '行政改革', 'デジタルデバイド'],
    sourceUrl: 'https://www.sangiin.go.jp/japanese/joho1/kousei/gian/',
    votes: { yes: 148, no: 92, abstain: 8, passed: true },
  },
  {
    id: 'rec-005',
    house: 'sangin',
    type: 'committee',
    committee: '外交防衛委員会',
    date: '2026-06-09',
    sessionNumber: 216,
    title: '第216回国会 参議院外交防衛委員会 第18号',
    topics: ['日米安保', '台湾情勢', '防衛装備移転'],
    summary: `外交防衛委員会では台湾海峡情勢と日本の安全保障政策について審議されました。

【主な論点】
①台湾情勢の緊迫化を受け、日米同盟の強化と自衛隊の役割拡大について議論。政府は「専守防衛の原則は維持する」と繰り返した。
②防衛装備品の第三国移転について、野党から「戦争加担になりかねない」と批判。政府は「同盟国への支援は国際貢献」と反論。
③北朝鮮のミサイル開発への対応として、弾道ミサイル防衛強化に与野党が概ねで合意した。`,
    fullText: `○委員長（佐藤正久君）　外交防衛委員会を開会します。

○辻元清美君（立憲民主党）　台湾有事が現実の問題として議論されるようになってきましたが、日本はどう対処するのですか。外務大臣、お答えください。

○外務大臣（岩屋毅君）　台湾をめぐる情勢は厳しさを増しており、台湾海峡の平和と安定は、わが国のみならず国際社会全体にとって不可欠です。日米同盟を基軸としつつ、外交的手段による問題解決を最優先としてまいります。台湾との非政府間の実務関係は維持・強化していきます...`,
    speakers: [
      { name: '佐藤正久', party: '自由民主党', position: '委員長', speechCount: 11 },
      { name: '辻元清美', party: '立憲民主党', position: '委員', speechCount: 7 },
      { name: '岩屋毅', party: '自由民主党', position: '外務大臣', speechCount: 8 },
      { name: '中谷元', party: '自由民主党', position: '防衛大臣', speechCount: 6 },
    ],
    keywords: ['台湾', '日米同盟', '防衛装備', '専守防衛', '北朝鮮'],
    sourceUrl: 'https://www.sangiin.go.jp/japanese/joho1/kousei/gian/',
  },
  {
    id: 'rec-006',
    house: 'shugiin',
    type: 'committee',
    committee: '経済産業委員会',
    date: '2026-06-08',
    sessionNumber: 216,
    title: '第216回国会 衆議院経済産業委員会 第12号',
    topics: ['半導体産業支援', '脱炭素政策', 'GX推進'],
    summary: `経済産業委員会では半導体・電池などの戦略的産業の国内投資促進策について審議が行われました。

【主な論点】
①TSMC・マイクロン誘致に続き、次世代半導体の国産化支援策として「先端半導体研究所」への追加拠出が提案された。
②GX（グリーントランスフォーメーション）推進のための官民投資計画が示され、2030年度まで累計150兆円規模の投資が見込まれる。
③電力価格の高騰が産業競争力に影響しているとして、原子力発電の活用をめぐる議論が紛糾した。`,
    fullText: `○委員長（梶山弘志君）　経済産業委員会を開会します。

○野田佳彦君（中道改革連合）　半導体の国産化支援について、これまでの公的資金投入の効果をどう評価していますか。

○経済産業大臣（武藤容治君）　ラピダスへの支援を含め、先端半導体の国産化は日本の経済安全保障上極めて重要です。初期段階での公的支援は不可欠であり、民間投資を呼び込む呼び水効果も期待できます。2ナノメートル以下の先端品を2027年に量産開始する計画で、順調に進んでいます...`,
    speakers: [
      { name: '梶山弘志', party: '自由民主党', position: '委員長', speechCount: 9 },
      { name: '野田佳彦', party: '中道改革連合', position: '代表', speechCount: 6 },
      { name: '武藤容治', party: '自由民主党', position: '経済産業大臣', speechCount: 7 },
      { name: '足立康史', party: '国民民主党', position: '委員', speechCount: 4 },
    ],
    keywords: ['半導体', 'GX', '脱炭素', '原子力', '産業政策'],
    sourceUrl: 'https://www.shugiin.go.jp/internet/itdb_kaigiroku.nsf/',
  },
]

export function getRecord(id: string): DiaryRecord | undefined {
  return MOCK_RECORDS.find((r) => r.id === id)
}

export function getLatestRecords(limit = 6): DiaryRecord[] {
  return [...MOCK_RECORDS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export function getRecordsByHouse(house: 'shugiin' | 'sangin'): DiaryRecord[] {
  return MOCK_RECORDS.filter((r) => r.house === house)
}

export function getRecordsByCommittee(committee: string): DiaryRecord[] {
  return MOCK_RECORDS.filter((r) => r.committee === committee)
}
