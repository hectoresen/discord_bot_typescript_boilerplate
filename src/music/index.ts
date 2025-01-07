import { VoiceBasedChannel } from 'discord.js'
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
  AudioPlayerStatus,
} from '@discordjs/voice'

import Music, { InfoToCommand } from './interfaces/music'
import SongNotFoundException from 'src/shared/exceptions/song-not-found-exception'
import { Readable } from 'stream'
import SongResultInterface from './interfaces/song-results'
import { ConsoleStatusHandler } from 'src/common/console.status.handler'
import SettingsServiceInterface from 'src/common/interfaces/settings-service.interface'
import MusicProvider from './interfaces/music-provider'
import YoutubeProvider from './providers/youtube/youtube'
import ytdDiscord from 'ytdl-core-discord'

export default class MusicClient implements Music {
  private queue: Readable[] = []
  private queueInfo: SongResultInterface[] = []
  private isPlaying: boolean
  private player: any
  private discordSettings: SettingsServiceInterface
  private musicProvider: MusicProvider

  constructor() {
    this.player = createAudioPlayer()
    //YT
    this.musicProvider = new YoutubeProvider()
  }

  async playSong(
    channel: VoiceBasedChannel,
    query: string
  ): Promise<InfoToCommand | SongNotFoundException> {
    const song = await this.musicProvider.search(query)

    if (!song) {
      throw new SongNotFoundException(
        `No se ha encontrado la canción: \`${query}\``
      )
    }

    const stream = await ytdDiscord(song.url, { highWaterMark: 1 << 25 })

    this.addToQueue(stream, song)

    if (!this.isPlaying) {
      this.isPlaying = true
      this.playNextSong(channel)
    }
    return {
      song: song,
      queue: this.queueInfo,
    }
  }

  private async playNextSong(channel: VoiceBasedChannel) {
    if (this.queue.length > 0) {
      this.isPlaying = false
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })

    connection.subscribe(this.player)

    this.queueInfo.shift()

    const resource = createAudioResource(this.queue.shift(), {
      inputType: StreamType.Opus,
    })

    this.player.play(resource)

    this.player.on('error', (error: any) => {
      new ConsoleStatusHandler('🎶', `${error}`, 'error')
      this.playNextSong(channel)
    })

    this.player.once(AudioPlayerStatus.Idle, () => {
      this.playNextSong(channel)
    })
  }

  private async addToQueue(query: Readable, song: SongResultInterface) {
    this.queue.push(query)
    this.queueInfo.push(song)
  }

  async pauseSong() {
    this.player.pause()
  }

  async resumeSong() {
    this.player.unpause()
  }

  async skipSong(channel: VoiceBasedChannel) {
    this.player.stop()
    this.playNextSong(channel)
  }
}
