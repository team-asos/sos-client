import React, { useState, useEffect } from 'react';

import Cell from './a5_Cell';
import CreateTab from './a5_createTab';

import '../assets/styles/a5_seatBoard.css';
import ShowTab from './a5_showTab';

const SeatBoardDemo = props => {
  const [clickedRow, setClickedRow] = useState(-1);
  const [clickedColumn, setClickedColumn] = useState(-1);

  const [showRow, setShowRow] = useState(-1);
  const [showColumn, setshowColumn] = useState(-1);
  const [clickedSeat, setClickedSeat] = useState([]);

  const [seat, setSeat] = useState([]);
  const [room, setRoom] = useState([]);

  useEffect(() => {
    const asd = async id => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/seats/search?floorId=${id}`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(json => {
          setSeat(json);
        });
    };
    asd(props.floorInfo.id);
  }, [props.floorInfo]);

  //보드 만들기
  const createBoard = () => {
    let board = [];
    for (let i = 0; i < props.floorInfo.height; i++) {
      board.push([]);
      for (let j = 0; j < props.floorInfo.width; j++) {
        board[i].push({
          x: j,
          y: i,
          status: 0,
        });
      }
    }

    seat.map(item => {
      let occupied = board[item.x][item.y];
      occupied.status = 1;
    });

    return board;
  };

  const createRow = row => {
    let cells = row.map((data, index) => {
      return (
        <Cell
          data={data}
          clickCell={clickCell}
          style={{
            backgroundColor: data.status === 1 ? '#c00000' : 'white',
          }}
        />
      );
    });
    return <div className="row">{cells}</div>;
  };

  //cell(좌석, 회의실, 시설)을 클릭할 때
  const clickCell = (cell, e) => {
    if (cell.status === 0) {
      e.target.style.backgroundColor = 'rgb(76, 148, 76)';

      setClickedRow(cell.x);
      setClickedColumn(cell.y);

      console.log(
        'It can be clicked, ',
        cell.status,
        clickedRow,
        clickedColumn,
      );
    } else {
      e.target.style.backgroundColor = 'gray';

      seat.map(item => {
        if (cell.x === item.y && cell.y === item.x) {
          setClickedSeat(item);
        }
      });

      console.log(clickedSeat);

      setShowRow(cell.x);
      setshowColumn(cell.y);

      console.log('It already clicked');
    }
  };

  const newRows = createBoard().map(row => createRow(row));

  return (
    <div className="seatBoard">
      <div className="seatBoardLeft">
        <div className="board">
          {props.floorInfo.length === 0 ? (
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
        <div style={{ height: '50%' }}>
          <CreateTab
            clickedColumn={clickedColumn}
            clickedRow={clickedRow}
            floorInfo={props.floorInfo}
          />
        </div>
        <div
          style={{
            width: '95%',
            height: '50%',
            borderTop: '1px solid #c00000',
          }}
        >
          <ShowTab clickedSeat={clickedSeat} />
        </div>
      </div>
    </div>
  );
};

export default SeatBoardDemo;
