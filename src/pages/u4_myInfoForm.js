import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FiMenu } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';

import MyReservationList from '../components/u4_myReservationListForm';

import NavBarUser from '../components/u_navBar';
import MobileNavBar from '../components/u_m_navBar';

import '../assets/styles/u4_myInfoForm.css';

//마이페이지->나의 정보
const MyInfoForm = props => {
  //Mobile - 네비바 열기
  const [open, setOpen] = useState(false);
  const navClick = () => {
    setOpen(!open);
  };

  //판별
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });

  //쿠키 생성
  const [cookie, removeCookie] = useCookies(['access_token']);

  //탈퇴 관련
  const history = useHistory();

  //사용자 정보를 모두 저장
  const [myData, setMyData] = useState([]);
  const [state, setState] = useState(0);

  //탈퇴 모달창
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //유저 불러오기
  //먼저 유저정보를 저장하고 수정하는 변수
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

  useEffect(() => {
    const res = async () => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/${props.match.params.idx}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.access_token}`,
          },
          method: 'GET',
        },
      )
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

    res();
  }, []);

  //권한 가져오기
  const [user, setUser] = useState({});

  useEffect(() => {
    const res = async () => {
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
    res();
  }, []);

  /*정보 수정 */
  const confirmHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/users/${props.match.params.idx}`,
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
    if (response.status === 200) alert('수정이 완료되었습니다.');
    else alert(response.message);
  };

  //수정 input, onChange
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

  const clickHandler = id => {
    setState(id);
  };

  //탈퇴 - 확인 눌렀을 때,
  const dropClick = () => {
    handleClose();
    const dropUser = async () => {
      console.log(props.match.params.idx);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/${props.match.params.idx}`,
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

  //탈퇴 처리
  useEffect(() => {
    if (cookie.access_token === 'undefined') {
      history.push('/');
    }
  }, [cookie]);

  return (
    <div className="userMyPage">
      {open ? <MobileNavBar open={open} /> : ''}
      <div>{isPc ? <NavBarUser /> : null}</div>
      <div className={isPc ? 'u_myPageForm' : 'm_u_myPageForm '}>
        <div className="u_myPageHeader">
          <div>
            {isMobile ? (
              <FiMenu
                size={40}
                onClick={navClick}
                style={{ color: '#820101' }}
              />
            ) : (
              ''
            )}
          </div>
          <div
            className={
              isPc ? 'u_myPageHeaderTextStyle' : 'm_u_myPageHeaderTextStyle'
            }
          >
            마이페이지
          </div>

          <div
            onClick={() => clickHandler(1)}
            className={isPc ? 'myRLMenuTextStyle' : 'm_myPageMenuText'}
          >
            {isPc ? '나의 예약 내역' : '예약 내역'}
          </div>
          <div
            onClick={() => clickHandler(0)}
            className={isPc ? 'myInfoMenuTextStyle' : 'm_myPageMenuText'}
          >
            {isPc ? '나의 정보 수정' : '정보 수정'}
          </div>
        </div>
        <div className="myInfoForm">
          {/* 탭메뉴 눌렀을 때 */}
          {state === 1 ? (
            <MyReservationList user={user} />
          ) : (
            <>
              {/* 정보 수정 */}
              <p className="myInfoFormTitleTextStyle">나의 정보 수정</p>

              {isPc ? (
                <div className="myInfoDetailForm">
                  <div className="column">
                    <div>
                      <label>이름</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={editName}
                        value={editData.name}
                      />
                    </div>
                    <div className="setPadding">
                      <label>이메일</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={editEmail}
                        value={editData.email}
                      />
                    </div>
                  </div>

                  <div className="column">
                    <div>
                      <label>비밀번호</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="대소문자와 숫자를 포함한 8~12자리"
                        onChange={editPw}
                        //value={password}
                      />
                    </div>
                    <div className="setPadding">
                      <label>비밀번호 확인</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="비밀번호 확인"
                        onBlur={confirmPwHandler}
                        onChange={editConfirmPw}
                        //value={confirmPw}
                      />
                    </div>
                  </div>
                  <div className="column">
                    <div>
                      <label>사원번호</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={editEmployeeId}
                        value={editData.employeeId}
                      />
                    </div>
                    <div className="setPadding">
                      <label>전화번호</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={editTel}
                        value={editData.tel}
                      />
                    </div>
                  </div>

                  <div className="column">
                    <div>
                      <label>부서</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={editDepartment}
                        value={editData.department}
                      />
                    </div>
                    <div className="setPadding">
                      <label>직급</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={editPosition}
                        value={editData.position}
                      />
                    </div>
                  </div>
                  <div className="infoBottom">
                    <button
                      className="editFinishButton"
                      onClick={confirmHandler}
                    >
                      완료
                    </button>
                    <p className="dropUser" onClick={handleShow}>
                      회원 탈퇴
                    </p>
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
                </div>
              ) : (
                <div className="m_myInfoDetailForm">
                  <div>
                    <label style={{ display: 'block' }}>이름</label>
                    <input
                      type="text"
                      className="m_myInfoForm-control"
                      onChange={editName}
                      value={editData.name}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block' }}>이메일</label>
                    <input
                      type="text"
                      className="m_myInfoForm-control"
                      onChange={editEmail}
                      value={editData.email}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block' }}>비밀번호</label>
                    <input
                      type="password"
                      className="m_myInfoForm-control"
                      placeholder="대소문자와 숫자를 포함한 8~12자리"
                      onChange={editPw}
                      //value={password}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block' }}>비밀번호 확인</label>
                    <input
                      type="password"
                      className="m_myInfoForm-control"
                      placeholder="비밀번호 확인"
                      onBlur={confirmPwHandler}
                      onChange={editConfirmPw}
                      //value={confirmPw}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block' }}>사원번호</label>
                    <input
                      type="text"
                      className="m_myInfoForm-control"
                      onChange={editEmployeeId}
                      value={editData.employeeId}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block' }}>전화번호</label>
                    <input
                      type="text"
                      className="m_myInfoForm-control"
                      onChange={editTel}
                      value={editData.tel}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block' }}>부서</label>
                    <input
                      type="text"
                      className="m_myInfoForm-control"
                      onChange={editDepartment}
                      value={editData.department}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block' }}>직급</label>
                    <input
                      type="text"
                      className="m_myInfoForm-control"
                      onChange={editPosition}
                      value={editData.position}
                    />
                  </div>
                  <div className="infoBottom">
                    <button
                      className="m_editFinishButton"
                      onClick={confirmHandler}
                    >
                      완료
                    </button>
                    <p className="m_dropUser" onClick={handleShow}>
                      회원 탈퇴
                    </p>
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
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyInfoForm;
