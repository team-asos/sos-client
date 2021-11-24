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

  floor.sort(function (a, b) {
    if (parseInt(a.name.split('층')) < parseInt(b.name.split('층'))) return -1;
  });

  //삭제 층 데이터베이스 불러오기
  const [deleteFloor, setDeleteFloor] = useState('');

  const deleteClickHandler = async id => {
    console.log(deleteFloor);
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
          <div style={{ width: '100%' }}>
            <form style={{ width: '100%' }}>
              <label style={{ width: '100%' }}>
                층을 선택해주세요 : {'         '}
                <select
                  onChange={e => setDeleteFloor(e.target.value)}
                  value={deleteFloor}
                  style={{ width: '55%' }}
                >
                  <option value="">층 선택</option>
                  {floor.map(item => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </label>
            </form>
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
