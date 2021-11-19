import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import NavBarUser from '../components/u_navBar';
import '../assets/styles/u3_inquirePage.css';

import First from '../components/u3_inquiryListForm';
import Second from '../components/u3_inquiryForm';

//문의하기 페이지
const InquirePage = () => {
  //쿠키 생성
  const [cookie] = useCookies(['access_token']);

  //내 계정 가져오기
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

  //문의내역, 문의하기 탭
  const tabBar = {
    //First : 문의 내역 조회 -> u3_inquiryListForm
    0: <First user={user} />,

    //Second : 문의하기 > u3_inquiryForm
    1: <Second user={user} />,
  };

  //탭 이동
  const [state, setState] = useState(0);
  const clickHandler = id => {
    setState(id);
  };

  //탭 페이지 불러오기
  const getPage = () => {
    if (state === 0) {
      //문의내역
      return tabBar[0];
    } else if (state === 1) {
      //문의하기
      return tabBar[1];
    }
  };

  return (
    <div className="inquirePage">
      {/* 화면 왼쪽 부분 : 네비 바*/}
      <div>
        <NavBarUser />
      </div>

      <div className="inquireForm_main">
        {/* 문의하기, 문의내역 이동 탭 */}
        <div className="inquireHeader">
          <div className="inquire_titleTextStyle">
            <Link
              to="/inquire"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              문의
            </Link>
          </div>
        </div>
        {/* 내용이 담기는 content */}
        <div className="myPageContents">{getPage()}</div>
      </div>
    </div>
  );
};

export default InquirePage;
