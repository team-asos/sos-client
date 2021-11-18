import React, { useState, useEffect } from 'react';

import Cell from './a5_Cell';
import CreateTab from './a5_createTab';

import '../assets/styles/a5_seatBoard.css';
import ShowSeatInfo from './a5_showSeatInfo';
import ShowRoomInfo from './a5_showRoomInfo';

const SeatBoardDemo = props => {
  const [clickedRow, setClickedRow] = useState(-1);
  const [clickedColumn, setClickedColumn] = useState(-1);

  const [clickedSeat, setClickedSeat] = useState([]);
  const [clickedRoom, setClickedRoom] = useState([]);

  const [seat, setSeat] = useState([]);
  const [room, setRoom] = useState([]);

  const [board, setBoard] = useState([]);

  useEffect(() => {
    const asd = async () => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/seats/search?floorId=${props.floorInfo.id}`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(json => {
          setSeat(json);
        });
    };

    const aaa = async () => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/rooms/search?floorId=${props.floorInfo.id}`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(json => {
          setRoom(json);
        });
    };

    asd();
    aaa();

    // if (seat.length !== 0 && room.length !== 0) {
    //   setBoard(createBoard());
    // }
  }, [props.floorInfo.id]);

  useEffect(() => {
    console.log(seat);
    console.log(room);
    console.log('--------');
  }, [seat, room]);

  //보드 만들기

  const createBoard = () => {
    let board = [];
    for (let i = 0; i < props.floorInfo.height; i++) {
      board.push([]);
      for (let j = 0; j < props.floorInfo.width; j++) {
        board[i].push({
          x: i,
          y: j,
          status: 0,
        });
      }
    }

    // console.log(props.floorInfo.width);
    // console.log(props.floorInfo.height);
    // console.log(seat);

    if (seat.length !== 0) {
      seat.map(item => {
        let occupiedSeat = board[item.y][item.x];
        occupiedSeat.status = 1;
      });
    }

    if (room.length !== 0) {
      room.map(item => {
        for (let i = item.x; i < item.width + item.x; i++) {
          for (let j = item.y; j < item.height + item.y; j++) {
            let occupiedRoom = board[i][j];
            occupiedRoom.status = 2;
          }
        }
        board[item.x][item.y].status = 3;
      });
    }

    return board;
  };
  const roomXY = (board, cell) => {
    let i = cell.y;
    let j = cell.x;

    while (true) {
      if (board[j][i].status === 3) break;
      else if (board[j][i].status === 0) {
        i += 1;
        break;
      } else i--;
    }

    while (board[j][i].status === 2) {
      j--;
    }
    room.map(item => {
      if (item.x === j && item.y === i) {
        setClickedRoom(item);
      }
    });
  };
  const createRow = (board, row) => {
    let cells = row.map((data, index) => {
      return (
        <Cell
          board={board}
          data={data}
          clickCell={clickCell}
          style={{
            backgroundColor:
              data.status === 1
                ? '#c00000'
                : data.status === 2 || data.status === 3
                ? 'black'
                : 'white',
            borderLeft:
              data.status === 2 || data.status === 3
                ? '1px solid transparent '
                : '',
            borderBottom:
              data.status === 2 || data.status === 3 ? '1px solid black' : '',
            borderTop:
              data.status === 2 || data.status === 3 ? '1px solid black' : '',
          }}
        />
      );
    });
    return <div className="row">{cells}</div>;
  };

  //cell(좌석, 회의실, 시설)을 클릭할 때
  const clickCell = (board, cell, e) => {
    setClickedRoom([]);
    setClickedSeat([]);

    if (cell.status === 0) {
      e.target.style.backgroundColor = 'rgb(76, 148, 76)';

      setClickedRow(cell.x);
      setClickedColumn(cell.y);
    } else if (cell.status === 1) {
      //좌석이 생성되어 있을 경우

      e.target.style.backgroundColor = 'gray';

      seat.map(item => {
        if (cell.x === item.y && cell.y === item.x) {
          setClickedSeat(item);
        }
      });
    } else if (cell.status === 2 || cell.status === 3) {
      roomXY(board, cell);
    }
  };

  // const board = createBoard();
  const newRows = createBoard().map(row => createRow(board, row));

  return (
    <div className="seatBoard">
      <div className="seatBoardLeft">
        <div className="board">
          {props.floorInfo.length === 0 ? (
            <p className="selectFloorText">
              층을 선택하면 이곳에 도면이 나타납니다.
            </p>
          ) : (
            <div>{newRows}</div>
          )}
        </div>
      </div>

      <div className="seatBoardRight">
        <div className="seatBoardRightTop">
          <CreateTab
            clickedColumn={clickedColumn}
            clickedRow={clickedRow}
            floorInfo={props.floorInfo}
          />
        </div>

        <div className="seatBoardRightBottom">
          {clickedSeat.length === 0 ? (
            clickedRoom.length === 0 ? (
              <p className="selectSeatText">
                정보를 조회할 <br />
                좌석, 회의실, 시설을 선택하세요.
              </p>
            ) : (
              <ShowRoomInfo clickedRoom={clickedRoom} />
            )
          ) : (
            <ShowSeatInfo clickedSeat={clickedSeat} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatBoardDemo;
