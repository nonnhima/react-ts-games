import { getIndexOfBlockIDs } from "./blockIDs"
import { BlockType, StoneColor } from "./Othello"

export const updateInsideStones = (activeColor: StoneColor, targetBlockID: number, blockInfo: BlockType[]) => {
    // rangeArrayの中からクリックされたブロックのindexを取得
    const targetIdx = getIndexOfBlockIDs(targetBlockID)
    // targetBlockIDをプレイヤーの色に上書きする
    blockInfo[targetIdx].color = activeColor
}