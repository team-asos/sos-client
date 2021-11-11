import React, { useState, useEffect } from 'react';
import NavBarUser from '../components/u_navBar';
import { Link } from 'react-router-dom';
import MyInfoLogin from '../components/u4_myInfoLogin';
import { useCookies } from 'react-cookie';
import MyReservationList from '../components/u4_myReservationListForm';
import '../assets/styles/u4_myPage.css';

//유저 마이페이지
const UserMyPage = props => {
  const [cookie] = useCookies(['access_token']);
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

  const tabBar = {
    0: <MyReservationList user={user} />,
    1: <MyInfoLogin user={user} />, //나중에 email 받아서 인증해야해서
  };
  const [state, setState] = useState(0);
  // const [loginShow, setLoginShow]=useState(1);
  // const [editShow, setEditShow]=useState(0);
  const clickHandler = id => {
    setState(id);
  };
  const getPage = () => {
    if (state === 0) {
      return tabBar[0];
    } else if (state === 1) {
      return tabBar[1];
    }
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

          <div onClick={() => clickHandler(0)} className="myRLMenuTextStyle">
            나의 예약 내역
          </div>
          <div onClick={() => clickHandler(1)} className="myInfoMenuTextStyle">
            나의 정보 수정
          </div>
        </div>

        <div className="myPageContents">{getPage()}</div>
      </div>
    </div>
  );
};

export default UserMyPage;
