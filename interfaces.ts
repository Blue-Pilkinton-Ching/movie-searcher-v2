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

export interface GlobalState {}

export interface GlobalStateWrapper {
  globalState: GlobalState
  setGlobalState: Dispatch<SetStateAction<GlobalState>>
}

export interface TVDetails {
  adult: boolean
  backdrop_path: string
  episode_run_time: any[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  name: string
  next_episode_to_air: any
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  seasons: Season[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export interface Season {
  air_date?: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path?: string
  season_number: number
  vote_average: number
}

export interface Genre {
  id: number
  name: string
}

export interface MovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
