import { test, expect } from '@playwright/test'

test.describe('スモークテスト @smoke', () => {
  test('ホームページが表示される', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/国会議事録/)
    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('衆議院ページが表示される', async ({ page }) => {
    await page.goto('/shugiin')
    await expect(page.getByText('衆議院')).toBeVisible()
  })

  test('検索ページが表示される', async ({ page }) => {
    await page.goto('/search')
    await expect(page.getByRole('searchbox')).toBeVisible()
  })

  test('政策比較ページが表示される', async ({ page }) => {
    await page.goto('/policy-compare')
    await expect(page.getByText('政策比較')).toBeVisible()
  })

  test('検索が機能する', async ({ page }) => {
    await page.goto('/search?q=予算')
    await expect(page.getByText('予算')).toBeVisible()
  })
})
