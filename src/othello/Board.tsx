import React from 'react';
import { Block } from './Block';
import { BlockType } from './Othello';

export interface BoardProps {
    blocks: BlockType[]
    clickEmptyHint: (blockID: number) => void
    isEnemy: boolean
}

export const Board: React.VFC<BoardProps> = ({ ...props }) => {

    return (
        <div>
            {props.blocks.map((block) =>
                <Block blockID={block.blockID} color={block.color} clickEmptyHint={props.clickEmptyHint} key={block.blockID} isEnemy={props.isEnemy} />
            )}
        </div>
    );
}