/* 利用する定義をまとめたファイル */


// 棒型
export const stick_0_position = [-100, 0, 100];
export const stick_90_position = [-1, 0, 1];
export const stick_180_position = [-100, 0, 100];
export const stick_270_position = [-1, 0, 1];

// L字型
export const L_0_position = [-102, -2, -1, 0, 1];
export const L_90_position = [-100, 0, 100, 199, 200];
export const L_180_position = [-1, 0, 1, 2, 102];
export const L_270_position = [-200, -199, -100, 0, 100];

// 親指型
export const thumb_0_position = [-100, -1, 0, 99, 100];
export const thumb_90_position = [-1, 0, 1, 100, 101];
export const thumb_180_position = [-100, -99, 0, 1, 100];
export const thumb_270_position = [-101, -100, -1, 0, 1];

// ヘビ型
export const snake_0_position = [-101, -1, 0, 100];
export const snake_90_position = [-100, -99, -1, 0];
export const snake_180_position = [-101, -1, 0, 100];
export const snake_270_position = [-100, -99, -1, 0];

// 凸型
export const convex_0_position = [0, -99, 1, 101];
export const convex_90_position = [-101, -100, -99, 0];
export const convex_180_position = [-101, -1, 0, 99];
export const convex_270_position = [0, 99, 100, 101];

export enum BlockType {
    // 棒型
    Stick = 'stick',
    // L字型
    L = 'L',
    // 親指型
    Thumb = 'thumb',
    // ヘビ型
    Snake = 'snake',
    // 凸型
    Convex = 'convex',
}

// ブロックの全タイプをまとめた配列
export const block_types = [
    BlockType.Stick,
    BlockType.L,
    BlockType.Thumb,
    BlockType.Snake,
    BlockType.Convex,
];



export const stick_position = [
    stick_0_position,
    stick_90_position,
    stick_180_position,
    stick_270_position,
]

export const L_position = [
    L_0_position,
    L_90_position,
    L_180_position,
    L_270_position,
]

export const thumb_position = [
    thumb_0_position,
    thumb_90_position,
    thumb_180_position,
    thumb_270_position,
]

export const snake_position = [
    snake_0_position,
    snake_90_position,
    snake_180_position,
    snake_270_position,
]

export const convex_position = [
    convex_0_position,
    convex_90_position,
    convex_180_position,
    convex_270_position,
]

// ブロックのポジション情報を保有する連想配列
export const position = {
    stick: stick_position,
    L: L_position,
    thumb: thumb_position,
    snake: snake_position,
    convex: convex_position,
};

// 左右に動かす場合のポジションの調整値
export enum AdjustPosition {
    Left = -1,
    Right = 1,
}
