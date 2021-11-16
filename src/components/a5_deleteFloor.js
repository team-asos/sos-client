import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const DeleteFloor = () => {
  //층 불러오기
  const [floor, setFloor] = useState([]);
  useEffect(() => {
    const asd = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/floors`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setFloor(json);
        });
    };
    asd();
  }, []);

  //삭제 층 데이터베이스 불러오기
  const [deleteFloor, setDeleteFloor] = useState('');
  const [deleteFloorId, setDeletedFloorId] = useState('');

  const inputDeleteFloor = e => {
    setDeleteFloor(e.target.value);
    findFloorId(e.target.value);
  };

  const deleteClickHandler = async id => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors/${id}`,
      {
        method: 'DELETE',
      },
    );
    if (result.status === 200) {
      alert('층 삭제에 성공하였습니다.');
      window.location.href = '/seat-management';
    } else if (result.status === 404) {
      alert('존재하지 않는 층입니다.');
      window.location.href = '/seat-management';
    }
  };

  const findFloorId = delete_floor_name => {
    floor.map(item => {
      if (delete_floor_name === item.name) {
        setDeletedFloorId(item.id);
      }
    });
    console.log(deleteFloor);
  };

  return (
    <div>
      <Modal.Body>
        <div className="createFloorModal">
          <div>
            <label>층 이름 : </label>
            <input
              className="floorInputForm"
              placeholder=" (숫자+층)으로 입력해주세요. 예) 1층"
              onChange={inputDeleteFloor}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => deleteClickHandler(deleteFloorId)}
          className="floorControlButton"
        >
          삭제하기
        </button>
      </Modal.Footer>
    </div>
  );
};

export default DeleteFloor;
