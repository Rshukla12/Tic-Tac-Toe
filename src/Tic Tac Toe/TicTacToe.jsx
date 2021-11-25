import React, { useState } from "react";
import Game from "./Game";
import style from "./TicTacToe.module.css";

const TicTacToe = () => {
    const [type, setType] = useState(null);
    const resetGame = () => {
        setType(null);
    }
    return (
        <div className={style.app}>
            {type ? type === 1 ? (
                <Game singlePlayer={true} onReset={resetGame} />
            ) : (
                <Game singlePlayer={false} onReset={resetGame} />
            ) : (
                <div>
                    <div className={style.main}>Play Tic-Tac-Toe</div>
                    <img className={style.img} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/1200px-Tic_tac_toe.svg.png" alt="Tic Tac Toe" />
                    <div className={style.btns}>
                        <button className={style.btn} onClick={() => setType(1)}>
                            Challenge Computer
                        </button>
                        <button className={style.btn} onClick={() => setType(2)}>
                            Challenge Friend
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TicTacToe;