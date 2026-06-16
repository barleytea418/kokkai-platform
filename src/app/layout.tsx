import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    template: '%s | 国会議事録プラットフォーム',
    default: '国会議事録プラットフォーム — 一次情報で政治を理解する',
  },
  description:
    '衆議院・参議院の議事録、記者会見、議員情報を中立的に提供する政治情報プラットフォーム',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
