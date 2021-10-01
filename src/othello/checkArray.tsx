import { blockIDs as defaultBlockIDs } from './blockIDs';
import { BlockType, SroundStoneObject, StoneColor } from "./Othello";
import { getEnemyColor, isThisColorBlock } from "./checkColor";



export const checkArray = (activeColor: StoneColor, check_array: number[], blockInfo: BlockType[], sround_stone: SroundStoneObject): SroundStoneObject => {
    /**
     * @param {Array} check_array チェック対象リスト（左右上下斜めのリストがわたってくる）
     * 左右上下斜めのリストから、置けるかどうか判定する。
     * 空か、自分の色に挟まれていない場合は石が置けないため、チェック対象外。
     * 石が置ける場合は、中に挟まれている石のindexをsround_stone_arrayに追加する。
     **/
    const blockIDs: number[] = defaultBlockIDs
    // 挟まれた内側の石の色を反転するときに使用するリストを作成する
    // let sround_stone_array: number[] = []

    for (let i = 0; i < check_array.length; i++) {
        let check_id = check_array[i]
        // blockIDsの配列の半番目にcheck_idが入っているか、数を返す
        let blockIDsIdx = blockIDs.findIndex(blockID => blockID === check_id)
        const block = blockInfo[blockIDsIdx]
        const enemyColor = getEnemyColor(activeColor)

        if (i === 0) {
            //１つ目のマスの処理
            if (!isThisColorBlock(block, enemyColor)) {
                // 1つ目が敵の石では無い(=つまり、空かプレイヤーカラーのどちらか)場合は、break
                return sround_stone
            }
        } else {
            //2つ目以降のマスの処理
            if (isThisColorBlock(block, activeColor)) {
                // 過去に置いた自分の石で挟まれている場合は、もう置けないのでbreak
                return sround_stone
            }
            if (isThisColorBlock(block, enemyColor)) {
                // 敵の石がある場合は、continue
                continue;
            }
            // EmptyHintに上書き処理
            block.color = StoneColor.EmptyHint
            if (sround_stone[block.blockID] === undefined) {
                sround_stone[block.blockID] = []
            }

            // クリック時にプレイヤーの色に変えられるBlackのリストを作成
            for (i; i >= 0; i--) {
                sround_stone[block.blockID].push(check_array[i]);
            }
            return sround_stone
        }
    }
    return sround_stone
}
