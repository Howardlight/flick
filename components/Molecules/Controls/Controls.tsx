import React, { Fragment } from 'react'
import ControlsProps from './Controls.types';
import { cn } from '../../Movie-TV/Images/BlurImage';
import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconVolume, IconVolumeOff } from '@tabler/icons-react';

const defaultProps: ControlsProps = {
    shouldRender: true,
    onMuteClick: () => { },
    onPlayClick: () => { },
    playing: false,
    muted: false,
}

function Controls(props: Readonly<ControlsProps>) {
    const { muted, onMuteClick, onPlayClick, playing, shouldRender, overrideClassName } = props;
    if (!shouldRender) return <Fragment />;

    const buttonsDefaultClassName = "text-gray-300 transition-colors ease-in delay-50 hover:text-white";
    return (
        <div className={cn(overrideClassName ?? '', 'flex grow items-end mb-5 mx-5 gap-5 justify-between md:justify-start')}>
            {playing
                ? <IconPlayerPauseFilled size={48} onClick={onPlayClick} className={buttonsDefaultClassName} />
                : <IconPlayerPlayFilled size={48} onClick={onPlayClick} className={buttonsDefaultClassName} />
            }
            {muted
                ? <IconVolumeOff stroke={2} size={48} onClick={onMuteClick} className={buttonsDefaultClassName} />
                : <IconVolume stroke={2} size={48} onClick={onMuteClick} className={buttonsDefaultClassName} />
            }
        </div>
    )
}


Controls.defaultProps = defaultProps;
export default Controls;