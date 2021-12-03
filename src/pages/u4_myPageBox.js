import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

import SeatReservationInfo from '../components/u4_seatReservationInfo';
import RoomReservationInfo from '../components/u4_roomReservationInfo';

import * as fa from 'react-icons/fa';
import * as ri from 'react-icons/ri';

import '../assets/styles/u4_myPageBox.css';

const MyPageBox = props => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  //쿠키 생성
  const [cookie, removeCookie] = useCookies(['access_token']);

  //유저 불러오기
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setUser(json);
        });
    };
    fetchUser();
  }, []);

  const [myData, setMyData] = useState([]);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    employeeId: '',
    tel: '',
    department: '',
    position: '',
    password: '',
    confirmPw: '',
  });

  const res = async () => {
    const id = Number(props.user.id);
    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.access_token}`,
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setMyData(json);
        setEditData({
          name: json.name,
          email: json.email,
          employeeId: json.employeeId,
          tel: json.tel,
          department: json.department,
          position: json.position,
        });
      });
  };
  const [edit, setEdit] = useState(false);
  const [showPwInput, setShowPwInput] = useState(false);

  const [pw, setPw] = useState('');
  const inputPw = e => {
    setPw(e.target.value);
  };

  const loginAgainClickHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email: props.user.email,
          password: pw,
        }),
      },
    );

    if (response.status === 200) {
      setEdit(true);
      setShowPwInput(false);
    } else if (response.status === 401) {
      alert('비밀번호가 잘못되었습니다.');
    } else {
      alert(response.status);
    }
  };

  /*정보 수정 */
  const confirmHandler = async () => {
    if (editData.password.length < 8) {
      alert('8자리 이상의 비밀번호를 입력해주세요.');
      return;
    }
    const id = Number(props.user.id);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/users/${id}`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'PATCH',
        body: JSON.stringify({
          name: editData.name,
          email: editData.email,
          employeeId: editData.employeeId,
          tel: editData.tel,
          department: editData.department,
          position: editData.position,
          password: editData.password,
        }),
      },
    );
    if (response.status === 200) {
      alert('수정이 완료되었습니다.');
      removeCookie('access_token');
    } else alert(response.message);
  };

  useEffect(() => {
    if (props.user.id !== 'undefined') res();
  }, [props.user.id]);

  //Input Onchange : 정보 수정 함수
  const editName = e => {
    setEditData({
      ...editData,
      name: e.target.value,
    });
  };
  const editEmail = e => {
    setEditData({
      ...editData,
      email: e.target.value,
    });
  };
  const editEmployeeId = e => {
    setEditData({
      ...editData,
      employeeId: e.target.value,
    });
  };
  const editTel = e => {
    setEditData({
      ...editData,
      tel: e.target.value,
    });
  };
  const editDepartment = e => {
    setEditData({
      ...editData,
      department: e.target.value,
    });
  };
  const editPosition = e => {
    setEditData({
      ...editData,
      position: e.target.value,
    });
  };
  const editPw = e => {
    setEditData({
      ...editData,
      password: e.target.value,
    });
  };
  const editConfirmPw = e => {
    setEditData({
      ...editData,
      confirmPw: e.target.value,
    });
  };
  const confirmPwHandler = () => {
    if (editData.password !== editData.confirmPw) {
      alert('비밀번호가 다릅니다.');
    } else {
    }
  };

  //탈퇴 모달창
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  //탈퇴 - 확인 눌렀을 때,
  const dropClick = () => {
    handleClose();
    const dropUser = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/${props.user.id}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cookie.access_token}`,
          },
          method: 'DELETE',
        },
      );
      if (response.status === 200) {
        removeCookie('access_token');
        alert('탈퇴가 완료되었습니다.');
      } else {
        const json = await response.json();
        alert(json.message);
      }
    };
    dropUser();
  };

  useEffect(() => {
    if (cookie.access_token === 'undefined') {
      history.push('/');
    }
  }, [cookie]);

  return (
    <div className="myPageBox">
      <div className={isPc ? 'myPageBox-left' : 'm_myPageBox-left'}>
        <div className="myPageBox-left-myinfo">
          <div className="myPageBox-left-myinfo-content">
            <div className="myPageBox-text-info">
              {isPc ? (
                <p style={{ fontWeight: 'bold', fontSize: '1.7em' }}>
                  나의 정보
                </p>
              ) : null}
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                  <Tooltip
                    id="tooltip-right"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      marginLeft: '1%',
                    }}
                  >
                    수정하기
                  </Tooltip>
                }
              >
                <p>
                  <fa.FaUserEdit
                    size={isPc ? 25 : 20}
                    className="myPage-edit-icon"
                    onClick={e => setShowPwInput(true)}
                    style={
                      edit === true
                        ? { visibility: 'hidden' }
                        : { visibility: 'visible' }
                    }
                  />
                </p>
              </OverlayTrigger>
            </div>
            {showPwInput === false ? (
              <div className="detail-info-container">
                <div className={isPc ? 'detail-info' : 'm_detail-info'}>
                  <label>이름</label>
                  <input
                    type="text"
                    className="edit-form-control"
                    onChange={editName}
                    value={editData.name}
                    disabled={edit === false ? true : false}
                  />
                </div>
                <div className={isPc ? 'detail-info' : 'm_detail-info'}>
                  <label>이메일</label>
                  <input
                    type="text"
                    className="edit-form-control"
                    onChange={editEmail}
                    value={editData.email}
                    disabled={edit === false ? true : false}
                  />
                </div>
                <div className={isPc ? 'detail-info' : 'm_detail-info'}>
                  <label>비밀번호 </label>
                  <input
                    type="password"
                    className="edit-form-control"
                    placeholder="수정 시에 보여집니다."
                    onChange={editPw}
                    disabled={edit === false ? true : false}
                  />
                </div>
                <div className={isPc ? 'detail-info' : 'm_detail-info'}>
                  <label>비밀번호 확인 </label>
                  <input
                    type="password"
                    className="edit-form-control"
                    placeholder="수정 시에 보여집니다."
                    onBlur={confirmPwHandler}
                    onChange={editConfirmPw}
                    disabled={edit === false ? true : false}
                  />
                </div>
                <div className={isPc ? 'detail-info' : 'm_detail-info'}>
                  <label>사원번호</label>
                  <input
                    type="text"
                    className="edit-form-control"
                    onChange={editEmployeeId}
                    value={editData.employeeId}
                    disabled={edit === false ? true : false}
                  />
                </div>
                <div className={isPc ? 'detail-info' : 'm_detail-info'}>
                  <label>전화번호</label>
                  <input
                    type="text"
                    className="edit-form-control"
                    onChange={editTel}
                    value={editData.tel}
                    disabled={edit === false ? true : false}
                  />
                </div>
                <div className={isPc ? 'detail-info' : 'm_detail-info'}>
                  <label>부서</label>
                  <input
                    type="text"
                    className="edit-form-control"
                    onChange={editDepartment}
                    value={editData.department}
                    disabled={edit === false ? true : false}
                  />
                </div>
                <div className={isPc ? 'detail-info' : 'm_detail-info'}>
                  <label>직급</label>
                  <input
                    type="text"
                    className="edit-form-control"
                    onChange={editPosition}
                    value={editData.position}
                    disabled={edit === false ? true : false}
                  />
                </div>
                <div className="edit-button-group">
                  <button
                    onClick={confirmHandler}
                    style={
                      edit === false
                        ? { visibility: 'hidden' }
                        : { visibility: 'visible' }
                    }
                  >
                    수정완료
                  </button>
                  <button
                    onClick={handleShow}
                    style={
                      edit === false
                        ? { visibility: 'hidden' }
                        : { visibility: 'visible' }
                    }
                  >
                    탈퇴
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="input-password-form"
                style={
                  showPwInput === false
                    ? { visibility: 'hidden' }
                    : { visibility: 'visible' }
                }
              >
                <ri.RiLockPasswordFill
                  size={30}
                  style={{ marginBottom: '2.5%', color: '#8f0000' }}
                />
                <p
                  style={
                    isPc
                      ? { fontWeight: 'bold' }
                      : { fontWeight: 'bold', fontSize: '0.8em' }
                  }
                >
                  본인확인을 위해 비밀번호를 입력해주세요.
                </p>
                <input
                  className={isPc ? 'confirmPWInput' : 'm_confirmPWInput'}
                  type="password"
                  placeholder="비밀번호"
                  onChange={inputPw}
                  value={pw}
                />
                <div
                  style={{
                    marginTop: '3%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <button
                    className={isPc ? 'confirmPwBtn' : 'm_confirmPwBtn'}
                    onClick={e => setShowPwInput(false)}
                  >
                    취소
                  </button>
                  <button
                    className={isPc ? 'confirmPwBtn' : 'm_confirmPwBtn'}
                    onClick={loginAgainClickHandler}
                    style={{ marginLeft: '4%' }}
                  >
                    확인
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isPc ? (
        <div className="myPageBox-right">
          <div className="myPageBox-right-seat">
            <SeatReservationInfo user={props.user} />
          </div>

          <div className="myPageBox-right-room">
            <RoomReservationInfo user={props.user} />
          </div>
        </div>
      ) : null}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>탈퇴하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="danger" onClick={dropClick}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default MyPageBox;
