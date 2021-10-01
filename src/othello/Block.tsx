import React from 'react';
import './Block.css';
import { StoneColor } from './Othello';

export interface BlockProps {
    blockID: number
    color: StoneColor
    clickEmptyHint: (blockID: number) => void
    isEnemy: boolean
}

export const Block: React.VFC<BlockProps> = ({ ...props }) => {
    let classes: string[] = [props.color]
    if (props.isEnemy) {
        // 敵のturnのEmptyHintはクリックさせないように、スタイルを追加
        classes.push('is_enemy')
    }
    if (props.color === StoneColor.EmptyHint) {
        return (
            <div id="block" key={props.blockID.toLocaleString()} data-index={props.blockID.toLocaleString()} className={classes.join(' ')} onClick={() => props.clickEmptyHint(props.blockID)}></div>
        );
    }
    return (
        <div id="block" key={props.blockID.toLocaleString()} data-index={props.blockID.toLocaleString()} className={classes.join(' ')}></div>
    );
}