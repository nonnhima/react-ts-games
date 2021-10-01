import React from 'react';
import './Header.css';

export interface Counter {
    whiteCount: number
    blackCount: number
}

export const Header: React.VFC<Counter> = ({ ...props }) => {
    return (
        <p className="scores">白：<span className="cnt_white">{props.whiteCount}</span>　　黒：<span className="cnt_black">{props.blackCount}</span></p>
    );
}