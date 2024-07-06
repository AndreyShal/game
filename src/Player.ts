import {Position} from './Position';
import {Unit} from './Unit';

export class Player extends Unit{
    id: number;

    constructor(id: number,position: Position) {
        super(position)
        this.id = id
    }
}