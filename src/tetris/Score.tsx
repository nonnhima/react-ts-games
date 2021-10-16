import React from 'react';

export interface ScoreProps {
    seconds: string
    minutes: string
    hours: string
    goalTimes: number
}

export const Score: React.VFC<ScoreProps> = ({ ...props }) => {
    return (
        <div className="score_area">
            <h2>SCORE</h2>
            <div className="score_text"><span className="score_icon"><i className="fas fa-flag fa-2x"></i></span>　列を削除した回数　<span className="goal_times">{props.goalTimes}</span> 回</div>
            <div className="score_text"><span className="score_icon"><i className="fas fa-stopwatch fa-2x"></i></span>　経過時間　<span className="timer">{props.hours}:{props.minutes}:{props.seconds}</span> </div>
        </div>)
}