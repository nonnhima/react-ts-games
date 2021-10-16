import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useKey } from 'react-use';
import { Footer } from "../othello/Footer";
import { Meta } from "./Meta";
import { NextBlock } from './nextBlock';
import { Row } from './Row';
import { Score } from './Score';
import './Tetris.css';
import { AdditionalClassType, AdjustPosition, BlockType, block_types, position } from './tetrisInfo';

export const max_height = 22; // 縦22マス
export const max_width = 12; // 横12マス

export interface BlocksInfoType {
    blockID: number
    class: BlockType
    // ブロックの色以外の状態変化用クラス。
    // （これから消える行が薄く表示されたり、石版下における範囲を白く表示したりする）
    additionalClass: AdditionalClassType
    isActive: boolean
}

export type LotationIndex = 0 | 1 | 2 | 3

// 横のマス分の数字の配列を作成 (例：[101,102,103,104...112,201,...212])
let numbers: number[] = Array(max_width).fill(0).map((v, i) => i + 1);
let blocksIDs: number[] = []
Array(max_height).fill(0).map((val, idx) =>
    numbers.map((value) => {
        blocksIDs.push(value + 100 * (idx + 1))
    })
)

let blocksInfo: BlocksInfoType[] = []
blocksIDs.map((val, idx) => {
    blocksInfo.push({
        blockID: val,
        // 初期値は'default'
        class: BlockType.Default,
        additionalClass: AdditionalClassType.Default,
        // 動かすことができるブロックであるかどうか。初期値はfalse
        isActive: false
    })
})

// ブロックの基準となるスタート地点(デフォルトは207)
let defaultPosition = 207;
// アクティブなblock_typesのindex。(0～4。初期値は0)
let activeBlockIdx = 0;

// 列を削除した回数
let goalTimes = 0;

// 0～4までのランダムな数値を取得する(NEXT Blockの指定に利用する)
let random = Math.floor(Math.random() * block_types.length);

// ゲームオーバー状態
let is_game_over = false;

// ローテーションのindex（0～3）のデフォルト値の設定
let lotationIndex: LotationIndex = 0

// bodyタグにクラス付与
document.body.className = 'tetris'

