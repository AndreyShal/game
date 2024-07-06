export class NumberUtil {
    /**
     *
     * @param {*} max
     * @returns вернет рандомное число от 1 до max
     */
    static getRandomNumber(max: number) {
        return Math.floor(Math.random() * max + 1)
    }
}