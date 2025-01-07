import MusicProvider, { SearchElements } from '../../interfaces/music-provider'
import YoutubeClient from './client'
import { ConsoleStatusHandler } from 'src/common/console.status.handler'
import YoutubeUrlFactory from './url-factory'
import ytdl from 'ytdl-core'

export default class YoutubeProvider implements MusicProvider {
  private validUrl: string
  private youtubeClient: YoutubeClient

  constructor() {
    this.youtubeClient = new YoutubeClient()
  }

  async search(query: string) {
    try {
      const searchString =
        /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i.test(query)
          ? query
          : `ytsearch:${query}`
      const isURL =
        /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i.test(
          searchString
        )

      const videos = await this.youtubeClient.getVideos(searchString)

      if (!videos || !videos.length) {
        new ConsoleStatusHandler('🎬', 'No results found for ${query}', 'error')
        return null
      }

      const firstVideo = videos[0] // First video found
      const videoId = firstVideo?.id?.videoId //Id for first video found

      if (!videoId) {
        new ConsoleStatusHandler(
          '🎬 ',
          'No valid video ID found for ${query}',
          'error'
        )
        return null
      }

      if (!isURL) {
        const urlFactory = new YoutubeUrlFactory(videoId)
        this.validUrl = urlFactory.getUrl()
      }

      const basicInfo = await ytdl.getBasicInfo(
        isURL ? searchString : this.validUrl
      )

      const song = {
        found_by: SearchElements.url,
        url: basicInfo.videoDetails.video_url,
        title: basicInfo.videoDetails.title,
        thumbnail: basicInfo.videoDetails.thumbnails,
        duration: basicInfo.videoDetails.lengthSeconds,
      }

      return song
    } catch (error) {
      new ConsoleStatusHandler('🎬 ', `${error}`, 'error')
      return null
    }
  }
}
