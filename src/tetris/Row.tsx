import React from 'react';
import { Block } from './Block';
import { BlocksInfoType, max_width } from './Tetris';

export interface RowProps {
    idx: number
    blocksInfo: BlocksInfoType[]
}

export const Row: React.VFC<RowProps> = ({ ...props }) => {
    return (
        <tr key={props.idx}>
            {/* widthの数だけループ */}
            {Array(max_width).fill(0).map((val, idx) =>
                // Blockに個別のブロック情報を渡す
                <Block idx={idx} blockInfo={props.blocksInfo[props.idx * 12 + idx]} height_idx={props.idx} />
            )}
        </tr>
    )
}