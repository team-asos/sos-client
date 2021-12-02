import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import MobileNavBar from '../components/u_m_navBar';
import NavBarUser from '../components/u_navBar';
import '../assets/styles/u3_inquirePage.css';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import * as AiIcon from 'react-icons/ai';

import InquiryListForm from '../components/u3_inquiryListForm';

//문의하기 페이지
const InquirePage = () => {
  const [open, setOpen] = useState(false);
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const navClick = () => {
    setOpen(!open);
  };
  //쿠키 생성
  const [cookie] = useCookies(['access_token']);

  //내 계정 가져오기
  const [user, setUser] = useState({});

  const [addInquiryClick, setAddInquiryClick] = useState(0);
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

  return (
    <div className="inquirePage">
      {/* 화면 왼쪽 부분 : 네비 바*/}
      <div>{isPc ? <NavBarUser /> : null}</div>

      <div className={isPc ? 'inquireForm_main' : 'm_inquireForm_main'}>
        {/* 문의하기, 문의내역 이동 탭 */}

        {open ? <MobileNavBar open={open} /> : null}

        {/* 내용이 담기는 content */}
        <div className="myPageContents">
          <InquiryListForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default InquirePage;
