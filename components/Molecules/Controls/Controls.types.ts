

export default interface ControlsProps {
    shouldRender: boolean;
    overrideClassName?: string;
    onPlayClick: () => void;
    onMuteClick: () => void;
    playing: boolean;
    muted: boolean;
};