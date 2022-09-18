import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import {API} from '../../../Config'


function Game() {

 
  const [results, setResults] = useState([]);
  const finalResult = useRef();

  useEffect(() => {
    if(results.length > 0){
      saveGame();
    }
    window.onload = () => {
      // Board matrix
      let board;
      let turn;
      let available;

      const start = () => {
        board = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
        turn = "X";
        available = [];
        draw();
      };

      function changeturn() {
        turn = turn == "X" ? "O" : "X";
      }

      const isEqual = (a, b, c) => {
        return a == b && b == c && c == a && a != "";
      };

      let p = document.querySelectorAll(".p");
      const cells = [
        [p[0], p[1], p[2]],
        [p[3], p[4], p[5]],
        [p[6], p[7], p[8]],
      ];

      // click feature
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let cell = cells[i][j];
          cell.addEventListener("click", () => {
            if (board[i][j] == "") {
              board[i][j] = turn;
              draw();
              changeturn();
              // randomAI();
              if (!check()) {
                bestMove();
                check();
              }
              // check();
              draw();
            }
          });
        }
      }

      // draw
      const draw = () => {
        available = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let cell = cells[i][j];
            if (board[i][j] == "") {
              available.push([i, j]);
            }
            cell.innerHTML = board[i][j];
            // console.log(cell)
            // check()
          }
        }
      };

      const check = (alertUser = true) => {
        for (let i = 0; i < 3; i++) {
          if (isEqual(board[i][0], board[i][1], board[i][2])) {
            // alert(`Player ${board[i][0]} wins`)
            if (alertUser) {
              setTimeout(() => {
                //   alert(`Player ${board[i][0]} wins`);
                setResults(board[i][0])
                //   start();
              }, 100);
            }
            return board[i][0];
          }
        }
        for (let i = 0; i < 3; i++) {
          if (isEqual(board[0][i], board[1][i], board[2][i])) {
            // alert(`Player ${board[0][i]} wins`)
            if (alertUser) {
              setTimeout(() => {
                //   alert(`Player ${board[0][i]} wins`);
                setResults(board[0][i])
                //   start();
              }, 100);
            }
            return board[0][i];
          }
        }
        if (isEqual(board[0][0], board[1][1], board[2][2])) {
          if (alertUser) {
            setTimeout(() => {
              // alert(`Player ${board[0][0]} wins`);
              setResults(board[0][0])
              // start();
            }, 100);
          }
          return board[0][0];
        }
        if (isEqual(board[2][0], board[1][1], board[0][2])) {
          if (alertUser) {
            setTimeout(() => {
              // alert(`Player ${board[2][0]} wins`);
              setResults(board[2][0])
              // start();
            }, 100);
          }
          return board[2][0];
        }
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
              return null;
            }
          }
        }
        if (alertUser) {
          setTimeout(() => {
            setResults("T");
            //   start();
          }, 100);
        }
        return "Tie";
      };

      const randomAI = () => {
        if (available.length) {
          let index = Math.floor(Math.random() * available.length);
          let i = available[index][0];
          let j = available[index][1];
          board[i][j] = turn;
          changeturn();
        }
      };

      const bestMove = () => {
        if (!available.length) {
          return;
        }
        let s = -1;
        let finalSpot = [0, 0];
        let depth = 0;
        for (let index = 0; index < available.length; index++) {
          const spot = available[index];
          board[spot[0]][spot[1]] = turn;
          let score = minimax(board, false, depth);
          // backtrack
          board[spot[0]][spot[1]] = "";

          if (s < score) {
            s = score;
            finalSpot = spot;
          }
        }
        let i = finalSpot[0];
        let j = finalSpot[1];
        board[i][j] = turn;
        changeturn();
      };

      function minimax(board, isMaximizing, depth) {
        let result = check(false);
        if (result) {
          if (result == "X") {
            return -1;
          }
          if (result == "O") {
            return 1;
          }
          return 0;
        }
        if (isMaximizing) {
          let s = -1;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (board[i][j] == "") {
                board[i][j] = "O";
                let score = minimax(board, false, depth + 1);
                // backtrack
                board[i][j] = "";
                s = Math.max(s, score);
              }
            }
          }
          return s;
        } else {
          let s = 1;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (board[i][j] == "") {
                board[i][j] = "X";
                let score = minimax(board, true, depth + 1);
                s = Math.min(s, score);
                board[i][j] = "";
              }
            }
          }
          return s;
        }
      }

      start();
    };
  })



  const saveGame = () => {
    let data = {};

    data['result'] = finalResult.current.value;
    data['email'] = JSON.parse(localStorage.getItem('users')).email;
    data['name'] = JSON.parse(localStorage.getItem('users')).name;
    data['uid'] = JSON.parse(localStorage.getItem('users')).id;


    fetch(API + "/histryplayer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status == 200) {
            response.json().then((resp) => {
                console.log("results", resp);

                setTimeout(function(){
                  window.location.href = "/dashboard"; 
               }, 3000);
               

            });
        }
        else {
            alert("invalid login")
        }

    })



}

const ClearBoard = ()=>{
  window.location.href = ""; 
}


  return (
    <main>

      <section id="ttt" className="section-ticgame">
        <div className="p p1"></div>
        <div className="p p2"></div>
        <div className="p p3"></div>
        <div className="p p4"></div>
        <div className="p p5"></div>
        <div className="p p6"></div>
        <div className="p p7"></div>
        <div className="p p8"></div>
        <div className="p p9"></div>
      </section>

      <div className='Display_bg'>

        <input value={results.length > 0 && results == "X" ? "You Won" : "" || results.length > 0 && results == "O" ? "You Lost" : "" || results.length > 0 && results == "T" ? "Game Tied" : ""} ref={finalResult} />
       

      </div>

      <div className="save-btn">
        {/* <button className='Clear_bg' >
          Save Game
        </button> */}
       
         <button className='Clear_bg' onClick={ClearBoard}>Clear Board</button>
        
      </div>

    </main>
  );
}

export default Game;