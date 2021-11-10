import { mapToStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import React, { useState, useEffect } from 'react';

import { Modal } from 'react-bootstrap';

function FloorModal({ show, handleClose }) {
  //층 가져오기
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

  //층 생성하기
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const inputName = e => {
    setName(e.target.value);
  };
  const inputWidth = e => {
    setWidth(e.target.value);
  };
  const inputHeight = e => {
    setHeight(e.target.value);
  };

  const createClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name,
          width: Number(width),
          height: Number(height),
        }),
      },
    );
    if (result.status === 201) {
      alert('층이 생성되었습니다.');
      window.location.href = '/seat-management';
    }
  };

  //층 삭제하기
  const [deleteFloor, setDeleteFloor] = useState('');
  const [deleteFloorId, setDeletedFloorId] = useState('');

  const inputDeleteFloor = e => {
    setDeleteFloor(e.target.value);
    findFloorId(e.target.value);
  };

  const deleteClickHandler = async id => {
    console.log(id);
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors/${id}`,
      {
        method: 'DELETE',
      },
    );
    if (result.status === 200) {
      alert('층이 삭제되었습니다.');
      window.location.href = '/seat-management';
    }
  };

  const findFloorId = delete_floor_name => {
    floor.map((item, idx) => {
      if (delete_floor_name === item.name) {
        setDeletedFloorId(item.id);
      }
    });
  };

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>층 편집</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="floorModal">
          <div className="createFloorModal">
            <h3>층 추가하기</h3>
            <div>
              층 이름 : {'   '}
              <input
                className="floorInputForm"
                placeholder="  (숫자+층)으로 입력해주세요. 예) 1층"
                onChange={inputName}
                style={{ width: '20vw', marginTop: '2%' }}
              />
            </div>
            <div>
              층의 가로 길이 :{' '}
              <input
                className="floorInputForm"
                placeholder="  35이하의 숫자로 입력해주세요. 예) 30"
                onChange={inputWidth}
                style={{ width: '20vw', marginTop: '2%' }}
              />
            </div>
            <div>
              층의 세로 길이 :{' '}
              <input
                className="floorInputForm"
                placeholder="  20의 숫자로 입력해주세요. 예) 30"
                onChange={inputHeight}
                style={{ width: '20vw', marginTop: '2%' }}
              />
            </div>
            <button
              onClick={createClickHandler}
              style={{
                backgroundColor: '#c00000',
                color: 'white',
                border: 'none',
                borderRadius: '2px',
              }}
            >
              생성하기
            </button>
          </div>
          <div className="deleteFloorModal">
            <h3>층 삭제하기</h3>
            <div>
              층 이름 : {'   '}
              <input
                className="floorInputForm"
                placeholder="  (숫자+층)으로 입력해주세요. 예) 1층"
                onChange={inputDeleteFloor}
                style={{ width: '20vw', marginTop: '2%' }}
              />
            </div>

            <button
              onClick={() => deleteClickHandler(deleteFloorId)}
              style={{
                backgroundColor: '#c00000',
                color: 'white',
                border: 'none',
                borderRadius: '2px',
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default FloorModal;
