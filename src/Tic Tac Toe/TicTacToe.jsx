import React, { useState } from "react";
import style from "./TicTacToe.module.css";

const TicTacToe = ({singlePlayer}) => {
    const mat = new Array(3).fill(0).map((el) => new Array(3).fill(null));
    const [gameState, setGameState] = useState(mat);
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState(0);
    const [history, setHistory] = useState([]);
    
    const handleBotPlayer = () => {
        for( let i = 0; i < gameState.length; i++ ){
            let con = false;
            for ( let j = 0; j < gameState.length; j++ ){
                if ( !gameState[i][j] ){
                    handleClick(false, i, j, true);
                    con = true;
                    break;
                }
            }
            if ( con ) break;
        }
    }

    const checkIfWin = () => {
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i][0] === gameState[i][1] && gameState[i][0] === gameState[i][2])
                return gameState[i][2];
            if (gameState[0][i] === gameState[1][i] && gameState[0][i] === gameState[2][i])
                return gameState[2][i];
        }
        if (gameState[0][0] === gameState[1][1] && gameState[0][0] === gameState[2][2])
            return gameState[2][2];
        if (gameState[0][2] === gameState[1][1] && gameState[0][2] === gameState[2][0])
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

    const handleClick = ( e, i, j, k ) => {
        if ( winner !== 0 ) return;
        if ( e && ( e.target.textContent === "X" || e.target.textContent === "O" ) ) return;
        let m = "X";
        if (player === 2 || k ) {
            m = "O";
            setPlayer(1);
        } else {
            setPlayer(2);
        }
        const updatedGameState = [...gameState];
        const newHistory = `Player ${player} putted ${player===1?"X" : "O"} on row ${i+1} and column ${j+1}`;
        updatedGameState[i][j] = m;
        setGameState(updatedGameState);
        setHistory([...history, newHistory]);
        const res = checkIfWin();
        if (res) {
            if (res === "X") setWinner(1);
            else setWinner(2);
        }
        if ( singlePlayer && player===2 ) handleBotPlayer();
    };

    if ( winner !== 0 && history[history.length-1] !== `Player ${winner} won the game!` ){
        setHistory([...history, `Player ${winner} won the game!`]);
    }

    if ( winner === 0 && isAllFilled() ) {
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
        <div className={style.app}>
            <div className={style.main}>
                {winner ? (
                    winner === 3 ? (
                        <div className={style.winner} >Draw!</div>
                    ) : (
                        <div className={style.winner} > Player {winner} won the Game! </div>
                    )
                ) : (
                    <div className={style.winner} >Player {player}'s Turn </div>
                )}
                <div className={style.grid}>
                    {gameState.map((row, i) =>
                        row.map((el, j) => {
                            return (
                                <div key={i+j*100}
                                    className={style.box}
                                    onClick={ gameState[i][j] ? null : (e) => handleClick(e, i, j) }
                                >
                                    {el ? el : " "}
                                </div>
                            );
                        })
                    )}
                </div>
                <button onClick={resetGameState} className={style.reset}>
                    Reset
                </button>
            </div>    
            <div className={style.history}>
                <h2 className={style.historyTitle}>History</h2>
                <div className={style.historyDetails}>
                    {history.length > 0 ? (
                        history.map(item => 
                            <div className={style.historyItems}>{item}</div>
                        )
                    ) : ( null )}
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
