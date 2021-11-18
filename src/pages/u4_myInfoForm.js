import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import DeleteAccount from '../components/u4_deleteAccount';
import MyReservationList from '../components/u4_myReservationListForm';
import NavBarUser from '../components/u_navBar';
import { Link } from 'react-router-dom';
import '../assets/styles/u4_myInfoForm.css';
//마이페이지->나의 정보
const MyInfoForm = props => {
  const [cookie] = useCookies(['access_token']);
  const [myData, setMyData] = useState([]);
  const [state, setState] = useState(0);
  const [disable, setDisable] = useState(1);
  const [user, setUser] = useState({});
  console.log(props.match.params.idx);
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
          console.log(json.email);
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

  const editHandler = () => {
    setDisable(!disable);
  };

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
    console.log(editData);
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
      setDisable(1); //다름
      alert('비밀번호가 다릅니다.');
    } else {
      setDisable(0);
    }
  };
  const clickHandler = id => {
    setState(id);
  };
  return (
    <div className="userMyPage">
      <div>
        <NavBarUser />
      </div>
      <div className="u_myPageForm">
        <div className="u_myPageHeader">
          <div className="u_myPageHeaderTextStyle">
            <Link
              to="/user-mypage"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              마이페이지
            </Link>
          </div>

          <div onClick={() => clickHandler(2)} className="myRLMenuTextStyle">
            나의 예약 내역
          </div>
          <div onClick={() => clickHandler(0)} className="myInfoMenuTextStyle">
            나의 정보 수정
          </div>
          <div onClick={() => clickHandler(1)} className="myInfoMenuTextStyle">
            회원 탈퇴
          </div>
        </div>
        <div className="myInfoForm">
          {state === 2 ? (
            <MyReservationList user={user} />
          ) : state === 1 ? (
            <DeleteAccount user={user} />
          ) : (
            <>
              <p className="myInfoFormTitleTextStyle">나의 정보 수정</p>

              <div className="myInfoDetailForm">
                <div className="column">
                  <div>
                    <label>이름</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={myData.name}
                      disabled={disable}
                      onChange={editName}
                      value={myData.name}
                    />
                  </div>
                  <div className="setPadding">
                    <label>이메일</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={myData.email}
                      disabled={disable}
                      onChange={editEmail}
                      value={myData.email}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      placeholder={myData.employeeId}
                      disabled={disable}
                      onChange={editEmployeeId}
                      value={myData.employeeId}
                    />
                  </div>
                  <div className="setPadding">
                    <label>전화번호</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={myData.tel}
                      disabled={disable}
                      onChange={editTel}
                      value={myData.tel}
                    />
                  </div>
                </div>

                <div className="column">
                  <div>
                    <label>부서</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={myData.department}
                      disabled={disable}
                      onChange={editDepartment}
                      value={myData.department}
                    />
                  </div>
                  <div className="setPadding">
                    <label>직급</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={myData.position}
                      disabled={disable}
                      onChange={editPosition}
                      value={myData.position}
                    />
                  </div>
                </div>
                <div className="infoBottom">
                  <button
                    className="infoEditButton"
                    onClick={editHandler}
                    disabled={!disable}
                  >
                    수정
                  </button>
                  <button
                    className="editFinishButton"
                    disabled={disable}
                    onClick={confirmHandler}
                  >
                    완료
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyInfoForm;
