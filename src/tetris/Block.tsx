import React from 'react';
import { BlocksInfoType } from './Tetris';

export interface BlockProps {
    idx: number
    blockInfo: BlocksInfoType
    height_idx: number //debug
}

export const Block: React.VFC<BlockProps> = ({ ...props }) => {
    // let a = 0
    // if (props.blockInfo === undefined) {
    //     // alert('props.blockInfo===undefined')
    //     // height_idx=20, weight_idx=4のときにはじめてエラーになる
    //     a = 0+1
    // }


    let classes = [props.blockInfo.class, props.blockInfo.additionalClass]
    return (
        <td className={classes.join(' ')} key={props.idx}></td>
    )
}