import React from 'react';
import black from './img/black.png';
import white from './img/white.png';
import './StartPopup.css';

interface StartPopupProps {
    showStartPopup: boolean
    playerChooseWhite: () => void
    playerChooseBlack: () => void
}

export const StartPopup: React.VFC<StartPopupProps> = ({ ...props }) => {

    const classes = ['popup']
    if (props.showStartPopup) {
        classes.push('is-show')
    }
    return (
        <div className={classes.join(' ')} id="new_game">
            <div className="popup-inner">
                <h1>どちらかを選んでください。<br />Choose one.</h1><br />
                <div className="column" onClick={props.playerChooseWhite}>
                    <p>先攻</p>
                    <img src={white} data-player-color="white" className="attack" alt="white" />
                </div>
                <div className="column" onClick={props.playerChooseBlack}>
                    <p>後攻</p>
                    <img src={black} data-player-color="black" className="attack" alt="black" />
                </div>
            </div>
            <div className="black-background" id="js-black-bg"></div>
        </div>
    );
}