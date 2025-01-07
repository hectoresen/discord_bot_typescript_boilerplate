export interface Thumbnail {
  url: string
  width: number
  height: number
}   

export default interface SongResultInterface {
  found_by: string
  url: string
  title: string
  thumbnail: Thumbnail[]
  duration: string
}