import { BlockType, StoneColor } from "./Othello";

export const getRandomBlockID = (blocksInfo: BlockType[]): number => {
    // クリック対象のブロック情報（EmptyHintのマス）を取得する
    const clickableBlocks = blocksInfo.filter((block) => block.color === StoneColor.EmptyHint)
    // その中から、ランダムで一つのブロック対象を選択する
    const selectedBlock = clickableBlocks[Math.floor(Math.random() * clickableBlocks.length)];
    // blockIDを返す
    return selectedBlock.blockID
}