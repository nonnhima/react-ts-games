import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useKey } from 'react-use';
import { Footer } from "../othello/Footer";
import { Meta } from "./Meta";
import { Row } from './Row';
import { Score } from './Score';
import './Tetris.css';

export const max_height = 22; // 縦22マス
export const max_width = 12; // 横12マス


// ゲームオーバー状態
let is_game_over = false;


// アクティブ状態（動かせるブロック）のクラス名
let active_class;
// ブロックを置くことができる最も低いポジション（data-position）
let max_bottom_default_position;
// 列を削除した回数
let goal_times = 0;

// ローテーションのindex（0～3）のデフォルト値の設定
export let lotation_index = 0

export const Tetris = () => {

    // ブロックの基準となるスタート地点(デフォルトは207)
    const [defaultPosition, setDefaultPosition] = useState(207);

    // bodyタグにクラス付与
    document.body.className = 'tetris'

    // タイマー
    const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
        useStopwatch({ autoStart: true });


    const ArrowDown = () => {
        alert(`downがクリック！`)
    }

    const ArrowRight = () => {
        alert(`rightがクリック！`)
    }

    const ArrowLeft = () => {
        alert(`leftがクリック！`)
    }

    const Less = () => {
        alert(`「＜」がクリック！`)
    }

    const More = () => {
        alert(`「＞」がクリック！`)
    }

    useKey('ArrowDown', ArrowDown);

    useKey('ArrowLeft', ArrowRight);
    useKey('ArrowRight', ArrowLeft);

    // <
    useKey(`,`, Less);
    // >F
    useKey(`.`, More);


    // 横のマス分の数字の配列を作成 (例：[1,2,3,4...12])
    let numbers: number[] = Array(max_width).fill(0).map((v, i) => i + 1);
    const blocksIDs = Array(max_height).fill(0).map((val, idx) =>
        numbers.map((value, index) => value + 100 * (idx + 1))
    )


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
                        <Row idx={idx} />
                    )}
                </table>
                {/* フッター（HOMEボタン） */}
                <Footer isGray={true} />
            </div>
            <div className="right_area">
                <div className="next_block_area">
                    <h2>NEXT BLOCK</h2>
                    <table id="next">
                        <tr>
                            <td className="default" data-pos="11"></td>
                            <td className="default" data-pos="12"></td>
                            <td className="default" data-pos="13"></td>
                            <td className="default" data-pos="14"></td>
                            <td className="default" data-pos="15"></td>
                            <td className="default" data-pos="16"></td>
                        </tr>
                        <tr>
                            <td className="default" data-pos="21"></td>
                            <td className="default" data-pos="22"></td>
                            <td className="default" data-pos="23"></td>
                            <td className="default" data-pos="24"></td>
                            <td className="default" data-pos="25"></td>
                            <td className="default" data-pos="26"></td>
                        </tr>
                        <tr>
                            <td className="default" data-pos="31"></td>
                            <td className="default" data-pos="32"></td>
                            <td className="default" data-pos="33"></td>
                            <td className="default" data-pos="34"></td>
                            <td className="default" data-pos="35"></td>
                            <td className="default" data-pos="36"></td>
                        </tr>
                        <tr>
                            <td className="default" data-pos="41"></td>
                            <td className="default" data-pos="42"></td>
                            <td className="default" data-pos="43"></td>
                            <td className="default" data-pos="44"></td>
                            <td className="default" data-pos="45"></td>
                            <td className="default" data-pos="46"></td>
                        </tr>
                        <tr>
                            <td className="default" data-pos="51"></td>
                            <td className="default" data-pos="52"></td>
                            <td className="default" data-pos="53"></td>
                            <td className="default" data-pos="54"></td>
                            <td className="default" data-pos="55"></td>
                            <td className="default" data-pos="56"></td>
                        </tr>
                        <tr>
                            <td className="default" data-pos="61"></td>
                            <td className="default" data-pos="62"></td>
                            <td className="default" data-pos="63"></td>
                            <td className="default" data-pos="64"></td>
                            <td className="default" data-pos="65"></td>
                            <td className="default" data-pos="66"></td>
                        </tr>
                    </table>
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
                <Score seconds={String(seconds).padStart(2, '0')} minutes={String(minutes).padStart(2, '0')} hours={String(hours).padStart(2, '0')} />
            </div>


        </div>)
}