
import React from 'react';
import './FinishPopup.css';
import { imageList } from './getCardImage';
import { ScoreType } from './MemoryGame';

export interface FinishPopupProps {
    mostClickedCardID: number
    isFinished: boolean
    showFinishPopup: boolean
    clickClose: () => void
    totalClickCount: number
    seconds: string
    minutes: string
    hours: string
    timeScore: ScoreType
    clickScore: ScoreType
}

export const FinishPopup: React.VFC<FinishPopupProps> = ({ ...props }) => {
    // 画像URLパス
    const imgUrl = imageList[props.mostClickedCardID - 1]

    const classes = ['popup']
    if (props.showFinishPopup) {
        classes.push('is-show')
    }
    const timeClasses = ['score', 'click_score', props.timeScore]
    const clickClasses = ['score', 'click_score', props.clickScore]
    return (
        <div className={classes.join(' ')}>
            <div className="popup-inner">
                <div onClick={() => props.clickClose()} className="close-btn"><i className="fas fa-times"></i></div>
                <table>
                    <tr>
                        <th></th>
                        <th>RESULT</th>
                        <th>SCORE</th>
                    </tr>
                    <tr>
                        <td><i className="fas fa-stopwatch"></i> TIME</td>
                        <td><span className="timer">{`${props.hours}:${props.minutes}:${props.seconds}`}</span></td>
                        <td><span className={timeClasses.join(' ')}>{props.timeScore}</span></td>
                    </tr>
                    <tr>
                        <td><i className="fas fa-mouse-pointer"></i> CLICK</td>
                        <td><span className="click_count">{props.totalClickCount}</span> times</td>
                        <td><span className={clickClasses.join(' ')}>{props.clickScore}</span></td>
                    </tr>
                </table>
                <br />
                <p className="bold">This is the cat you clicked the most.</p>
                <div className="most_clicked">
                    <img src={imgUrl} alt="最もクリックされた猫" />
                </div>
                <p className="attention">もう一度遊ぶ場合はブラウザをリロードしてください。<br />
                    If you reload the browser, you can play the game again.
                </p>
            </div>
            <div className="black-background" onClick={() => props.clickClose()}></div>
        </div>
    )
}