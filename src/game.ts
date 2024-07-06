import {Settings, Status} from './utils/types/types';
import {Player} from './Player';
import {NumberUtil} from './utils/helpers/NumberUtil';
import {Position} from './Position';
import {Google} from './Google';

class Game {
    #settings: Settings = {
        gridSize: {
            columns: 4,
            rows: 4
        },
        googleJumpInterval: 2000
    };
    #status: Status = "pending";
    #player1?: Player
    #player2?: Player
    #google?: Google
    #googleSetIntervalId: NodeJS.Timeout | null = null;

    set settings(settings: Settings) {
        this.#settings = settings;
    }

    get settings(): Settings {
        return this.#settings;
    }

    get status() {
        return this.#status;
    }

    get google() {
        return this.#google;
    }

    #getRandomPosition(coordinates: Position[]): Position {
        let newX: number, newY: number;


        do {
            newX = NumberUtil.getRandomNumber(this.#settings.gridSize.columns);
            console.log('this.#settings.gridSize.columns',this.#settings.gridSize.columns)
            console.log('newX',newX)
            newY = NumberUtil.getRandomNumber(this.#settings.gridSize.rows);
        } while (coordinates?.some((el) => el.x === newX && el.y === newY));


        return new Position(newX, newY);
    }

    get player1() {
        return this.#player1;
    }


    get player2() {
        return this.#player2;
    }

    #moveGoogleToRandomPosition(excludeGoogle?: boolean) {
        if (!this.#player1 && !this.#player2) return

        let notCrossedPosition = [this.#player1?.position, this.#player2?.position].filter((pos): pos is Position => pos !== undefined);

        if (!excludeGoogle && this.#google) {
            notCrossedPosition.push(this.#google?.position);
        }

        this.#google = new Google(this.#getRandomPosition(notCrossedPosition));
    }

    #createUnits() {
        const player1Position = this.#getRandomPosition([]);
        this.#player1 = new Player(1, player1Position);


        const player2Position = this.#getRandomPosition([player1Position]);
        this.#player2 = new Player(2, player2Position);


        this.#moveGoogleToRandomPosition(true)
    }

    async start() {
        if (this.#status === "pending") {
            this.#createUnits();
            this.#status = "in-process";
        }

        this.#runGoogleJumpInterval()
    }

    #runGoogleJumpInterval() {
        this.#googleSetIntervalId = setInterval(() => {
            this.#moveGoogleToRandomPosition();
        }, this.#settings.googleJumpInterval);
    }

    async stop() {
        if (this.#googleSetIntervalId !== null) {
            clearInterval(this.#googleSetIntervalId);
            this.#googleSetIntervalId = null;
        }
        this.#status = "stopped";
    }
}

export {Game};