import React, { useEffect, useRef, useState } from "react";
import { Button, Switch } from '@mantine/core';
import { NumberInput } from '@mantine/core';

interface TimerProps {
    time: number;
    started: boolean;
    callback: (arg1: number) => void;
}

const parseSeconds = (seconds: number): string => {
    if(seconds < 0) return "00:00";

    const SECONDS = seconds%60;
    const MINUTES = ((seconds-SECONDS)/60) % 60;
    const HOURS = Math.floor(seconds/3600);

    let hStr = (HOURS.toString().padStart(2, "0"));
    let mStr = (MINUTES.toString().padStart(2, "0"));
    let sStr = (SECONDS.toString().padStart(2, "0"));

    return `${seconds > 3600 ? `${hStr}:` : ""}${mStr}:${sStr}`;
}

const Timer: React.FC<TimerProps> = ({time, started, callback}) => {
    const [timeString, setTimeString] = useState("00:00:00");

    useEffect(() => {
        setTimeString(parseSeconds(time));
    }, [time, started]);

    useEffect(() => {
        if(started) {
            const interval = setInterval(() => callback(time - 1), 1000);

            return () => clearInterval(interval);
        }
    });

    return (
        <div className="px-6 py-4 m-2 flex flex-col justify-center align-middle w-fit hover:cursor-pointer rounded-2xl bg-white transition-all ease-out">
            <span onClick={() => {
                callback(time);
            }} className={`font-black text-9xl ${time < 0 ? "animate-flash" : ""}`}>{timeString}</span>
            <div className="flex flex-row justify-around">
                <span onClick={() => {
                    if(started) callback(-9000000000);
                    else callback(time);
                }} className={`${started ? "bg-yellow-200 hover:bg-yellow-300" : "bg-green-200 hover:bg-green-300"} transition-all ease-in-out px-5 py-2 rounded-xl font-bold`}>{started ? "Pause" : "Start"}</span>
                <span onClick={() => {
                    callback(-9000000001);
                }} className={`bg-red-200 hover:bg-red-300 transition-all ease-in-out px-5 py-2 rounded-xl font-bold`}>Reset</span>
            </div>
        </div>
    );
}

