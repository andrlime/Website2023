import React, { useEffect, useState } from "react";
import VoltorbImage from '../../Static/voltorb.png';
import { useHotkeys } from "@mantine/hooks";

const allFalses = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];

const levels = [
    [1, 6, 3, 1],
    [1, 6, 0, 3],
    [1, 6, 5, 0],
    [1, 6, 2, 2],
    [1, 6, 4, 1],
    [2, 7, 1, 3],
    [2, 7, 6, 0],
    [2, 7, 3, 2],
    [2, 7, 0, 4],
    [2, 7, 5, 1],
    [3, 8, 2, 3],
    [3, 8, 7, 0],
    [3, 8, 4, 2],
    [3, 8, 1, 4],
    [3, 8, 6, 1],
    [4, 8, 3, 3],
    [4, 8, 0, 5],
    [4, 10, 8, 0],
    [4, 10, 5, 2],
    [4, 10, 2, 4],
    [5, 10, 7, 1],
    [5, 10, 4, 3],
    [5, 10, 1, 5],
    [5, 10, 9, 0],
    [5, 10, 6, 2],
    [6, 10, 3, 4],
    [6, 10, 0, 6],
    [6, 10, 8, 1],
    [6, 10, 5, 3],
    [6, 10, 2, 5],
    [7, 10, 7, 2],
    [7, 10, 4, 4],
    [7, 13, 1, 6],
    [7, 13, 9, 1],
    [7, 10, 6, 3],
    [8, 10, 0, 7],
    [8, 10, 8, 2],
    [8, 10, 5, 4],
    [8, 10, 2, 6],
    [8, 10, 7, 3],
];

function useGameboard() {
    const resetGameboard = (zeros: number, twos: number, threes: number) => {

        // initialize 5x5 array of ones
        const board = [new Array(5), new Array(5), new Array(5), new Array(5), new Array(5)];
        for(let i = 0; i < zeros; i ++) {

            let rand_x = Math.floor((Math.random()*5));
            let rand_y = Math.floor((Math.random()*5));

            if(board[rand_x][rand_y]) {
                i --;
                continue;
            } else {
                board[rand_x][rand_y] = 0;
            }

        }

        for(let i = 0; i < twos; i ++) {

            let rand_x = Math.floor((Math.random()*5));
            let rand_y = Math.floor((Math.random()*5));

            if(board[rand_x][rand_y] !== undefined) {
                i --;
                continue;
            } else {
                board[rand_x][rand_y] = 2;
            }

        }

        for(let i = 0; i < threes; i ++) {

            let rand_x = Math.floor((Math.random()*5));
            let rand_y = Math.floor((Math.random()*5));

            if(board[rand_x][rand_y] !== undefined) {
                i --;
                continue;
            } else {
                board[rand_x][rand_y] = 3;
            }

        }

        for(let i = 0; i < 5; i ++) {

            for(let j = 0; j < 5; j ++) {
                
                if(board[i][j] !== undefined) continue;
                else board[i][j] = 1;

            }

        }

        return board;

    }

    const [gameboard, setGameboard] = React.useState<Array<Array<number>>>(resetGameboard(6, 3, 1));

    const setGameboardCoordinate = (x: number, y: number, val: number) => {
        let G = gameboard;
        G[x][y] = val;
        setGameboard(G);
    }

    const [flipped, setFlippedRaw] = React.useState<Array<Array<boolean>>>(allFalses);

    const setFlipped = (x: number, y: number, val: boolean) => {
        let G = flipped;
        G[x][y] = val;
        setFlippedRaw(G);
    }

    let output: [number[][], Function, Function, Function, boolean[][], Function, Function] = [gameboard, setGameboard, setGameboardCoordinate, resetGameboard, flipped, setFlipped, setFlippedRaw];
    return output;
}

