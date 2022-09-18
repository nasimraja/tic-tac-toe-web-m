
import React, { Component,useState,useEffect } from 'react';
import Header from '../Header';

const GameStart = () => {


  
    return(
        <div>
          <Header />
          <div className="game-start-bg">
              <div className="boxgame-start">
                  <h3>Tic Tac Toe Game</h3>
                  <hr></hr>
                  <div className="wrp-player-btn">
                      <div className='player-btn'>
                          <a href="#"><p>You</p>
                              Player (X)</a>
                      </div>
                      <div className='player-btn'>
                          <a href="#">
                            <p>Your Computer</p>
                              Player (o)</a>
                      </div>
                  </div>
                  <div className='btn-play-game'><a href="/game">Start Game</a></div>
              </div>
          </div>
           
        </div>
    )
}

export default GameStart;