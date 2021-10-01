import React from 'react';
import { StoneColor } from './Othello';
import './FinishPopup.css';
import black from './img/black.png';
import white from './img/white.png';

interface FinishPopupProps {
    showFinishPopup: boolean
    isFinished: boolean
    clickClose: () => void
    whiteCount: number
    blackCount: number
}

export const FinishPopup: React.VFC<FinishPopupProps> = ({ ...props }) => {

    const winnerColor: StoneColor = props.whiteCount > props.blackCount ? StoneColor.White : StoneColor.Black
    const Draw = props.whiteCount === props.blackCount

    const winnerImgPath = winnerColor === StoneColor.Black ? black : white

    const classes = ['popup']
    if (props.showFinishPopup) {
        classes.push('is-show')
    }
    if (Draw) {
        return (
            <div className={classes.join(' ')}>
                <div className="popup-inner">
                    <div onClick={() => props.clickClose()} className="close-btn"><i className="fas fa-times"></i></div>
                    <div className="totalCount">白：{props.whiteCount}　　黒：{props.blackCount}</div>
                    <br />
                    <h1>引き分け！</h1>
                    <p>もう一度遊ぶ場合はブラウザをリロードしてください。</p>
                    <br />
                    <h1>Draw!</h1>
                    <p>If you reload the browser, you can play the game again.</p>
                </div>
                <div className="black-background" onClick={() => props.clickClose()}></div>
            </div>
        )
    }
    return (
        <div className={classes.join(' ')}>
            <div className="popup-inner">
                <div onClick={() => props.clickClose()} className="close-btn"><i className="fas fa-times"></i></div>
                <div className="totalCount">白：{props.whiteCount}　　黒：{props.blackCount}</div>
                <div className="winner_img">
                    <img src={winnerImgPath} alt="勝ったブロックの画像" />
                </div>
                <br />

                <h1>おめでとうございます！</h1>
                <p>{winnerColor}が勝ちました。<br />
                    もう一度遊ぶ場合はブラウザをリロードしてください。
                </p>
                <h1>Congratulations!</h1>
                <p>{winnerColor} won.<br />
                    If you reload the browser, you can play the game again.
                </p>
            </div>
            <div className="black-background" onClick={() => props.clickClose()}></div>
        </div>
    );
}