export const Tetris = () => {

    // 一番下に置くことができるブロックのID：初期値はなんでも良い
    let max_bottom_default_position: number = max_height * 100 + max_width;

    // 今から出力するブロックのクラス名を更新
    let activeClassName: BlockType = block_types[activeBlockIdx];

    // タイマー
    const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
        useStopwatch({ autoStart: true });

    const ArrowDown = () => {
        // ↓下方向
        drop(max_bottom_default_position)
    }
    const ArrowLeft = () => {
        // ←左方向
        moveToDirection(false);
    }
    const ArrowRight = () => {
        // →右方向
        moveToDirection(true);
    }
    const Less = () => {
        // ＜左回転
        const new_lotation_index = lotationIndex + 1;
        let newLotationIndex: LotationIndex = 0
        if (new_lotation_index < 0) {
            // new_lotation_indexが0未満になる場合、new_lotation_indexを最小値（0）にする
            newLotationIndex = 3;
        } else if (new_lotation_index === 0 || new_lotation_index === 1 || new_lotation_index === 2 || new_lotation_index === 3) {
            newLotationIndex = new_lotation_index
        }
        rotate(newLotationIndex);
    }

    const More = () => {
        // ＞右回転
        const new_lotation_index = lotationIndex - 1;
        let newLotationIndex: LotationIndex = 0
        if (new_lotation_index < 0) {
            // new_lotation_indexが0未満になる場合、new_lotation_indexを最大値（3）にする
            newLotationIndex = 3;
        } else if (new_lotation_index === 0 || new_lotation_index === 1 || new_lotation_index === 2 || new_lotation_index === 3) {
            newLotationIndex = new_lotation_index
        }
        rotate(newLotationIndex);
    }

    useKey('ArrowDown', ArrowDown);
    useKey('ArrowLeft', ArrowLeft);
    useKey('ArrowRight', ArrowRight);
    // < クリック
    useKey(`,`, Less);
    // >　クリック
    useKey(`.`, More);

    const rotate = (new_lotation_index: LotationIndex) => {
        /**
         * @param {number} new_lotation_index 新しいlotation_index
         * ブロックの回転処理
         **/
        if (!hasActiveBlock()) {
            // アクティブ状態のブロックが存在していない場合、何もしない
            return;
        }
        activeClassName = block_types[activeBlockIdx];
        if (!checkValidPosition(activeClassName, defaultPosition, new_lotation_index)) {
            // 回転させることができない場合、何もしない
            return;
        }
        // lotation_indexを新しい値に上書きする
        lotationIndex = new_lotation_index
        // ブロックの移動先にクラスを付与し、アクティブ状態にする
        nextBlockActive(activeClassName);
        // ブロックを置くことができる最も低いpositionを表示する
        displayMaxBottomPosition(activeClassName);
    }

    const moveToDirection = (isLeft: boolean) => {
        /**
         * @param {string} direction 左右の情報。 'left' or 'right'
         * ブロックの位置を左右どちらかの方向に移動させる
         **/
        if (!hasActiveBlock()) {
            // アクティブ状態のブロックが存在しない場合、何もしない
            return;
        }
        activeClassName = block_types[activeBlockIdx];
        const adjustPosition = isLeft ? AdjustPosition.Left : AdjustPosition.Right
        if (!checkValidPosition(activeClassName, defaultPosition + adjustPosition)) {
            // ブロックを移動先に動かすことができない場合、何もしない
            return;
        }
        // default_positionを更新する
        defaultPosition += adjustPosition;

        // ブロックの移動先にクラスを付与し、アクティブ状態にする
        nextBlockActive(activeClassName);
        // ブロックを置くことができる最も低いpositionを白い外枠で囲み表示する
        displayMaxBottomPosition(activeClassName);
    }

    // blocksInfoの中に動かすことができるブロックであるかどうか (isActive=true)を返す。
    const hasActiveBlock = () => {
        for (let i = 0; i < blocksInfo.length; i++) {
            if (blocksInfo[i].isActive) {
                return true
            }
        }
        return false
    }

    const drawNewBlock = () => {
        if (hasActiveBlock()) {
            return;
        }
        // デフォルトポジションをデフォルト値にリセット
        // setDefaultPosition(207)
        defaultPosition = 207
        // ローテーションのindexをデフォルト値にリセット
        lotationIndex = 0;

        if (!checkValidPosition(activeClassName, defaultPosition)) {
            // デフォルトポジションに新しいブロックを置くことができない場合、ゲームオーバーにする
            pause();
            is_game_over = true;
            // 白く表示されているブロックがあれば、元に戻す
            blocksInfo.map((blockInfo) => {
                blockInfo.additionalClass = AdditionalClassType.Default
            })
            alert('GAME OVER!\n\nブロックを置くことができなくなりました。もう一度遊ぶ場合はブラウザをリロードしてください。\nIf you reload the browser, you can play the game again.');
            return;
        }

        activeClassName = block_types[activeBlockIdx];

        // 移動先のブロックにクラスを付与し、アクティブ状態にする
        nextBlockActive(activeClassName);
        // ブロックを置くことができる最も低いpositionを白枠で表示する
        displayMaxBottomPosition(activeClassName);
    }

    // 移動先のブロックにクラスを付与し、アクティブ状態にする
    const nextBlockActive = (activeClassName: BlockType) => {

        // ブロックを1マス進めるため、現在のアクティブ状態のブロックをdefault状態に戻す
        for (let i = 0; i < blocksInfo.length; i++) {
            if (blocksInfo[i].isActive) {
                blocksInfo[i].isActive = false
                blocksInfo[i].class = BlockType.Default
            }
        }
        // ブロックの移動先にクラスを付与し、アクティブ状態にする
        position[activeClassName][lotationIndex].map((adjustID) => {
            const targetBlockID = defaultPosition + adjustID

            // blockIDsの配列の何番目にcheck_idが入っているか、数を返す
            const targetBlockIDsIdx = blocksIDs.findIndex(blockID => blockID === targetBlockID)
            // 指定したブロックIDのClassとisActiveを、指定した値に書き換える
            blocksInfo[targetBlockIDsIdx].class = activeClassName
            blocksInfo[targetBlockIDsIdx].isActive = true
        })
    }

    const checkValidPosition = (activeClassName: BlockType, nextDefaultPosition: number, newLotationIndex?: LotationIndex) => {
        // 与えられた条件で、ブロックを置くことができるか判定をかえす。移動先にブロックを置くことができる場合は、Trueを返す。
        if (newLotationIndex === undefined) {
            // newLotationIndex=ローテーションのindex（0～3）。指定がない場合、lotation_indexを使う
            newLotationIndex = lotationIndex
        }
        for (let i = 0; i < position[activeClassName][newLotationIndex].length; i++) {
            const targetBlockID = position[activeClassName][newLotationIndex][i]
            let nextPositionBlockID = nextDefaultPosition + targetBlockID
            if (nextPositionBlockID % 100 <= 0 || max_width + 1 <= nextPositionBlockID % 100 ||
                Math.floor(nextPositionBlockID / 100) <= 0 || max_height < Math.floor(nextPositionBlockID / 100)) {
                // 移動先のブロックが、ボードの範囲外だった場合
                return false;
            }
            if (isNotEmpty(nextPositionBlockID)) {
                // 移動先に、すでにアクティブ状態ではないブロックが置かれていた場合
                return false;
            }
        };
        return true;
    }

    const isNotEmpty = (targetBlockID: number): boolean => {
        // blockIDsの配列の何番目にtargetBlockIDが入っているか、数を返す
        const targetBlockIDsIdx = blocksIDs.findIndex(blockID => blockID === targetBlockID)
        const targetBlocksInfo: BlocksInfoType = blocksInfo[targetBlockIDsIdx]
        // 指定のブロックがアクティブ状態でない、かつ、クラスがデフォルト以外の場合は、trueを返す
        if (!targetBlocksInfo.isActive && targetBlocksInfo.class !== BlockType.Default) {
            return true
        }
        return false
    }

    // ブロックを置くことができる最も低いpositionを白い外枠で囲み、表示する。
    const displayMaxBottomPosition = (activeClassName: BlockType) => {
        // すでに白く表示されているブロックがあれば、元に戻す
        blocksInfo.map((blockInfo) => {
            blockInfo.additionalClass = AdditionalClassType.Default
        })

        // 現在のブロックのtypeで、最も底辺のポジションを取得
        let maxBottomPosition = Math.max(...position[activeClassName][lotationIndex]);

        for (var i = defaultPosition + 100; i < max_height * 100 + max_width; i += 100) {
            if (!checkValidPosition(activeClassName, i)) {
                // 実際に置けるのはiの1行上のため、ここで100を引く
                i -= 100;
                break;
            }
            if (Math.floor((i + maxBottomPosition) / 100) === max_height) {
                // ブロックが一部が最も低い行に到達した場合は、breakする
                break;
            }
        }
        // max_bottom_default_positionを更新する
        max_bottom_default_position = i;

        // ブロックを置くことができる最も低いpositionを白い外枠で囲み、表示する
        position[activeClassName][lotationIndex].map((adjustID: number) => {
            const targetBlockID = max_bottom_default_position + adjustID

            // blockIDsの配列の何番目にcheck_idが入っているか、数を返す
            const targetBlockIDsIdx = blocksIDs.findIndex(blockID => blockID === targetBlockID)
            // ブロックの移動先にクラスを付与し、アクティブ状態にする
            blocksInfo[targetBlockIDsIdx].additionalClass = AdditionalClassType.MaxBottom
        })
    }

    const drop = (new_default_position: number) => {
        /**
         * @param {number} new_default_position ブロックの移動先のdefault_position
         * ブロックの落下処理。
         **/
        console.log(`new_default_positionは「${new_default_position}」`)
        if (!hasActiveBlock()) {
            // アクティブ状態のブロックが存在していない場合、何もしない
            return;
        }
        if (!checkValidPosition(activeClassName, new_default_position)) {
            // ブロックを下に動かせない場合
            resetBlocksColor()
            return;
        }
        // default_positionを更新する
        defaultPosition = new_default_position

        // ブロックの移動先にクラスを付与し、アクティブ状態にする
        nextBlockActive(activeClassName);

        if (!checkValidPosition(activeClassName, defaultPosition + 100)) {
            // ブロックを下に動かせない場合
            resetBlocksColor()
            return;
        }
    }

    const resetBlocksColor = () => {
        // ブロックを下に動かせない場合の処理
        activeBlockIdx = random
        lotationIndex = 0

        for (let i = 0; i < blocksInfo.length; i++) {
            let thisActiveColor = BlockType.Default
            // 現在isActive=trueのブロックをすべてfalseにする
            if (blocksInfo[i].isActive) {
                blocksInfo[i].isActive = false
                thisActiveColor = blocksInfo[i].class
            }
            // 白い枠で表示されているブロックがあれば、元に戻す
            if (blocksInfo[i].additionalClass === AdditionalClassType.MaxBottom) {
                blocksInfo[i].additionalClass = AdditionalClassType.Default
                blocksInfo[i].class = thisActiveColor
            }
        }
        // defaultPositionを初期値にリセット
        defaultPosition = 207

        // 0～4までのランダムな数値を取得して、nextBlockIdxを上書き(NEXT Blockの指定に利用する)
        random = Math.floor(Math.random() * block_types.length);
    }

    React.useEffect(() => {
        const id = setInterval(() => {
            if (!is_game_over) {
                drawNewBlock();
                // active状態のブロックを一つ下に下げる処理
                drop(defaultPosition + 100);
                delate();
            }
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const delate = () => {
        for (let column = 1; column <= max_height; column++) {
            let can_delate = true;

            for (let row = 1 + 100 * column; row % 100 <= max_width; row++) {
                // blockIDsの配列の何番目にcheck_idが入っているか、数を返す
                const targetBlockIDsIdx = blocksIDs.findIndex(blockID => blockID === row)
                if (blocksInfo[targetBlockIDsIdx].class === BlockType.Default || blocksInfo[targetBlockIDsIdx].isActive) {
                    can_delate = false;
                }
            }
            if (!can_delate) {
                continue;
            }
            let can_delate_array = Array.from(Array(max_width)).map((v, i) => i + 1 + 100 * column)
            let targetBlockIDsIdxList = [];
            for (let i = 0; i < can_delate_array.length; i++) {
                // blockIDsの配列の何番目にcheck_idが入っているか、数を返す
                const targetBlockIDsIdx = blocksIDs.findIndex(blockID => blockID === can_delate_array[i])
                blocksInfo[targetBlockIDsIdx].additionalClass = AdditionalClassType.Delate
                targetBlockIDsIdxList.push(targetBlockIDsIdx)
            }

            const delateBlocks = (column: number, targetBlockIDsIdxList: number[]) => {
                /**
                 * @param {number} column 削除された行のdata-position（100の位）
                 * ブロックの削除処理。
                 **/
                // ブロックが揃った1行を削除する
                for (let i = 0; i < targetBlockIDsIdxList.length; i++) {
                    blocksInfo[targetBlockIDsIdxList[i]].additionalClass = AdditionalClassType.Default
                    blocksInfo[targetBlockIDsIdxList[i]].class = BlockType.Default
                }

                // 上にあるブロックを下に移動させる
                for (let drop_column = column - 1; drop_column >= 1; drop_column--) {
                    let empty_count = 0;
                    for (let drop_row = 1 + 100 * drop_column; drop_row % 100 <= max_width; drop_row++) {
                        // blockIDsの配列の何番目にdrop_rowが入っているか、数を返す
                        const targetBlockIDsIdx = blocksIDs.findIndex(blockID => blockID === drop_row)
                        if (blocksInfo[targetBlockIDsIdx].isActive || blocksInfo[targetBlockIDsIdx].class === BlockType.Default) {
                            empty_count++;
                            continue;
                        }

                        let this_class = blocksInfo[targetBlockIDsIdx].class;
                        // そのブロックをdefaultにする
                        blocksInfo[targetBlockIDsIdx].class = BlockType.Default

                        // 1つ下のブロックに移動させる
                        const downTargetBlockIDsIdx = blocksIDs.findIndex(blockID => blockID === drop_row + 100)
                        blocksInfo[downTargetBlockIDsIdx].class = this_class
                    }
                    if (empty_count === max_width) {
                        // 横1行すべてdefaultだった場合、それより上の行の移動処理は行わない
                        break;
                    }
                }
            }

            // 0.2秒後に削除処理を実行する
            setTimeout(delateBlocks, 200, column, targetBlockIDsIdxList);
            // 行を削除したカウントを更新
            goalTimes++;        
        }
        if (hasActiveBlock()) {
            // アクティブ状態のブロックが存在している場合、
            // ブロックを置くことができる最も低いpositionを白い外枠で囲み表示する
            displayMaxBottomPosition(activeClassName);
        }
    }

    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Economica:700" rel="stylesheet" />
            <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet" />
            {/* メタ情報 */}
            <Meta />
            {/* ここからBody */}
            <div className="left_area">
                <table id="board">
                    {/* ここに左のブロックを描画 */}
                    {/* heightの数だけループ */}
                    {Array(max_height).fill(0).map((val, idx) =>
                        <Row idx={idx} blocksInfo={blocksInfo} />
                    )}
                </table>
                {/* フッター（HOMEボタン） */}
                <Footer isGray={true} />
            </div>
            <div className="right_area">
                <div className="next_block_area">
                    <h2>NEXT BLOCK</h2>
                    <NextBlock nextIdx={random} />
                </div>

                {/* 遊び方説明 */}
                <div className="how_to_area">
                    <h2>HOW TO PLAY <i className="fas fa-keyboard"></i></h2>
                    <div><span className="keyboard"><i className="fas fa-long-arrow-alt-left"></i></span> <span className="keyboard"><i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i></span> Move left and right</div>
                    <div><span className="keyboard"><i className="fas fa-long-arrow-alt-down" aria-hidden="true"></i></span> 下にスキップ Skip to bottom</div>
                    <div><span className="keyboard"><i className="fa fa-chevron-left" aria-hidden="true"></i></span> 左回転 Left rotation</div>
                    <div><span className="keyboard"><i className="fa fa-chevron-right" aria-hidden="true"></i></span> 右回転 Right rotation</div>
                </div>

                {/* スコア表示 */}
                <Score seconds={String(seconds).padStart(2, '0')} minutes={String(minutes).padStart(2, '0')} hours={String(hours).padStart(2, '0')} goalTimes={goalTimes} />
            </div>
        </div>
    )
}