import React, { useState, useEffect } from 'react';

import Cell from './a5_Cell';
import CreateTab from './a5_createTab';

import '../assets/styles/a5_seatBoard.css';

const SeatBoardDemo = ({ floorInfo }) => {
  const [clickedRow, setClickedRow] = useState(-1);
  const [clickedColumn, setClickedColumn] = useState(-1);
  const [seat, setSeat] = useState([]);

  useEffect(() => {
    const asd = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/seats`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setSeat(json);
        });
    };
    asd();
  }, []);

  seat.map(item => {
    if (item.floor.id === floorInfo.id) {
      console.log(item);
    }
  });

  //보드 만들기
  const createBoard = () => {
    let board = [];
    for (let i = 0; i < floorInfo.height; i++) {
      board.push([]);
      for (let j = 0; j < floorInfo.width; j++) {
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
      return <Cell data={data} clickCell={clickCell} />;
    });
    return <div className="row">{cells}</div>;
  };

  //cell(좌석, 회의실, 시설)을 클릭할 때
  const clickCell = (cell, e) => {
    //console.log(cell.y, cell.x, cell.status);
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
        <div className="board">
          {floorInfo.length === 0 ? (
            <p
              style={{
                color: '#c4c4c4',
                fontSize: 'smaller',
                fontStyle: 'italic',
              }}
            >
              층을 선택하면 이곳에 도면이 나타납니다.
            </p>
          ) : (
            <div>{newRows}</div>
          )}
        </div>
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
