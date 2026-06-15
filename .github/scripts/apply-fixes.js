#!/usr/bin/env node
/**
 * Claude AI が提案した安全な自動修正を適用するスクリプト
 */

const fs = require('fs');

const FIXES_JSON = process.env.FIXES_JSON || '[]';

let fixes;
try {
  fixes = JSON.parse(FIXES_JSON);
} catch {
  console.error('FIXES_JSON のパースに失敗しました');
  process.exit(1);
}

if (!Array.isArray(fixes) || fixes.length === 0) {
  console.log('適用する修正がありません');
  process.exit(0);
}

let applied = 0;
let skipped = 0;

for (const fix of fixes) {
  const { file, description, old_code, new_code } = fix;

  if (!file || !old_code || !new_code) {
    console.warn(`スキップ: 不完全な修正データ (${file})`);
    skipped++;
    continue;
  }

  if (!fs.existsSync(file)) {
    console.warn(`スキップ: ファイルが存在しません (${file})`);
    skipped++;
    continue;
  }

  const content = fs.readFileSync(file, 'utf8');

  if (!content.includes(old_code)) {
    console.warn(`スキップ: 対象コードが見つかりません (${file})`);
    skipped++;
    continue;
  }

  const updated = content.replace(old_code, new_code);
  fs.writeFileSync(file, updated, 'utf8');
  console.log(`✅ 適用: ${file} — ${description}`);
  applied++;
}

console.log(`\n完了: ${applied} 件適用, ${skipped} 件スキップ`);
