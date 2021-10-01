import React, { useEffect, useState } from 'react';
import { updateInsideStones } from './updateInsideStones';
import { BlockMaxInfo, getDefaultBlockInfo, getMaxRangeList } from './blockIDs';
import { Board } from './Board';
import { checkArray } from './checkArray';
import { getCountColor, hasEmptyHint, hasEmptySpace, isEmptyHintBlock, isThisColorBlock } from './checkColor';
import { FinishPopup } from './FinishPopup';
import { Footer } from './Footer';
import { getRandomBlockID } from './getRandomBlockID';
import { Header } from './Header';
import { Meta } from './Meta';
import './Othello.css';
import { StartPopup } from './StartPopup';

export enum StoneColor {
    White = 'white',
    Black = 'black',
    Empty = 'empty',
    EmptyHint = 'empty_hint' // 石を置けるマスを、黄色背景で表示する
}

export interface BlockType {
    blockID: number
    color: StoneColor
}

// 内側のブロックをプレイヤーの色に置き換えるためのリストの型定義
export interface SroundStoneInfo {
    blockID: number
    sround_stone: SroundStoneObject
}

export interface SroundStoneObject {
    [key: number]: number[]
}

// 初回描画時のデフォルトのブロックリストを取得する
let blockInfo: BlockType[] = getDefaultBlockInfo()

// 左右上下のリスト。不変なのでBodyコンポーネントの外で定義する
const blockMaxInfo: BlockMaxInfo[] = getMaxRangeList()

