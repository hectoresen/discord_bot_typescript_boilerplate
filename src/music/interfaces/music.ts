import { VoiceBasedChannel } from 'discord.js'
import SongResultInterface from './song-results'
import SongNotFoundException from 'src/shared/exceptions/song-not-found-exception'

export interface InfoToCommand {
  song: SongResultInterface
  queue: SongResultInterface[]
}

export default interface Music {
  playSong(
    channel: VoiceBasedChannel,
    query: string
  ): Promise<InfoToCommand | SongNotFoundException>
  pauseSong(): Promise<void>
  resumeSong(): Promise<void>
}
