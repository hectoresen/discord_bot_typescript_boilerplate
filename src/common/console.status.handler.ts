export class ConsoleStatusHandler {
  private statusIcons: Record<'ok' | 'loading' | 'error', string> = {
    ok: '✅',
    loading: '🔄',
    error: '❌',
  }

  constructor(
    private icon: string,
    private message: string,
    private status: 'ok' | 'loading' | 'error'
  ) {
    console.info(`[${this.getIconStatus()}] [${this.icon}] ${this.message}`)
  }

  private getIconStatus() {
    return this.statusIcons[this.status] || '❔'
  }
}
