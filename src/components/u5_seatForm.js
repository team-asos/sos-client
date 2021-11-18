import React, { useState, useEffect } from 'react';
import Cell from './u5_cell';
import Toilet from '../assets/images/toilet.png';
import AirConditioner from '../assets/images/air_conditioner.png';
import '../assets/styles/u5_seatForm.css';
const SeatForm = props => {
  const [show, setShow] = useState(false); //Seat아이콘 누르면 보여주기
  const [clickedRow, setClickedRow] = useState(-1);
  const [clickedColumn, setClickedColumn] = useState(-1);

  const [showRow, setShowRow] = useState(-1);
  const [showColumn, setshowColumn] = useState(-1);
  const [clickedSeat, setClickedSeat] = useState([]);

  const [seat, setSeat] = useState([]);
  const [room, setRoom] = useState([]);
  const [facility, setFacility] = useState([]);

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
  useEffect(() => {
    const asd = async id => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/rooms/search?floorId=${id}`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(json => {
          setRoom(json);
        });
    };
    asd(props.floorInfo.id);
  }, [props.floorInfo]);
  useEffect(() => {
    const asd = async id => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/facilities/search?floorId=${id}`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(json => {
          setFacility(json);
        });
    };
    asd(props.floorInfo.id);
  }, [props.floorInfo]);
  console.log(room);
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

    seat.map(item => {
      let occupied = board[item.x][item.y];
      occupied.status = 1;
    });

    return board;
  };
  //cells의 x, y 값과 좌석의 x,y값이 일치하면 좌석의 이름을 불러오기
  const getSeatName = (cellX, cellY) => {
    for (let i = 0; i < seat.length; i++) {
      if (seat[i].x === cellX && seat[i].y === cellY) {
        console.log(seat[i].name);
        return seat[i].name;
      }
    }
  };

  const createRow = row => {
    let cells = row.map((data, index) => {
      return (
        <Cell
          data={data}
          clickCell={clickCell}
          style={{
            backgroundColor: data.status === 1 ? 'green' : 'white',
            fontSize: data.status === 1 ? '1em' : '0em',
            color: data.status === 1 ? 'white' : '',
          }}
          seatName={getSeatName(data.x, data.y)}
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
        if (cell.x === item.x && cell.y === item.y) {
          setClickedSeat(item);
        }
      });
      setShowRow(cell.x);
      setshowColumn(cell.y);

      console.log('It already clicked');
    }
  };

  console.log(clickedRow);
  console.log(clickedColumn);
  const newRows = createBoard().map(row => createRow(row));
  return (
    <div className="seatFormStyle">
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
  );
};
export default SeatForm;
