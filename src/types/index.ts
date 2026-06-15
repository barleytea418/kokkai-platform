export type House = 'shugiin' | 'sangin'

export type RecordType = 'plenary' | 'committee' | 'special'

export interface DiaryRecord {
  id: string
  house: House
  type: RecordType
  committee?: string
  date: string
  sessionNumber: number
  title: string
  topics: string[]
  summary: string
  fullText: string
  speakers: Speaker[]
  keywords: string[]
  sourceUrl: string
  youtubeVideoId?: string
  votes?: VoteResult
}

export interface Speaker {
  name: string
  party: string
  position: string
  speechCount: number
}

export interface VoteResult {
  yes: number
  no: number
  abstain: number
  passed: boolean
}

export interface Member {
  id: string
  name: string
  nameKana: string
  party: string
  house: House
  constituency: string
  electedTimes: number
  position?: string
  committees: string[]
  speechCount: number
  billsProposed: number
  avatar?: string
}

export interface PressConference {
  id: string
  speakerName: string
  party: string
  position: string
  date: string
  title: string
  summary: string
  transcript: string
  youtubeUrl?: string
  youtubeVideoId?: string
  topics: string[]
  duration: number
}

export interface NewsArticle {
  id: string
  title: string
  source: string
  url: string
  publishedAt: string
  category: string
  summary: string
}

export interface Party {
  name: string
  shortName: string
  color: string
  houseSeats: number
  sangSeats: number
}
