import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import SeatReservationInfo from '../components/u4_seatReservationInfo';

import * as fa from 'react-icons/fa';
import '../assets/styles/u4_myPageBox.css';

const MyPageBox = props => {
  console.log(props.user.id);
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

  useEffect(() => {
    if (props.user.id !== 'undefined') res();
  }, [props.user.id]);

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
  return (
    <div className="myPageBox">
      <div className="myPageBox-left">
        <div className="myPageBox-left-myinfo">
          <div className="myPageBox-left-myinfo-content">
            <div className="myPageBox-text-info">
              <p style={{ fontWeight: 'bold', fontSize: '1.6em' }}>나의 정보</p>
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
                  <fa.FaUserEdit size={25} className="myPage-edit-icon" />
                </p>
              </OverlayTrigger>
            </div>
            <div className="detail-info-container">
              <div className="detail-info">
                <label>이름 </label>
                <input
                  type="text"
                  className="edit-form-control"
                  onChange={editName}
                  value={editData.name}
                />
              </div>
              <div className="detail-info">
                <label>이메일 </label>
                <input
                  type="text"
                  className="edit-form-control"
                  onChange={editEmail}
                  value={editData.email}
                />
              </div>
              <div className="detail-info">
                <label>비밀번호 </label>
                <input
                  type="password"
                  className="edit-form-control"
                  placeholder="수정 시에 보여집니다."
                  onChange={editPw}
                  //value={password}
                />
              </div>
              <div className="detail-info">
                <label>비밀번호 확인 </label>
                <input
                  type="password"
                  className="edit-form-control"
                  placeholder="수정 시에 보여집니다."
                  onBlur={confirmPwHandler}
                  onChange={editConfirmPw}
                  //value={confirmPw}
                />
              </div>
              <div className="detail-info">
                <label>사원번호</label>
                <input
                  type="text"
                  className="edit-form-control"
                  onChange={editEmployeeId}
                  value={editData.employeeId}
                />
              </div>
              <div className="detail-info">
                <label>전화번호</label>
                <input
                  type="text"
                  className="edit-form-control"
                  onChange={editTel}
                  value={editData.tel}
                />
              </div>
              <div className="detail-info">
                <label>부서</label>
                <input
                  type="text"
                  className="edit-form-control"
                  onChange={editDepartment}
                  value={editData.department}
                />
              </div>
              <div className="detail-info">
                <label>직급</label>
                <input
                  type="text"
                  className="edit-form-control"
                  onChange={editPosition}
                  value={editData.position}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="myPageBox-right">
        <div className="myPageBox-right-seat">
          <SeatReservationInfo user={props.user} />
        </div>
        <div className="myPageBox-right-room"></div>
      </div>
    </div>
  );
};
export default MyPageBox;
