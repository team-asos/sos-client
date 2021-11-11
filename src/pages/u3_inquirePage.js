import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBarUser from '../components/u_navBar';
import '../assets/styles/u3_inquirePage.css';
import { useCookies } from 'react-cookie';
import First from '../components/u3_inquiryListForm';
import Second from '../components/u3_inquiryForm';

//문의하기 페이지
const InquirePage = () => {
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
    0: <First user={user} />,
    1: <Second user={user} />,
  };
  const [state, setState] = useState(0);
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
    <div className="inquirePage">
      <div>
        <NavBarUser />
      </div>

      <div className="inquireForm_main">
        <div className="inquireHeader">
          <div className="inquire_titleTextStyle">
            <Link
              to="/inquire"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              문의하기
            </Link>
          </div>
          <div onClick={() => clickHandler(0)} className="myRLMenuTextStyle">
            나의 문의 내역
          </div>
          <div onClick={() => clickHandler(1)} className="myInfoMenuTextStyle">
            문의하기
          </div>
        </div>
        <div className="myPageContents">{getPage()}</div>
      </div>
    </div>
  );
};

export default InquirePage;