export const VoltorbFlip: React.FC = () => {
    const [board, setGameboard, , reset, flippedBoard, flip, flipEntireBoard] = useGameboard();
    const [reload, setReload] = useState(false);
    const [coins, setCoins] = useState(1);
    const [cumulativeCoins, setCumulativeCoins] = useState(0);
    const [gamechange, setGamechange] = useState(false);

    const [curX, setCurX] = useState(0);
    const [curY, setCurY] = useState(0);
    const [level, setLevel] = useState(1);

    const getSummaryOfColumn = (col: number) => {
        let zeros = 0;
        let totalScore = 0;
        for(let i = 0; i < 5; i ++) {

            if(board[i][col] === 0) zeros++;

            totalScore += board[i][col];

        }

        return [zeros, totalScore];
    }

    const flipturn = (x: number, y: number) => {
        if(gamechange) {
            setGamechange(false);
            setCoins(1);
            
            for(let i = 0; i < 5; i ++) {
                for(let j = 0; j < 5; j ++) {
                    flip(i, j, false);
                }
            }

            let board = levels.filter(a => a[0] === level + (coins === 0 ? -1 : 1) || 1);
            setLevel(level + (coins === 0 ? -1 : 1));
            let newLevel = board[Math.round(Math.random()*board.length)];
            setGameboard(reset(newLevel[1], newLevel[2], newLevel[3]));

            setReload(!reload);
        } else {
            if(flippedBoard[x][y]) return;
            flip(x, y, true);
            setReload(!reload);
            setCoins(coins * board[x][y]);
        }
    }

    useEffect(() => {
        if(coins === 0) setGamechange(true);
        if(coins === board.flat().reduce((acc, cur) => cur === 0 ? acc : acc*cur, 1)) {
            setGamechange(true);
            setCumulativeCoins(cumulativeCoins + coins);
            setCoins(1);
        }
    },[coins, board, cumulativeCoins]);

    useHotkeys([
        ['ArrowLeft', () => setCurY((curY + 4) % 5)],
        ['ArrowRight', () => setCurY((curY + 6) % 5)],
        ['ArrowUp', () => setCurX((curX + 4) % 5)],
        ['ArrowDown', () => setCurX((curX + 6) % 5)],
        ['Enter', () => flipturn(curX, curY)],
        ['Space', () => flipturn(curX, curY)]
    ]);

    const CARD_STYLE = "hover:border-red-200 transition-all ease-in-out border-4 rounded-lg font-black text-xl sm:text-2xl md:text-3xl w-[clamp(15vw, 80px, 18vw)] m-1 aspect-square hover:cursor-pointer";
    const SUMMARY_COLORS = [
        "rgb(220, 110, 85)",
        "rgb(70, 165, 70)",
        "rgb(230, 160, 65)",
        "rgb(55, 145, 245)",
        "rgb(190, 100, 220)"
    ];

    const voltorb = (size: number = -1) => (<img alt={"Voltorb"} src={VoltorbImage} width={size === -1 ? "" : size} height={size === -1 ? "" : size}/>);

    return (
        <div className="flex flex-col justify-center items-center h-screen text-white" style={{backgroundColor: "#FFF4BC"}}>
            <div className="flex flex-col sm:flex-row justify-between w-[85vw] md:w-[60vw] lg:w-[40vw]">
                <div className="text-black font-black text-2xl">{cumulativeCoins} Total Coins</div>
                <div className="text-black font-black text-2xl">{coins} Coins This Game</div>
                <div className="text-black font-black text-2xl">Level {level}</div>
            </div>
            <div className="p-2 grid grid-cols-6 w-[95vw] h-[95vw] md:w-[70vw] md:h-[70vw] lg:w-[50vw] lg:h-[50vw]">
                {board.map((row, rowNum) => (
                    <>
                    {row.map((col, colNum) => (
                        <div onClick={() => {
                            setCurX(rowNum);
                            setCurY(colNum);
                            flipturn(rowNum, colNum);
                        }} className={`${CARD_STYLE} border-white flex justify-center items-center text-5xl relative`} style={{borderColor: curX === rowNum && curY === colNum ? "#FFA8B5" : "", backgroundColor: flippedBoard[rowNum][colNum] ? "rgb(190, 140, 130)" : "rgb(50, 160, 100)"}} key={`${rowNum} ${colNum}`}>
                            {flippedBoard[rowNum][colNum] ? col === 0 ? voltorb(36) : col : ""}
                        </div>
                    ))}
                    <div className={`${CARD_STYLE} flex flex-col justify-center`} style={{backgroundColor: SUMMARY_COLORS[rowNum], borderColor: SUMMARY_COLORS[rowNum]}} key={`${rowNum} SUMM`}>
                        <div className="px-2 text-right">{row.reduce((acc,cur) => acc + cur)}</div>
                        <hr className="border-white border-2 w-full"/>
                        <div className="px-2 text-right flex justify-between items-center align-middle p-2">
                            <img className="w-1/2 h-fit aspect-square" alt={"Voltorb"} src={VoltorbImage}/>
                            
                            {row.filter(a => a === 0).length}</div>
                    </div>
                    </>
                ))}

                {[0,1,2,3,4].map((_, colNum) => (
                    <div className={`${CARD_STYLE} flex flex-col justify-center`} style={{backgroundColor: SUMMARY_COLORS[colNum], borderColor: SUMMARY_COLORS[colNum]}} key={`${colNum} SUMM`}>
                        <div className="px-2 text-right">{getSummaryOfColumn(colNum)[1]}</div>
                        <hr className="border-white border-2 w-full"/>
                        <div className="px-2 text-right flex justify-between items-center align-middle p-2">
                            <img className="w-1/2 h-fit aspect-square" alt={"Voltorb"} src={VoltorbImage}/>
                            
                            {getSummaryOfColumn(colNum)[0]}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-black font-black text-2xl absolute bg-white p-5 rounded-xl shadow-2xl" style={{visibility: gamechange ? "visible" : "hidden"}}>{coins === 0 ? "Round Over!" : "Level Done!"}</div>
                    
        </div>
    );
}