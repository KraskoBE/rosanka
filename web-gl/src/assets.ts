export interface Asset {
    alias: string;
    src: string;
}

export interface LevelAsset {
    background: Asset;
    data: Asset;
}

export function getLevelAsset(levelNumber: number): LevelAsset {
    return {
        background: {alias: `LEVEL_${levelNumber}_BG`, src: `assets/levels/${levelNumber}/bg.png`},
        data: {alias: `LEVEL_${levelNumber}_DATA`, src: `assets/levels/${levelNumber}/data.json`}
    }
}
