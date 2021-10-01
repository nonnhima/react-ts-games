import { BlockType, StoneColor } from "./Othello";

export interface BlockMaxInfo {
    left_max: number[];
    left_top_max: number[];
    top_max: number[];
    right_top_max: number[];
    right_max: number[];
    right_bottom_max: number[];
    bottom_max: number[];
    left_bottom_max: number[];
}

// 初期画面表示時の白黒ブロックの配置場所
export const defaultWhiteNumbers = [34, 43]
export const defaultBlackNumbers = [33, 44]

export const getBlockIDs = (): number[] => {
    // オセロのボード（マス）出力用の配列を用意
    let blockIDs: number[] = [];
    const baseNumbers = Array(6).fill(0).map((val, index) => index + 1)
    // 左上から、11,12,13,14,15,16,21,22... のように、6マス×6行のマスを管理する数字の配列を作成
    Array(6).fill(0).map((v, i) => {
        let numberList = baseNumbers.map((val) => val + 10 * (i + 1));
        blockIDs = blockIDs.concat(numberList)
        return false
    });
    return blockIDs;
}

export const blockIDs: number[] = getBlockIDs()

// blockIDsの配列の何番目に指定した値が入っているか、数を返す
export const getIndexOfBlockIDs = (val: number) => blockIDs.indexOf(val)

// 初期のブロック情報（白と黒が2つすでに配置された状態）のブロック情報を作成して返す。
// （EmptyHintの処理は後で行う。ここでは行わない）
export let getDefaultBlockInfo = (): BlockType[] =>
    blockIDs.map((blockID) => {
        let color = StoneColor.Empty
        // デフォルトで白を設置する場所には白のブロックを配置
        if (defaultWhiteNumbers.includes(blockID)) {
            color = StoneColor.White
        }
        // デフォルトで黒を設置する場所には白のブロックを配置
        else if (defaultBlackNumbers.includes(blockID)) {
            color = StoneColor.Black
        }
        // ブロック情報の配列を作成して返す
        return {
            blockID: blockID,
            color: color,
        }
    })


// 上下左右斜めの配置できる範囲のブロックID情報を取得する
export const getMaxRangeList = (): BlockMaxInfo[] => {
    const getMaxRange = (blockID: number, num: number): number[] => {
        let max_array = []
        for (let i = 1; i < 6; i++) {
            let surround_index = blockID + num * i;
            if (7 < surround_index / 10 || surround_index / 10 < 1 || surround_index % 10 < 1 || 6 < surround_index % 10) {
                break;
            }
            max_array.push(surround_index);
        }
        return max_array
    }
    // 上下左右斜めの配置できる範囲のブロックID情報を配列にして返す
    return blockIDs.map((blockID: number) =>
    ({
        left_max: getMaxRange(blockID, -1),
        left_top_max: getMaxRange(blockID, -11),
        top_max: getMaxRange(blockID, -10),
        right_top_max: getMaxRange(blockID, -9),
        right_max: getMaxRange(blockID, 1),
        right_bottom_max: getMaxRange(blockID, 11),
        bottom_max: getMaxRange(blockID, 10),
        left_bottom_max: getMaxRange(blockID, 9),
    })
    )
}