interface SmallTimerProps {
    time: number;
    label: string;
    started: boolean;
    callback: (arg1: number) => void;
}
const SmallTimer: React.FC<SmallTimerProps> = ({time, label, started, callback}) => {
    const [timeString, setTimeString] = useState("00:00:00");

    useEffect(() => {
        setTimeString(parseSeconds(time));
    }, [time]);

    useEffect(() => {
        if(started) {
            const interval = setInterval(() => {
                callback(time - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    });

    return (
        <div className="grow px-4 py-3 m-2 flex flex-col justify-center align-middle w-fit hover:cursor-pointer rounded-2xl bg-white transition-all ease-out" onClick={() => callback(time)}>
            <span className="font-bold text-md">{label}</span>
            <span className={`font-black text-4xl ${time < 0 ? "animate-flash" : ""}`}>{timeString}</span>
        </div>
    );
}

export const DebateTimer: React.FC = () => {
    const currentMaxTime = useRef(240);
    const [currentTime, setCurrentTime] = useState(240);
    const [timerStarted, setTimerStarted] = useState(false);
    const [currentGreenTime, setCurrentGreenTime] = useState(240);
    const [currentWarnTime, setCurrentWarnTime] = useState(60);
    const [currentRedTime, setCurrentRedTime] = useState(15);

    const [showPrep, setShowPrep] = useState(true);
    const [defaultPrepTime, setDefaultPrepTime] = useState(240);
    const [prepTimeA, setPrepTimeA] = useState(240);
    const [prepTimeB, setPrepTimeB] = useState(240);
    const [prepTimeAOn, setPrepTimeAOn] = useState(false);
    const [prepTimeBOn, setPrepTimeBOn] = useState(false);

    const [timeSetting, setTimeSetting] = useState(0);

    const [showAdvSettings, setShowAdv] = useState(false);
    const [showSettings, setShowSettings] = useState(true);

    const CURRENT_BG_COLOR = currentTime < 0 ? "bg-black" : currentTime < currentRedTime ? "bg-red-300" : currentTime < currentWarnTime ? "bg-orange-300" : currentTime <= currentGreenTime ? "bg-green-300" : "bg-blue-300";

    return (
        <div>
            <div className={`flex transition-all ease-in-out flex-col sm:justify-center items-center h-[100%] sm:h-[100vh] ${CURRENT_BG_COLOR}`}>
                <div className="flex flex-col sm:flex-row">
                    {/* Show big timer */}
                    <Timer time={currentTime} started={timerStarted} callback={(time: number) => {
                        if(time === -9000000000) setTimerStarted(false);
                        else if(time === -9000000001) {
                            setCurrentTime(currentMaxTime.current);
                            setTimerStarted(false);
                        }
                        else {
                            setCurrentTime(time);
                            setTimerStarted(true);
                        }
                    }}/>
                    {/* Show prep timers if enabled */}
                    <div className="flex sm:flex-col" style={{display: showPrep ? "flex" : "none"}}>
                        <SmallTimer time={prepTimeA} started={prepTimeAOn} label={"Team A Prep"} callback={(time: number) => {
                            setPrepTimeA(time);
                            setPrepTimeAOn(true);    
                        }}/>
                        <SmallTimer time={prepTimeB} started={prepTimeBOn} label={"Team B Prep"} callback={(time: number) => {
                            setPrepTimeB(time);
                            setPrepTimeBOn(true);
                        }}/>
                    </div>
                </div>

                {/* Option to show settings */}
                <div className="px-3 py-2 m-2 border-white border-2 flex flex-col w-fit hover:cursor-pointer rounded-2xl bg-white">
                    <Switch checked={showSettings} onChange={(e) => setShowSettings(e.currentTarget.checked)} color={"orange"} label={"Show settings?"}/>
                </div>

                {/* Settings box */}
                {showSettings ? <div className="flex flex-col sm:flex-row justify-center align-middle items-center sm:items-stretch flex-wrap w-2/3">
                    {/* Prep check box */}
                    <div className="grow px-3 py-2 m-2 border-white border-2 flex flex-col justify-center align-middle w-fit hover:cursor-pointer rounded-2xl bg-white">
                        <Switch checked={showPrep} onChange={(e) => setShowPrep(e.currentTarget.checked)} color={"orange"} label={"Show Prep?"} description={`Check to ${showPrep ? "hide" : "show"} prep timers`}/>
                    </div>

                    {/* Set speech time */}
                    <div className="grow px-3 py-2 m-2 border-white border-2 flex flex-col justify-center align-middle w-fit hover:cursor-pointer rounded-2xl bg-white">
                        <NumberInput value={timeSetting} onChange={(value: number) => {
                            if(value < 0) return;
                            setTimeSetting(value);
                        }} min={0} hideControls className="p-1"  placeholder="set time, minutes" label="Set speech time (minutes):"/>
                        <Button color={"orange"} variant={"light"} onClick={() => {
                            currentMaxTime.current = timeSetting*60;
                            setCurrentTime(timeSetting*60);
                            setCurrentGreenTime(timeSetting*60*0.75);
                            setCurrentWarnTime(timeSetting*60*0.15);
                            setCurrentRedTime(timeSetting*60*0.05);
                            setTimerStarted(false);
                        }}>Set</Button>
                    </div>

                    {/* Set prep time */}
                    <div style={{display: showPrep ? "flex" : "none"}} className="grow px-3 py-2 m-2 border-white border-2 flex flex-col justify-center align-middle w-fit hover:cursor-pointer rounded-2xl bg-white">
                        <NumberInput value={defaultPrepTime} onChange={(value: number) => {
                            setDefaultPrepTime(value);
                        }} hideControls className="p-1"  placeholder="set time, minutes" label="Set prep time (seconds):"/>
                        <Button color={"orange"} variant={"light"} onClick={() => {
                            setPrepTimeA(defaultPrepTime);
                            setPrepTimeB(defaultPrepTime);
                            setPrepTimeAOn(false);
                            setPrepTimeBOn(false);
                        }}>Set</Button>
                    </div>

                    {/* Reset prep button */}
                    <div style={{display: showPrep ? "flex" : "none"}} className="grow px-3 py-2 m-2 border-white border-2 flex flex-col justify-center align-middle w-fit hover:cursor-pointer rounded-2xl bg-white">
                        <Button color={"orange"} variant={"light"} className="transition-all ease-in-out" onClick={() => {
                            setPrepTimeA(defaultPrepTime);
                            setPrepTimeB(defaultPrepTime);
                            setPrepTimeAOn(false);
                            setPrepTimeBOn(false);
                        }}>Reset Prep</Button>
                    </div>

                    {/* Advanced settings - background colors */}
                    {showAdvSettings ? <div className="grow px-3 py-2 m-2 border-white border-2 flex flex-col justify-center align-middle w-full hover:cursor-pointer rounded-2xl bg-white" style={{flexGrow: 4}}>

                        <NumberInput value={currentGreenTime} onChange={(value: number) => {
                            setCurrentGreenTime(value);
                        }} hideControls className="p-1"  placeholder="set time, minutes" label={`Set "blue" time, or the threshold above when the background appears blue (seconds):`}/>

                        <NumberInput value={currentWarnTime} onChange={(value: number) => {
                            setCurrentWarnTime(value);
                        }} hideControls className="p-1"  placeholder="set time, minutes" label={`Set "green" time (seconds):`}/>

                        <NumberInput value={currentRedTime} onChange={(value: number) => {
                            setCurrentRedTime(value);
                        }} hideControls className="p-1"  placeholder="set time, minutes" label={`Set "yellow" time (seconds):`}/>
                            
                    </div> : ""}

                    <div className="grow px-3 py-2 m-2 border-white border-2 flex flex-col justify-center align-middle hover:cursor-pointer rounded-2xl bg-white w-full">
                        <Button color={"blue"} variant={"light"} className="transition-all ease-in-out" onClick={() => {
                            setShowAdv(!showAdvSettings);
                        }}>{showAdvSettings ? "Hide" : "Show"} Advanced Settings</Button>
                    </div>
                </div> : ""}

            </div>
        </div>
    );
};

export default DebateTimer;
