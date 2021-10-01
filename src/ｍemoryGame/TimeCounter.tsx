import React from 'react';

export interface TimeCounterProps {
    seconds: string
    minutes: string
    hours: string
}

export const TimeCounter: React.VFC<TimeCounterProps> = ({ ...props }) => {
    return (
        <div className="timer_content">
            <div className="timer">{`${props.hours}:${props.minutes}.${props.seconds}`}</div>
        </div>
    )
}