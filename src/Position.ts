
export class Position {
    x:number;
    y:number;

    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }
    clone() {
        return new Position(this.x, this.y)
    }
    equal(otherPosition: Position): boolean {
        return otherPosition.x === this.x && otherPosition.y === this.y
    }
}