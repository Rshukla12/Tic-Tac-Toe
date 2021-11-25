import React, { useState } from "react";
import style from "./Game.module.css";

const Game = ({ singlePlayer, onReset }) => {
    const mat = new Array(3).fill(0).map((el) => new Array(3).fill(null));
    const [gameState, setGameState] = useState(mat);
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState(0);
    const [history, setHistory] = useState([]);

    const handleBotPlayer = () => {
        let k = 1000;
        let flag = false;
        while (k--) {
            let i = Math.floor(Math.random() * 3);
            let j = Math.floor(Math.random() * 3);
            if (!gameState[i][j]) {
                const newHistory = `Player ${player} putted "O" on row ${i + 1
                    } and column ${j + 1}`;
                setHistory([...history, newHistory]);
                fillGameState(i, j, "O");
                setPlayer(1);
                flag = true;
                break;
            }
        }
        if (!flag) {
            for (let i = 0; i < 3; i++) {
                let flag2 = false;
                for (let j = 0; j < 3; j++) {
                    if (!gameState[i][j]) {
                        const newHistory = `Player ${player} putted "O" on row ${i + 1
                            } and column ${j + 1}`;
                        setHistory([...history, newHistory]);
                        fillGameState(i, j, "O");
                        setPlayer(1);
                        flag2 = true;
                        break;
                    }
                }
                if (flag2) {
                    break;
                }
            }
        }
    };

    const checkIfWin = (gameState) => {
        for (let i = 0; i < gameState.length; i++) {
            if (
                gameState[i][0] === gameState[i][1] &&
                gameState[i][0] === gameState[i][2]
            )
                return gameState[i][2];
            if (
                gameState[0][i] === gameState[1][i] &&
                gameState[0][i] === gameState[2][i]
            )
                return gameState[2][i];
        }
        if (
            gameState[0][0] === gameState[1][1] &&
            gameState[0][0] === gameState[2][2]
        )
            return gameState[2][2];
        if (
            gameState[0][2] === gameState[1][1] &&
            gameState[0][2] === gameState[2][0]
        )
            return gameState[2][0];
        return false;
    };

    const isAllFilled = () => {
        for (const nums of gameState) {
            for (const i of nums) {
                if (!i) return false;
            }
        }
        return true;
    };

    const fillGameState = (i, j, m) => {
        const updatedGameState = [...gameState];
        const newHistory = `Player ${player} putted ${player === 1 ? "X" : "O"
            } on row ${i + 1} and column ${j + 1}`;
        updatedGameState[i][j] = m;
        setGameState(updatedGameState);
        setHistory([...history, newHistory]);
        const res = checkIfWin(updatedGameState);
        if (res) {
            if (res === "X") setWinner(1);
            else setWinner(2);
        }
    };

    const handleClick = (e, i, j, k) => {
        if (winner !== 0) return;
        if (e && (e.target.textContent === "X" || e.target.textContent === "O"))
            return;
        let m = "X";
        if (player === 2 || k) {
            m = "O";
            setPlayer(1);
        } else {
            setPlayer(2);
        }
        fillGameState(i, j, m);
        if (singlePlayer && player === 1) handleBotPlayer();
    };

    if (
        winner !== 0 &&
        history[history.length - 1] !== `Player ${winner} won the game!`
    ) {
        setHistory([...history, `Player ${winner} won the game!`]);
    }

    if (winner === 0 && isAllFilled()) {
        setWinner(3);
        setHistory([...history, "Draw!"]);
    }

    const resetGameState = () => {
        setGameState(mat);
        setPlayer(1);
        setWinner(0);
        setHistory([...history, "game restarted"]);
    };

    return (
        <>
            <div className={style.app}>
                <div className={style.main}>
                    { winner ? (
                        winner === 3 ? (
                            <div className={style.winner} style={{backgroundColor:"#FBBC05"}}>Draw!</div>
                        ) : (
                            <div className={style.winner} style={{backgroundColor:winner===1 ? "#4285F4" : "#34A853"}}>
                                Player {winner} won the Game!
                            </div>
                        )
                    ) : (
                        <div className={style.winner} style={{backgroundColor:"rgba(62, 177, 223, 0.561)"}}>Player {player}'s Turn </div>
                    )}
                    <div className={style.grid}>
                        {gameState.map((row, i) =>
                            row.map((el, j) => {
                                return (
                                    <div
                                        key={i + j * 100}
                                        className={style.box}
                                        onClick={
                                            gameState[i][j] ? null : (e) => handleClick(e, i, j)
                                        }
                                    >
                                        {el ? el : " "}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
                <div className={style.history}>
                    <h2 className={style.historyTitle}>History</h2>
                    <div className={style.historyDetails}>
                        {history.length > 0
                            ? history.map((item, i) => (
                                <div 
                                    key={i} 
                                    className={style.historyItems}
                                >
                                    {item}
                                </div>
                            ))
                            : null}
                    </div>
                </div>
            </div>

            <div className={style.btns}>
                <button onClick={resetGameState} className={style.reset}>
                    Reset Game
                </button>
                <button onClick={onReset} className={style.reset}>
                    Back to Home Screen
                </button>
            </div>
        </>
    );
};

export default Game;
