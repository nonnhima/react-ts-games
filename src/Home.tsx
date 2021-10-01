import React from 'react';

export const Home = () => {
    return (
        <div>
            <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet" />
            <div className="select_area">
                <h2 className="chooseTxt">Choose one. </h2>
                <br />
                <a href="/othello" className="select_btn">オセロ (othello)</a>
                <a href="/memory_game" className="select_btn">神経衰弱 (memory game)</a>
                <a href="/tetris" className="select_btn">テトリス (tetris)</a>
            </div>
        </div>
    )

}