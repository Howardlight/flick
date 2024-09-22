'use client';
// import { useState, useCallback, Fragment } from "react";
// import ReactPlayer from "react-player";
import { Movie, Video } from "../../../types/Movie";
import HeroBox from "../../HeroBox/MovieHeroBox";
import Navbar from "../../Navbar";
// import { debounce } from "../../../utils/utils";
// import placeholder from '../../../assets/MovieSVG.svg';
import styles from './MediaDetailsHero.module.css';
import { cn } from "../../Movie-TV/Images/BlurImage";
import './MediaDetailsHero.css';
// import Controls from "../../Molecules/Controls/Controls";

interface PlayerStatus {
    muted: boolean,
    loaded: boolean,
    showPlayer: boolean,
    hasEnded: boolean,
    playing: boolean,
}

const initialPlayerStatus: PlayerStatus = {
    muted: false,
    loaded: false,
    showPlayer: false,
    hasEnded: false,
    playing: false,
}

const youtubeConfig = {
    playerVars: {
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        controls: 0,
        disablekb: 1,
        start: 0,
        end: 0,
    }
}

const playerConfig = {
    youtube: youtubeConfig
}

const backgroundImageStyle = (url: string) => {
    return {
        backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(${url})`,
    }
}

interface HeroProps {
    data: Movie,
    videos: Video[]
}

const MediaDetailsHero = (props: HeroProps) => {
    // const trailers = props.videos.filter(video => video.type === "Trailer" && video.site === "YouTube");
    // const [playerStatus, setPlayerStatus] = useState<PlayerStatus>(initialPlayerStatus);

    // const handleError = (e: any) => {
    //     e.target.src = placeholder;
    //     e.target.style.objectFit = 'cover';
    // };
    // const handleEnd = useCallback(() => {
    //     setPlayerStatus((prevState) => ({
    //         ...prevState,
    //         showPlayer: false,
    //         videoEnded: true,
    //         loaded: false,
    //         playing: false,
    //     }));
    // }, [setPlayerStatus]);

    // const handleBufferEnd = useCallback(() => {
    //     setPlayerStatus((prevState) => ({
    //         ...prevState,
    //         showPlayer: true,
    //     }));
    // }, [setPlayerStatus]);

    // const handleBuffer = useCallback(() => {
    //     setPlayerStatus((prevState) => ({
    //         ...prevState,
    //         showPlayer: false,
    //     }));
    // }, [setPlayerStatus]);

    // const handleReady = useCallback(debounce(() => {
    //     if (playerStatus.playing) return;
    //     setPlayerStatus((prevState) => ({
    //         ...prevState,
    //         playing: true,
    //         // playing: false,
    //         showPlayer: false,
    //     }));
    // }, 3000), [playerStatus, setPlayerStatus]);

    // const handlePausePlay = useCallback(() => {
    //     setPlayerStatus((prev) => ({
    //         ...prev,
    //         playing: !prev
    //     }))
    // }, []);

    // const handleMute = useCallback(() => {
    //     setPlayerStatus((prev) => ({
    //         ...prev,
    //         muted: !prev.muted
    //     }))
    // }, []);

    return (
        <div
            className={cn(styles.halfViewport, "relative w-full flex flex-col border-red-600 lg:border-b-2")}
            // style={playerStatus.playing ? {} : backgroundImageStyle(`https://image.tmdb.org/t/p/original/${props.data.backdrop_path}`)}>
            style={false ? {} : backgroundImageStyle(`https://image.tmdb.org/t/p/original/${props.data.backdrop_path}`)}>
            <Navbar classNameOverride={"relative z-10"} />
            <HeroBox
                // shouldRender={!playerStatus.playing}
                shouldRender={true}
                className="h-full grow"
                data={props.data}
            />
            {/* <Controls
                shouldRender={playerStatus.playing}
                // shouldRender
                onMuteClick={handleMute}
                onPlayClick={handlePausePlay}
            />
            <div className={cn(playerStatus.playing ? '' : styles.hidden, styles.youtubeContainer)}>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailers[trailers.length - 1].key}`}
                    width={"100%"}
                    height={"100%"}
                    onBuffer={handleBuffer}
                    onBufferEnd={handleBufferEnd}
                    onReady={handleReady}
                    onError={handleError}
                    onEnded={handleEnd}
                    controls={false}
                    style={{ position: 'absolute' }}
                    playing={playerStatus.playing}
                    muted={playerStatus.muted}
                    config={playerConfig}
                />
            </div> */}
        </div>
    );
}

export default MediaDetailsHero;