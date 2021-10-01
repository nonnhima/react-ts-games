import React from 'react';

export interface BlockProps {
idx: number
}

export const Block: React.VFC<BlockProps> = ({ ...props }) => {
    return (
        <td className="default" key={props.idx}></td>
    )
}