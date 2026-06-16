# 国会議事録プラットフォーム — Claude Code 引き継ぎメモ

## プロジェクト概要

日本の国会情報を提供するフロントエンドのみのWebサイト。バックエンドなし、モックデータで動作。

- **技術スタック**: Next.js 14.2 (App Router) / TypeScript / Tailwind CSS
- **リポジトリ**: https://github.com/barleytea418/kokkai-platform
- **ローカル起動**: `npm run dev` → http://localhost:3000

## 実装済みページ

| URL | 内容 |
|---|---|
| `/` | ホーム（最新議事録・ニュース・記者会見） |
| `/shugiin` | 衆議院（本会議・委員会タブ） |
| `/sangin` | 参議院（本会議・委員会タブ） |
| `/records/:id` | 議事録詳細（AI要約・全文・議員別発言・動画） |
| `/members` | 議員検索（政党・議院フィルター） |
| `/members/:id` | 議員詳細ページ |
| `/press-conference` | 記者会見一覧 |
| `/press-conference/:id` | 記者会見詳細 |
| `/policy-compare` | 政策比較（テーマ別・全党） |
| `/search` | 全文検索 |
| `/about/policy` | 編集方針 |

## データファイル（モックデータ）

- `src/data/parties.ts` — 政党一覧・議席数（2026年2月衆院選後の最新情報）
- `src/data/mock-members.ts` — 議員10名
- `src/data/mock-records.ts` — 議事録6件
- `src/data/mock-press.ts` — 記者会見3件・ニュース6件

## 2026年最新政治情報（反映済み）

- **首相**: 高市早苗（第105代、2026年2月18日就任）
- **自民党**: 316議席（衆院、戦後最多）
- **中道改革連合**: 立憲民主党＋公明党が衆院のみ合流（2026年1月16日結成）、49議席
- **足立康史**: 日本維新の会 → 国民民主党に移籍
- **参政党**: 15議席、**チームみらい**: 11議席（新勢力）
- 参院では立憲・公明は独立会派として継続

## GitHub Actions（全部無料）

| ワークフロー | トリガー | 内容 |
|---|---|---|
| `.github/workflows/ci-test.yml` | push/PR | ESLint・TypeScript・Prettier・Jest・Build・E2E |
| `.github/workflows/auto-improve.yml` | 毎週月曜 | Prettier＋ESLint自動修正PR作成 |
| `.github/workflows/performance.yml` | PR | Lighthouse監査 |
| `.github/workflows/security.yml` | push/週次 | CodeQL・TruffleHog・npm audit |
| `.github/workflows/deploy.yml` | push main | AWS S3＋CloudFront（Secrets未設定なので現在スキップ） |

## 登録済みGitHub Secrets

- `ANTHROPIC_API_KEY` — 登録済み（ただしクレジット不足で現在未使用）

## npm スクリプト

```bash
npm run dev          # 開発サーバー起動
npm run build        # ビルド
npm run lint         # ESLint
npm run lint:fix     # ESLint自動修正
npm run format       # Prettier整形
npm run format:check # Prettierチェック
npm run type-check   # TypeScript型チェック
npm run test:unit    # Jest単体テスト
npm run test:e2e     # Playwright E2Eテスト
```

## 重要な設計上の注意

- **政治的中立性**: 全政党に同一デザイン・同一順序（機械的ルール）
- `useSearchParams` は必ず `<Suspense>` でラップ（`src/app/search/page.tsx` 参照）
- Node.js は `/usr/local/bin/node`（パスが通っていない場合は `export PATH="/usr/local/bin:$PATH"`）

## 今後の課題（未着手）

- 実際のAPIとの連携（国会会議録検索API: https://kokkai.ndl.go.jp/api.html）
- AWSデプロイの設定（`deploy.yml` の Secrets登録）
- AI要約機能の実装（クレジット購入後に有効化可能）
