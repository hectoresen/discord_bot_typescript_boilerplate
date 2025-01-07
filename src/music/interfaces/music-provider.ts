import SongResultInterface from './song-results'

export enum SearchElements {
  query = 'query',
  url = 'url',
}

export default interface MusicProvider {
  search(query: string): Promise<SongResultInterface>
}
