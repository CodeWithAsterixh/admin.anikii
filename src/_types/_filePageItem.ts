export type mediaFormat =
  | 'TV'
  | 'TV_SHORT'
  | 'MOVIE'
  | 'SPECIAL'
  | 'OVA'
  | 'ONA'
  | 'MUSIC'
  | 'MANGA'
  | 'NOVEL'
  | 'ONE_SHOT'
export interface CoverImage {
  cover_image_color: string
  cover_image: string
  bannerImage: string
}

export interface AnimeListItem {
  id: number
  title: string
  episodes: number
  status: string
  coverImage: CoverImage
  format: mediaFormat
  popularity: number
  averageScore: number
  trending: number
  releaseDate: string | number
}

export interface PagesStructure {
  lastPage: number
  pages: Record<string, AnimeListItem[]>
}
