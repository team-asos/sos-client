import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Modal } from 'react-bootstrap';

const DeleteFloor = () => {
  //층 불러오기
  const [floor, setFloor] = useState([]);
  const [cookie] = useCookies('access_token');

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

  const deleteClickHandler = async floorName => {
    const floorId = 0;

    const findId = floorId => {
      floor.map(item => {
        if (item.name === floorName) {
          floorId = item.id;
          return floorId;
        }
      });
      return floorId;
    };

    const id = findId(floorId);

    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors/${id}`,
      {
        headers: { Authorization: `Bearer ${cookie.access_token}` },
        method: 'DELETE',
      },
    );
    if (result.status === 200) {
      alert('층 삭제에 성공하였습니다.');
    } else if (result.status === 404) {
      alert('존재하지 않는 층입니다.');
    } else {
      alert('400 오류');
    }
    window.location.href = '/seat-management';
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
              onChange={e => setDeleteFloor(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => deleteClickHandler(deleteFloor)}
          className="floorControlButton"
        >
          삭제하기
        </button>
      </Modal.Footer>
    </div>
  );
};

export default DeleteFloor;
