export class ConsoleStatusHandler {
  constructor (
        private icon: string,
        private message: string,
        private status: 'ok' | 'loading' | 'error',
  ) {
    console.info(`[${this.getIconStatus()}] [${this.icon}] ${this.message}`);
  }

  private getIconStatus() {
    if (this.status === 'ok') {
      return '✅';
    }

    if (this.status === 'loading') {
      return '🔄';
    }

    if (this.status === 'error') {
      return '❌';
    }

    return '❔';
  }
}