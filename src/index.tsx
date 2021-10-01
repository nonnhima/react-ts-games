import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './Home';
import './Home.css';
import { Othello } from './othello/Othello';
import reportWebVitals from './reportWebVitals';
import { Tetris } from './tetris/Tetris';
import { MemoryGame } from './ｍemoryGame/MemoryGame';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/othello">
        <Othello />
      </Route>
      <Route exact path="/memory_game">
        <MemoryGame />
      </Route>
      <Route exact path="/tetris">
        <Tetris />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
