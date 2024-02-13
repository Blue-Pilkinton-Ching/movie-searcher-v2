import { Dispatch, SetStateAction } from 'react'

export interface MediaSearch {
  page: number
  results: Media[]
  total_pages: number
  total_results: number
}

export interface Media {
  adult: boolean
  backdrop_path?: string | null | undefined
  id: number
  name?: string
  original_language: string
  original_name?: string
  overview: string
  poster_path: string | null | undefined
  media_type: string
  genre_ids: any[]
  popularity: number
  first_air_date?: string
  vote_average: number
  vote_count: number
  origin_country?: any[]
  title?: string
  original_title?: string
  release_date?: string
  video?: boolean
}

export interface GlobalState {
  currentMedia: Media | null
}

export interface GlobalStateWrapper {
  globalState: GlobalState
  setGlobalState: Dispatch<SetStateAction<GlobalState>>
}
