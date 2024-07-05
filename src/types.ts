export type Status = 'pending' | 'in-progress'

export  interface Settings {
    gridSize:GridSize
}

type GridSize = {
    x: number
    y: number
}