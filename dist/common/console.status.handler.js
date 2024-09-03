export class ConsoleStatusHandler {
    icon;
    message;
    status;
    constructor(icon, message, status) {
        this.icon = icon;
        this.message = message;
        this.status = status;
        console.info(`[${this.getIconStatus()}] [${this.icon}] ${this.message}`);
    }
    getIconStatus() {
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
