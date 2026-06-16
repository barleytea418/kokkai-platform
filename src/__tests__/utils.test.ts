import { formatDate, houseLabel, getPartyColor } from '@/lib/utils'

describe('formatDate', () => {
  it('YYYY-MM-DD を日本語表記に変換する', () => {
    expect(formatDate('2026-01-15')).toBe('2026年1月15日')
  })
})

describe('houseLabel', () => {
  it('shugiin → 衆議院', () => {
    expect(houseLabel('shugiin')).toBe('衆議院')
  })
  it('sangin → 参議院', () => {
    expect(houseLabel('sangin')).toBe('参議院')
  })
})

describe('getPartyColor', () => {
  it('自民党はカラーを返す', () => {
    expect(getPartyColor('自由民主党')).toMatch(/^#/)
  })
  it('未知の政党はデフォルトカラーを返す', () => {
    expect(getPartyColor('存在しない党')).toBe('#6B7280')
  })
})
