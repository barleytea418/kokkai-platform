#!/usr/bin/env node
/**
 * Claude AI によるコードレビュースクリプト
 * GitHub Actions の auto-improve ワークフローから呼び出される
 */

const Anthropic = require('@anthropic-ai/sdk')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const TARGET = process.env.TARGET || 'diff'

/** git diff または全ソースを取得 */
function getCodeToReview() {
  if (TARGET === 'diff') {
    const base = execSync('git rev-parse HEAD~1 2>/dev/null || git rev-parse --root', {
      encoding: 'utf8',
    }).trim()
    const diff = execSync(`git diff ${base}..HEAD -- 'src/**/*.ts' 'src/**/*.tsx'`, {
      encoding: 'utf8',
    })
    if (!diff.trim()) {
      console.log('差分なし。スキップします。')
      process.exit(0)
    }
    return { type: 'diff', content: diff }
  }

  // all: src 以下の全ファイル
  const files = execSync("find src -name '*.ts' -o -name '*.tsx'", { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean)
  const content = files.map((f) => `\n\n--- ${f} ---\n${fs.readFileSync(f, 'utf8')}`).join('')
  return { type: 'all', content }
}

const REVIEW_PROMPT = `あなたは Next.js 14 / TypeScript / Tailwind CSS のシニアエンジニアです。
以下のコードをレビューし、JSON 形式で回答してください。

レビューの観点:
1. バグ・型エラーのリスク
2. React / Next.js のベストプラクティス（Server Components, Suspense, etc.）
3. アクセシビリティ（aria-*, role, キーボード操作）
4. パフォーマンス（不要な re-render, 大きな依存）
5. コードの可読性・一貫性
6. セキュリティ（XSS, 入力バリデーション）

回答フォーマット（JSON のみ、余分なテキスト不要）:
{
  "summary": "全体の評価（1〜2文）",
  "issues": [
    {
      "severity": "error | warning | info",
      "file": "ファイルパス",
      "line": 行番号または null,
      "message": "問題の説明",
      "suggestion": "修正案のコード（任意）"
    }
  ],
  "auto_fixes": [
    {
      "file": "ファイルパス",
      "description": "変更の説明",
      "old_code": "変更前のコード",
      "new_code": "変更後のコード",
      "safe": true
    }
  ],
  "pr_body": "PR 本文（Markdown 形式）"
}

auto_fixes には「安全に自動適用できる」変更のみ含めてください（ロジック変更なし、スタイル修正、型アノテーション追加など）。`

async function runReview() {
  const { type, content } = getCodeToReview()
  console.log(`レビュー対象: ${type}, サイズ: ${content.length} 文字`)

  const fixes = []
  let summary = ''
  let prBody = ''
  let fullText = ''

  // ストリーミングで Claude に送信
  const stream = await client.messages.stream({
    model: 'claude-opus-4-8',
    max_tokens: 8192,
    thinking: { type: 'adaptive' },
    messages: [
      {
        role: 'user',
        content: `${REVIEW_PROMPT}\n\n## コード (${type})\n\`\`\`\n${content.slice(0, 60000)}\n\`\`\``,
      },
    ],
  })

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      process.stdout.write(event.delta.text)
      fullText += event.delta.text
    }
  }
  console.log('\n--- ストリーム完了 ---')

  // JSON 抽出
  const jsonMatch = fullText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    console.error('JSON が見つかりませんでした')
    setOutput('has_fixes', 'false')
    return
  }

  let result
  try {
    result = JSON.parse(jsonMatch[0])
  } catch (e) {
    console.error('JSON パースエラー:', e.message)
    setOutput('has_fixes', 'false')
    return
  }

  summary = result.summary || ''
  prBody = result.pr_body || buildDefaultPrBody(result)
  const autoFixes = (result.auto_fixes || []).filter((f) => f.safe)

  console.log(`\n要約: ${summary}`)
  console.log(`問題: ${(result.issues || []).length} 件`)
  console.log(`自動修正候補: ${autoFixes.length} 件`)

  setOutput('has_fixes', autoFixes.length > 0 ? 'true' : 'false')
  setOutput('fixes_json', JSON.stringify(autoFixes))
  setOutput('pr_body', prBody)

  // レビュー結果を JSON ファイルとして保存
  fs.writeFileSync('.github/review-result.json', JSON.stringify(result, null, 2))
}

function buildDefaultPrBody(result) {
  const issues = result.issues || []
  const errors = issues.filter((i) => i.severity === 'error')
  const warnings = issues.filter((i) => i.severity === 'warning')

  return `## 🤖 Claude AI コードレビュー結果

### 概要
${result.summary || '自動レビューが完了しました。'}

### 問題 (${issues.length} 件)
- ❌ エラー: ${errors.length} 件
- ⚠️ 警告: ${warnings.length} 件

${errors.length > 0 ? '### エラー\n' + errors.map((i) => `- **${i.file}:${i.line || '?'}** — ${i.message}`).join('\n') : ''}

${warnings.length > 0 ? '### 警告\n' + warnings.map((i) => `- **${i.file}:${i.line || '?'}** — ${i.message}`).join('\n') : ''}

---
*このPRは Claude AI により自動生成されました*`
}

function setOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT
  if (outputFile) {
    const delimiter = `EOF_${name}_${Date.now()}`
    fs.appendFileSync(outputFile, `${name}<<${delimiter}\n${value}\n${delimiter}\n`)
  } else {
    console.log(`[OUTPUT] ${name}=${value.slice(0, 200)}`)
  }
}

runReview().catch((err) => {
  console.error('エラー:', err)
  process.exit(1)
})
