// @ts-ignore
import SecretConfigServiceInterface from 'src/common/interfaces/secret-config-service.interface'
import { youtube_v3, google } from 'googleapis'
import { secretConfigService } from 'src/common/secret-config.service'
import { ConsoleStatusHandler } from 'src/common/console.status.handler'

export default class YoutubeClient {
  public youtube: youtube_v3.Youtube
  private configService: SecretConfigServiceInterface

  constructor() {
    this.configService = secretConfigService

    this.youtube = google.youtube({
      version: 'v3',
      auth: this.configService.youtubeConfig.apiKey,
    })
  }

  get client() {
    return {
      youtube: this.youtube,
    }
  }

  async getVideos(query: string) {
    try {
      const videos = await this.youtube.search.list({
        q: query,
        maxResults: 3,
        part: ['snippet'],
        regionCode: 'es',
      })

      return videos.data.items
    } catch (error) {
      new ConsoleStatusHandler('🎶', `${error}`, 'error')
    }
  }
}
