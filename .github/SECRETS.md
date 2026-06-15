# GitHub Secrets 設定ガイド

GitHubリポジトリの Settings → Secrets and variables → Actions から以下を登録してください。

## 必須 Secrets

| Secret名 | 説明 | 取得方法 |
|---|---|---|
| `ANTHROPIC_API_KEY` | Claude AI API キー | https://console.anthropic.com/settings/keys |
| `AWS_ACCESS_KEY_ID` | AWS アクセスキー ID | IAM ユーザーのアクセスキー |
| `AWS_SECRET_ACCESS_KEY` | AWS シークレットアクセスキー | IAM ユーザーのアクセスキー |
| `S3_BUCKET` | S3 バケット名 | 例: `kokkai-platform-prod` |
| `CLOUDFRONT_DIST_ID` | CloudFront ディストリビューション ID | CloudFront コンソールで確認 |

## オプション Secrets

| Secret名 | 説明 | 取得方法 |
|---|---|---|
| `SNYK_TOKEN` | Snyk セキュリティスキャン | https://app.snyk.io/account |
| `SLACK_WEBHOOK` | Slack 通知用 Webhook URL | Slack App の Incoming Webhooks |

## AWS IAM ポリシー

デプロイ用 IAM ユーザーに以下のポリシーを付与してください：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::*:distribution/YOUR_DIST_ID"
    }
  ]
}
```

## ワークフローごとの必要 Secrets

| ワークフロー | 必要な Secrets |
|---|---|
| `ci-test.yml` | なし（公開リポジトリは不要） |
| `auto-improve.yml` | `ANTHROPIC_API_KEY` |
| `performance.yml` | なし |
| `security.yml` | `SNYK_TOKEN`（オプション） |
| `deploy.yml` | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`, `CLOUDFRONT_DIST_ID`, `SLACK_WEBHOOK`（オプション） |
