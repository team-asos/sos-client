import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import { useCookies } from 'react-cookie';

//isPc import 파일들
import NavBarUser from '../components/u_navBar';
import MyPageBox from './u4_myPageBox';

//isMobile import 파일들
import MobileNavBar from '../components/u_m_navBar';
import MyInfoLogin from '../components/u4_myInfoLogin'; //정보수정
import MyReservationList from '../components/u4_myReservationListForm'; //예약내역

import '../assets/styles/u4_myPage.css';

//유저 마이페이지
const UserMyPage = props => {
  //쿠키 생성
  const [cookie] = useCookies(['access_token']);

  //유저 정보 가져오기
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

  //isMobile Nav 창 열기
  const [open, setOpen] = useState(false);
  const navClick = () => {
    setOpen(!open);
  };

  //isMobile, isPc 미디어쿼리 사이즈 설정
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });

  //나의 예약내역, 나의 로그인 정보 탭 이동
  const tabBar = {
    0: <MyReservationList user={user} />,
    1: <MyInfoLogin user={user} />, //나중에 email 받아서 인증해야해서
  };
  const [state, setState] = useState(0);
  const clickHandler = id => {
    setState(id);
  };

  //페이지 불러오기
  const getPage = () => {
    if (state === 0) {
      return tabBar[0];
    } else if (state === 1) {
      return tabBar[1];
    }
  };

  return (
    //전체 페이지
    <div className="userMyPage">
      {/* PC - NavBar(왼쪽) */}
      <div>{isPc ? <NavBarUser /> : null}</div>
      {/* PC - Box(오른쪽) */}
      <div className={isPc ? 'u_myPageForm' : 'm_u_myPageForm'}>
        {/* 페이지(위쪽)  */}
        <div className="u_myPageHeader">
          {/* Mobile - NavBar(위쪽) */}
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
          {/* PC - Header Text(오른쪽 위 텍스트) */}
          <div
            className={
              isPc ? 'u_myPageHeaderTextStyle' : 'm_u_myPageHeaderTextStyle'
            }
          >
            마이페이지
          </div>

          {/* Mobile - Tab Text(오른쪽 위 탭 텍스트) */}
          <div
            onClick={() => clickHandler(0)}
            className={isPc ? 'myRLMenuTextStyle' : 'm_myPageMenuText'}
          >
            {isPc ? '' : '예약 내역'}
          </div>
          <div
            onClick={() => clickHandler(1)}
            className={isPc ? 'myInfoMenuTextStyle' : 'm_myPageMenuText'}
          >
            {isPc ? '' : '정보 수정'}
          </div>
        </div>
        {/* Mobile - Menu */}
        {open ? <MobileNavBar open={open} /> : ''}
        {/* Mobile - 컨텐츠 */}
        <div className="myPageContents">
          {isMobile ? getPage() : <MyPageBox user={user} />}
        </div>
      </div>
    </div>
  );
};

export default UserMyPage;
