import React, { useState } from 'react';
import Row from './a5_Row';
import Cell from './a5_Cell';
import '../assets/styles/a5_seatBoard.css';

export default class SeatBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 0,
      rows: 22,
      columns: 35,
    };
  }

  createBoard = () => {
    let board = [];
    for (let i = 0; i < this.state.rows; i++) {
      board.push([]);
      for (let j = 0; j < this.state.columns; j++) {
        board[i].push({
          x: j,
          y: i,
        });
      }
    }
    console.table(board);
    return board;
  };

  createRow = row => {
    console.log('createRow called');
    let cells = row.map((data, index) => {
      return <Cell key={index} data={data} />;
    });
    return <div classNam="row">1{cells}1</div>;
  };

  render() {
    const newRows = this.createBoard().map(row => this.createRow(row));
    return <div className="board">12{newRows}21</div>;
  }
}