export const Othello = () => {
    // bodyタグにクラス付与
    document.body.className = 'othello'

    // カウンター（初期値は2）
    const [whiteCount, setWhiteCount] = useState(2)
    const [blackCount, setBlackCount] = useState(2)

    // スキップカウント（白と黒、両方置けなくなったときのために使う）
    const [skipCount, setSkipCount] = useState(0)
    // 先攻（白）か後攻（黒）を選ぶポップアップを表示するかどうか判定
    const [showStartPopup, setShowStartPopup] = useState(true)

    // 試合終了フラグ
    const [isFinished, setIsFinished] = useState(false)
    // 試合終了ポップアップの表示フラグ
    const [showFinishPopup, setShowFinishPopup] = useState(false)


    /* 固定(一度選択肢を選んだらゲーム終了まで値が変わらないステート) */
    // MEMO 先攻：白、後攻：黒
    // 敵のカラー（初期値は黒）
    const [enemyColor, setEnemyColor] = useState(StoneColor.Black)

    /* 可変(ゲーム中も値が変更するステート) */
    // 今のターンのカラー（初期値は白）
    const [activeColor, setActiveColor] = useState(StoneColor.White)
    // 次のプレイヤーのカラー（初期値は黒）
    const [nextColor, setNextColor] = useState(StoneColor.Black)

    // そのブロックをクリックすると、どのブロックを自分の色にひっくりかえすことができるかの情報を保持したリスト
    let sroundStoneArray: SroundStoneInfo[] = []

    // 初期選択でプレイヤーが白（先攻）を選んだ場合
    const playerChooseWhite = () => {
        // 先攻（白）か後攻（黒）を選ぶポップアップを表示するかどうか判定をfalseに切り替える
        setShowStartPopup(false)
    }

    // ゲーム終了ポップアップの削除時の処理
    const clickClose = () => {
        // ゲーム終了ポップアップ表示判定をfalseに書き換え
        setShowFinishPopup(false)
    }

    // 初期選択でプレイヤーが黒（後攻）を選んだ場合
    const playerChooseBlack = () => {
        // 次のカラーを黒, 敵カラーを白　にする
        setNextColor(StoneColor.Black)
        setEnemyColor(StoneColor.White)
        // 先攻（白）か後攻（黒）を選ぶポップアップを表示するかどうか判定をfalseに切り替える
        setShowStartPopup(false)
    }

    // スキップ時の処理まとめ
    const shouldSkipTerm = () => {
        // アラートを表示
        alert(`${activeColor}のターンで石を置くことができないため${nextColor}のターンにスキップします。\n\n${activeColor} cannot make a valid move.Play passes back to ${nextColor}.`)
        // プレイヤーカラーを敵の色に変更する
        setActiveColor(nextColor)
        setNextColor(activeColor)
        // スキップカウントを+1する
        setSkipCount(skipCount + 1)
    }

    // ブロックごとにEmptyHint情報を保持させたblockInfoを返す（初回描画時は、EmptyHint情報は不要なので含まれない）
    const getBlockInfo = (): BlockType[] => {
        if (showStartPopup) {
            // ページ初回描画時（最初のポップアップが表示されるタイング）ではEmptyHintの上書きをしない
            return blockInfo;
        }
        // let copyBlockInfo = blockInfo.slice()
        blockInfo.map((block, idx) => {
            if (isEmptyHintBlock(block)) {
                // EmptyHintをEmptyにリセットする（あとで最新版EmptyHintに書き換える）
                block.color = StoneColor.Empty
            }
        })

        blockInfo.map((block, idx) => {
            let sround_stone: SroundStoneObject = {}

            if (!isThisColorBlock(block, activeColor)) {
                // 起点となる1マス目が自分の色じゃない場合は、後続のチェック処理が不要ないので、continueする
                return block;
            }
            const maxInfo = blockMaxInfo[idx]

            // その場所に石を置けるかどうか判定する。置ける場合はEmptyHintのカラーに上書きする
            sround_stone = checkArray(activeColor, maxInfo.left_max, blockInfo, sround_stone);
            sround_stone = checkArray(activeColor, maxInfo.left_top_max, blockInfo, sround_stone);
            sround_stone = checkArray(activeColor, maxInfo.top_max, blockInfo, sround_stone);
            sround_stone = checkArray(activeColor, maxInfo.right_top_max, blockInfo, sround_stone);
            sround_stone = checkArray(activeColor, maxInfo.right_max, blockInfo, sround_stone);
            sround_stone = checkArray(activeColor, maxInfo.right_bottom_max, blockInfo, sround_stone);
            sround_stone = checkArray(activeColor, maxInfo.bottom_max, blockInfo, sround_stone);
            sround_stone = checkArray(activeColor, maxInfo.left_bottom_max, blockInfo, sround_stone);
            sroundStoneArray.push({
                blockID: block.blockID,
                sround_stone: sround_stone
            })
        })
        return blockInfo
    }

    // クリックした場所と内側の全てのブロックをプレイヤーのカラーに書き換える
    const updateInsideBlocks = (clickedBlockID: number) => {
        sroundStoneArray.map((sroundInfo) => {
            // クリックできる範囲のブロックのリストを抽出してloop
            const clickableIDs: string[] = Object.keys(sroundInfo.sround_stone)
            clickableIDs.map((clickableID, idx) => {
                let numClicableID = Number(clickableID)
                if (numClicableID !== clickedBlockID) {
                    return false;
                }
                sroundInfo.sround_stone[numClicableID].map((targetBlockID, index) => {
                    updateInsideStones(activeColor, targetBlockID, blockInfo)
                })
            })
        })
        return blockInfo
    }

    // クリックした場所と内側の全てのブロックをプレイヤーのカラーに書き換える
    const clickEmptyHint = (blockID: number) => {
        const updatedBlockInfo = updateInsideBlocks(blockID)
        // BlocksInfoのStateを更新
        setBlocksInfo(updatedBlockInfo)

        // プレイヤーカラーを敵の色に変更する
        setActiveColor(nextColor)
        setNextColor(activeColor)

        // 白と黒のカウント結果を取得してSetする
        const countResult = (getCountColor(blocksInfo))
        setWhiteCount(countResult.white)
        setBlackCount(countResult.black)

        // スキップカウントを初期値の0に戻す
        setSkipCount(0)
    }

    // blocksInfoのState
    const [blocksInfo, setBlocksInfo] = useState(getBlockInfo())

    useEffect(() => {
        if (isFinished) {
            // 試合が終了した状態であれば、以下の処理はスキップする
            return;
        }
        if (!showStartPopup && !hasEmptySpace(blocksInfo)) {
            // 全ブロックが埋まったら試合終了のポップアップを表示する
            setIsFinished(true)
            setShowFinishPopup(true)
            return
        }
        if (skipCount >= 2) {
            // 白と黒の両方がスキップになったら、
            // 全面が埋まっていなくてもその時点で試合を終了させる（ブロック数が多いほうが勝ち）
            setIsFinished(true)
            setShowFinishPopup(true)
            return
        }
        if (skipCount < 2 && !showStartPopup && !hasEmptyHint(blocksInfo)) {
            // スキップ処理
            shouldSkipTerm()
            return
        }
        if (activeColor === enemyColor) {
            // 0.8秒後に、敵のターンに置き換える
            const randomBlockID = getRandomBlockID(blocksInfo)
            setTimeout(clickEmptyHint
                , 800, randomBlockID
            );
        }
    }, [clickEmptyHint])

    return (<div>
        <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet" />
        {/* meta情報 */}
        <Meta />
        {/* 白と黒のカウント表示 */}
        <Header whiteCount={whiteCount} blackCount={blackCount} />
        {/* ボード */}
        <Board blocks={blocksInfo} clickEmptyHint={clickEmptyHint} isEnemy={enemyColor === activeColor} />
        {/* フッター（HOMEボタン） */}
        <Footer />
        {/* ゲーム開始時ポップアップ */}
        <StartPopup showStartPopup={showStartPopup} playerChooseWhite={playerChooseWhite} playerChooseBlack={playerChooseBlack} />
        {/* ゲーム終了時ポップアップ */}
        <FinishPopup showFinishPopup={showFinishPopup} isFinished={isFinished} clickClose={clickClose} whiteCount={whiteCount} blackCount={blackCount} />
    </div>)
}
