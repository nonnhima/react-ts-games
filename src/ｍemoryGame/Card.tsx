
import React from 'react';
import { imageList } from './getCardImage';
import { cardInfo, CardStatus } from './MemoryGame';

export interface CardProps {
    cardInfo: cardInfo
    idx: number
    clickedCard: (idx: number) => void
    // 全カードがクリック不可能かどうか判定（全カードがクリック不可能ならtrue）
    disable: boolean
}

export const Card: React.VFC<CardProps> = ({ ...props }) => {

    const idPaired = (cardInfo: cardInfo): boolean => cardInfo.status === CardStatus.Paired
    const idClicked = (cardInfo: cardInfo): boolean => cardInfo.status === CardStatus.Clicked

    // 画像URLパス
    const imgUrl = imageList[props.cardInfo.cardID - 1]

    let classes = ['board']
    if (idClicked(props.cardInfo)) {
        classes.push('clicked')
    } else if (idPaired(props.cardInfo)) {
        classes.push('paired')
    }

    // [すでにペアが揃っている場合、もしくは1回目にクリックしたカードの場合、もしくはカードをひっくり返すアニメーションが再生中の場合] はonclick処理をDOMに表示しない。
    if (idPaired(props.cardInfo) || idClicked(props.cardInfo) || props.disable) {
        return (
            <div className={classes.join(' ')}>
                <div className="front"></div>
                <div className="flipped">
                    <img src={imgUrl} key={props.idx} alt={props.cardInfo.cardID.toLocaleString()} />
                </div>
            </div >
        )
    }
    return (
        <div className={classes.join(' ')} onClick={() => props.clickedCard(props.idx)}>
            <div className="front"></div>
            <div className="flipped">
                <img src={imgUrl} key={props.idx} alt={props.cardInfo.cardID.toLocaleString()} />
            </div>
        </div >
    )
}
