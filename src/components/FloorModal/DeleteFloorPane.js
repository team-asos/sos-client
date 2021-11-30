import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Modal } from 'react-bootstrap';

export const DeleteFloor = () => {
  const [floors, setFloors] = useState([]);
  const [deleteFloor, setDeleteFloor] = useState('');

  const [cookie] = useCookies('access_token');

  useEffect(() => {
    const fetchFloors = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
        {
          method: 'GET',
        },
      );

      setFloors(await result.json());
    };

    fetchFloors();
  }, []);

  const deleteClickHandler = async floorName => {
    const floorId = 0;

    const findId = floorId => {
      floors.map(floor => {
        if (floor.name === floorName) {
          floorId = floor.id;
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
        <div className="floor-modal-pane">
          <div>
            <label>층 이름 : </label>
            <input
              className="floor-modal-input"
              placeholder=" (숫자+층)으로 입력해주세요. 예) 1층"
              onChange={e => setDeleteFloor(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => deleteClickHandler(deleteFloor)}
          className="floor-modal-button"
        >
          삭제하기
        </button>
      </Modal.Footer>
    </div>
  );
};
