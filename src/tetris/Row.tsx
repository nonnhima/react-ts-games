import React from 'react';
import { Block } from './Block';
import { max_width } from './Tetris';

export interface RowProps {
    idx: number
}

export const Row: React.VFC<RowProps> = ({ ...props }) => {
    return (
        <tr key={props.idx}>
            {/* widthの数だけループ */}
            {Array(max_width).fill(0).map((val, idx) =>
                <Block idx={idx} />
            )}
        </tr>
    )
}