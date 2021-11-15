import React, { useState } from 'react';

import Cell from './a5_Cell';
import '../assets/styles/a5_seatBoard.css';
import CreateTab from './a5_createTab';

const SeatBoardDemo = ({ floorInfo }) => {
  const [status, setStatus] = useState(0);
  const [rows, setRows] = useState(20);
  const [columns, setColumns] = useState(35);
  const [clickedRow, setClickedRow] = useState(-1);
  const [clickedColumn, setClickedColumn] = useState(-1);

  console.log(floorInfo); //출력 완료

  //보드 만들기
  const createBoard = () => {
    let board = [];
    for (let i = 0; i < rows; i++) {
      board.push([]);
      for (let j = 0; j < columns; j++) {
        board[i].push({
          x: j,
          y: i,
          status: 0,
        });
      }
    }
    return board;
  };

  const createRow = row => {
    let cells = row.map((data, index) => {
      return <Cell key={index} data={data} clickCell={clickCell} />;
    });
    return <div className="row">{cells}</div>;
  };

  //cell(좌석, 회의실, 시설)을 클릭할 때
  const clickCell = (cell, e) => {
    console.log(cell.y, cell.x, cell.status);

    e.target.style.backgroundColor = 'rgb(76, 148, 76)';

    if (cell.status === 0) {
      cell.status = 1;

      setClickedColumn(cell.x);
      setClickedRow(cell.y);

      console.log(
        'It can be clicked, ',
        cell.status,
        clickedRow,
        clickedColumn,
      );
    } else {
      console.log('It already clicked');
    }
  };

  const newRows = createBoard().map(row => createRow(row));
  return (
    <div className="seatBoard">
      <div className="seatBoardLeft">
        <div className="board">{newRows}</div>
      </div>

      <div className="seatBoardRight">
        <div>
          <CreateTab
            clickedColumn={clickedColumn}
            clickedRow={clickedRow}
            floorInfo={floorInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default SeatBoardDemo;
