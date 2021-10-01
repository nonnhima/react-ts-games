import React, { useEffect, useState } from 'react';
import { useStopwatch } from "react-timer-hook";
import { Footer } from '../othello/Footer';
import { Card } from './Card';
import { FinishPopup } from './FinishPopup';
import { checkMostValue, getDefaultCardInfo, getShuffledIDs, total_pair_count } from './getCardInfo';
import { getClickScore, getTimeScore } from './getScore';
import './MemoryGame.css';
import { Meta } from './Meta';
import { StartPopup } from './StartPopup';
import { TimeCounter } from './TimeCounter';


export interface BoardProps {
    // finishGame: (clickedCardIDList: number[]) => void
    setMostClickedCardID: (mostValue: number) => void
    setTotalClickCount: (totalCount: number) => void
    setIsFinishGame: (flag: boolean) => void
    pause: () => void
}

export interface cardInfo {
    cardID: number
    status: CardStatus
}

export enum CardStatus {
    Default = '',
    Clicked = 'clicked',
    Paired = 'paired',
}

export enum ScoreType {
    S = 'S',
    A = 'A',
    B = 'B',
    C = 'C',
}

// シャッフルしたカードIDリスト
const shuffledIDs: number[] = getShuffledIDs()

// クリックされたカードIDリスト（ゲーム終了後に最も多くクリックした画像を表示するのに利用する）
const clickedCardIDList: number[] = []

// カード情報リスト。カードID、status（クリックされたか、ペアになったか）を保持
const cardInfoArray: cardInfo[] = getDefaultCardInfo(shuffledIDs)

export const MemoryGame = () => {
    // bodyタグにクラス付与
    document.body.className = 'memoryGame'

    // タイマー
    const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
        useStopwatch({ autoStart: false });

    // ゲーム開始フラグ。trueになった時点でゲーム開始する
    const [startGame, setStartGame] = useState(false)
    // ゲーム終了フラグ。ゲーム終了の時点でtrueにする
    const [isFinishGame, setIsFinishGame] = useState(false)
    // ゲーム終了ポップアップの表示フラグ
    const [showFinishPopup, setShowFinishPopup] = useState(false)

    // タイムスコア
    const [timeScore, setTimeScore] = useState(ScoreType.C)
    // クリックスコア
    const [clickScore, setClickScore] = useState(ScoreType.C)

    // 最もクリックされたカードID
    const [mostClickedCardID, setMostClickedCardID] = useState(0)
    // 総クリック回数
    const [totalClickCount, setTotalClickCount] = useState(0)


    // 最初にクリックされたカードのidx
    const [firstClickIdx, setFirstClickIdx] = useState(99)
    // クリック回数（2枚ずつめくらせるために使用する。2回クリックされたら初期値0にリセットする）
    const [countClick, setCountClick] = useState(0)
    // ペアになった枚数（例：1組揃ったら「2」としてカウント）
    const [countPair, setCountPair] = useState(0)
    // クリック判定（クリックされたらtrue）
    const [cardInfoList, setCardInfoList] = useState(cardInfoArray)


    // 全カードがクリック不可能かどうか判定（全カードがクリック不可能ならtrue）
    // カードをめくるアニメーションの間にクリックされると困るので、
    // ペア判定中は全部カードをクリック禁止にする。
    const [disable, setDisable] = useState(false)

    const clickedCard = (idx: number) => {
        // Stateのクリック回数を更新
        const newCountClick = countClick + 1
        setCountClick(newCountClick)

        let newCardInfoList = cardInfoList.slice()
        // クリックされたカードIDリストにカードIDを追加（終了ポップアップの「最もクリックした画像」に使用するため）
        clickedCardIDList.push(newCardInfoList[idx].cardID)

        // クリックしたカードのstatusをクリック状態にする
        newCardInfoList[idx].status = CardStatus.Clicked
        setCardInfoList(newCardInfoList)

        // クリック回数が1の場合(つまり、最初にカードがクリックされた場合)
        if (newCountClick === 1) {
            // 最初にクリックされたカードのidxをStateに保持
            setFirstClickIdx(idx)
            return
        }

        // クリック回数が2の場合(つまり、2枚目のカードがクリックされた場合)
        // ペア判定が終わるまでの間、全カードをクリック禁止にする
        setDisable(true)
        // クリックカウントを初期化
        setCountClick(0)

        // ペア成立の処理
        if (newCardInfoList[firstClickIdx].cardID === newCardInfoList[idx].cardID) {
            newCardInfoList[firstClickIdx].status = CardStatus.Paired
            newCardInfoList[idx].status = CardStatus.Paired
            setCountPair(countPair + 2)
            // 全カードをクリック禁止状態を解除
            setDisable(false)
            return
        }

        // 0.9秒後に表面（魚柄）に戻す処理
        const turnToFront = () => {
            newCardInfoList[firstClickIdx].status = CardStatus.Default
            newCardInfoList[idx].status = CardStatus.Default
            setCardInfoList(newCardInfoList)
            setDisable(false)
        }
        setTimeout(turnToFront, 900);
    }


    const clickStartButton = () => {
        // スタートボタンをクリックされたら、ゲーム開始フラグをtrueにする
        setStartGame(true)
        // タイマーをスタートする
        start()
    }

    // ゲーム終了ポップアップの削除時の処理
    const clickClose = () => {
        // ゲーム終了ポップアップ表示判定をfalseに書き換え
        setShowFinishPopup(false)
    }


    useEffect(() => {
        // 全カードがペア状態になったら
        if (!isFinishGame && countPair === total_pair_count * 2) {
            alert(`ゲーム終了`)
            // ゲーム終了ポップアップの表示フラグをtrueにする
            setShowFinishPopup(true)
            // 最もクリックされたカードIDをStateに保存
            setMostClickedCardID(checkMostValue(clickedCardIDList))

            // トータルのクリック回数を取得
            const totalClickCount = clickedCardIDList.length
            // トータルのクリック回数をStateに保存
            setTotalClickCount(totalClickCount)

            // タイムのスコアをStateに保存
            setTimeScore(getTimeScore(seconds, minutes))
            // クリックのスコアをStateに保存
            setClickScore(getClickScore(totalClickCount))

            // ゲーム終了フラグをtrueにする
            setIsFinishGame(true)
            // タイマーをストップする
            pause()
        }
    }, [clickedCard])

    return (
        <div>
            <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet" />
            {/* メタ情報 */}
            <Meta />
            {/* タイマー */}
            <TimeCounter seconds={String(seconds).padStart(2, '0')} minutes={String(minutes).padStart(2, '0')} hours={String(hours).padStart(2, '0')} />

            {/* カードが並んだボード */}
            <div className="flip-boards">
                {cardInfoList.map((cardInfo, idx) => (
                    <Card cardInfo={cardInfo} idx={idx} clickedCard={clickedCard} disable={disable} />
                ))}
            </div>

            {/* フッター（Homeボタン） */}
            <Footer />
            {/* スタート時ポップアップ */}
            <StartPopup clickStartButton={clickStartButton} showStartPopup={!startGame} />
            {/* 終了時ポップアップ */}
            <FinishPopup
                mostClickedCardID={mostClickedCardID} isFinished={isFinishGame}
                showFinishPopup={showFinishPopup} clickClose={clickClose}
                totalClickCount={totalClickCount}
                seconds={String(seconds).padStart(2, '0')} minutes={String(minutes).padStart(2, '0')} hours={String(hours).padStart(2, '0')}
                timeScore={timeScore} clickScore={clickScore}
            />
        </div>
    )
}