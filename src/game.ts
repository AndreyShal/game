import {Settings, Status} from './types';

class Game {
    #settings:Settings
    #status:Status = "pending";

    constructor(initialSettings: Settings) {
        this.#settings = initialSettings;
    }

    set settings(settings:Settings) {
        this.#settings = settings;
    }

    get settings():Settings {
        return this.#settings;
    }

    async start() {
        if (this.#status === "pending") {
            this.#status = "in-progress";
        }
    }

    get status() {
        return this.#status;
    }
}

export { Game };