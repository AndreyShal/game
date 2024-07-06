export type Status = 'pending' | 'in-progress' | 'in-process' | 'stopped'

export  interface Settings {
    gridSize:GridSize
    googleJumpInterval: number
}

type GridSize = {
    columns: number
    rows: number
}