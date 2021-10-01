/* Blockの色をチェックするメソッドまとめ */
import { BlockType, StoneColor } from "./Othello"

export const isWhiteBlock = (block: BlockType) => block.color === StoneColor.White
export const isBlackBlock = (block: BlockType) => block.color === StoneColor.Black
export const isEmptyBlock = (block: BlockType) => block.color === StoneColor.Empty
export const isEmptyHintBlock = (block: BlockType) => block.color === StoneColor.EmptyHint

// 指定した色であるかどうか判定を返す
export const isThisColorBlock = (block: BlockType, thisColor: StoneColor) => block.color === thisColor

// 敵側の色を取得する
export const getEnemyColor = (playerColor: StoneColor) => playerColor === StoneColor.White ? StoneColor.Black : StoneColor.White

// スキップすべきか(emptyHintを一つでも持っているか)判定を返す
export const hasEmptyHint = (blocksInfo: BlockType[]): boolean => {
    return blocksInfo.some((block) => isEmptyHintBlock(block))
}

// 全てのブロックが埋まったかどうか判定を返す
export const hasEmptySpace = (blocksInfo: BlockType[]): boolean => {
    return blocksInfo.some((block) => (isEmptyHintBlock(block) || isEmptyBlock(block)))
}

// 白と黒のブロックの数をカウントする
export const getCountColor = (blocksInfo: BlockType[]): { white: number, black: number } => {
    let whiteCount = 0, blackCount = 0
    blocksInfo.map((block) => {
        if (isWhiteBlock(block)) {
            whiteCount++
        }
        else if (isBlackBlock(block)) {
            blackCount++
        }
    })
    return {
        white: whiteCount,
        black: blackCount
    }
}
