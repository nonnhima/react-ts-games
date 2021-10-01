import React from 'react';

export interface FooterProps {
    isGray?: boolean
}

export const Footer: React.VFC<FooterProps> = ({ isGray = false }) => {
    let classes = ['btn']
    if (isGray) {
        classes.push('grayButton')
    }
    return (
        <div className="btn_area">
            <a href="/" className={classes.join(' ')}>HOME</a>
        </div>
    )

}