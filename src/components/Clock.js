import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../static/Clock.css";

const Clock = (props) => {
    // ==============================================================
    //  initialization
    // ==============================================================
    const { sessionCount, breakCount } = props;
    const handleClearCount = props.onClearCount;

    // Debug Tool=====================================================
    const secondsInAMinute = 60;
    // ===============================================================

    const [isPlaying, updateIsPlaying] = useState(false);
    const [timeCount, updateTimeCount] = useState(
        sessionCount * secondsInAMinute
    );
    const [currentTimer, updateCurrentTimer] = useState("Session");
    const [clickReset, updateClickReset] = useState(false);

    // let loop;
    const loop = useRef(null);
    // ==============================================================
    //  helpers
    // ==============================================================

    const convertToTime = (timeCount) => {
        // take the time count (25*secondsInAMinute)
        // convert to minutes and seconds
        let minutes = Math.floor(timeCount / secondsInAMinute);
        let seconds = timeCount % secondsInAMinute;
        seconds = seconds > 9 ? seconds : "0" + seconds;
        // console.log(`${minutes}:${seconds}`);
        return `${minutes}:${seconds}`;
    };

    const musicPlayPause = (status) => {
        let beep = document.getElementById("audio");
        if (status === "play") return beep.play();
        // if reset
        beep.currentTimer = 0;
        return beep.pause();
    };

    // ==============================================================
    //  hooks
    // ==============================================================

    useEffect(() => {
        const returningCallback = () => {
            clearInterval(loop.current);
        };
        // Playing
        if (!isPlaying) {
            clearInterval(loop.current);
            return returningCallback;
        }

        // Not Playing
        const timeOut = timeCount === 0;
        if (timeOut) {
            updateCurrentTimer((currentTimer) =>
                currentTimer === "Session" ? "Break" : "Session"
            );
            updateTimeCount(
                currentTimer === "Session"
                    ? breakCount * secondsInAMinute
                    : sessionCount * secondsInAMinute
            );
            // Music("play");
            musicPlayPause("play");
        } else {
            // setInterval
            loop.current = setInterval(() => {
                // update timeCount
                updateTimeCount((t) => t - 1);
            }, 1000);
        }
        return returningCallback;
    }, [
        isPlaying,
        timeCount,
        currentTimer,
        breakCount,
        sessionCount,
    ]);

    useEffect(() => {
        // console.log(currentTimer);
        if (isPlaying) return;
        if (currentTimer === "Session") {
            updateTimeCount(sessionCount * secondsInAMinute);
        } else {
            updateTimeCount(breakCount * secondsInAMinute);
        }
    }, [currentTimer, sessionCount, breakCount, isPlaying]);

    useEffect(() => {
        const returningCallback = () => {
            clearInterval(loop.current);
        };
        // if clicked reset button
        if (clickReset === true) {
            // pause timing
            clearInterval(loop.current);
            // reset the timer settings

            updateClickReset(!clickReset);
            return returningCallback;
        }
    }, [clickReset, loop]);

    const handlePlayPause = () => {
        updateIsPlaying(!isPlaying);
    };

    const handleReset = () => {
        // reset breakcount to 5, session count to 25
        console.log(currentTimer);

        //reset timer
        updateTimeCount(
            currentTimer === "Session"
                ? 25 * secondsInAMinute
                : 5 * secondsInAMinute
        );
        // pause music
        musicPlayPause("reset");
        updateClickReset(!clickReset);
        updateIsPlaying(false);
        handleClearCount();
    };

    return (
        <div className="clock-container">
            <h1 id="timer-label">{currentTimer}</h1>
            <span id="time-left">{convertToTime(timeCount)}</span>
            {/* <div>{Music()}</div> */}
            <div className="controls">
                <button id="start_stop" onClick={handlePlayPause}>
                    <FontAwesomeIcon
                        className="control-icon"
                        size="3x"
                        icon={isPlaying ? "pause" : "play"}
                    />
                </button>

                <button id="reset" onClick={handleReset}>
                    <FontAwesomeIcon
                        className="control-icon"
                        size="2x"
                        icon="sync-alt"
                    />
                </button>
            </div>
        </div>
    );
};

export default Clock;
