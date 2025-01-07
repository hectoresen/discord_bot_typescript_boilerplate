export default class YoutubeUrlFactory {
  private readonly url: string
  constructor (
      videoId: string
  ) {
      this.url = `https://www.youtube.com/watch?v=${videoId}`
  }

  getUrl(): string {
      return this.url
  }
}