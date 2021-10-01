
import React from 'react';

interface StartPopupProps {
    showStartPopup: boolean
    clickStartButton: () => void
}

export const StartPopup: React.VFC<StartPopupProps> = ({...props }) => {

    const classes = ['popup']
    if (props.showStartPopup) {
        classes.push('is-show')
    }
    return (
        <div className={classes.join(' ')}>
            <div className="popup-inner">
                <h1>神経衰弱ゲームを開始します。</h1>
                <br />
                <p>Let the Memory Games begin.</p>
                <p>Are you ready?</p>
                <div className="btn_area">
                    <div className="btn" onClick={props.clickStartButton}>START</div>
                </div>
            </div>
            <div className="black-background" id="js-black-bg"></div>
        </div>
    )
}