import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';

import NavBarUser from '../components/u_navBar';
import MobileNavBar from '../components/u_m_navBar';
import { Search } from '../components/Search';

import '../assets/styles/u6_searchPage.css';

const SearchPage = () => {
  const [open, setOpen] = useState(false);

  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  const navClick = () => {
    setOpen(!open);
  };

  return (
    <div className="userSearchPage">
      <div>{isPc ? <NavBarUser /> : null}</div>

      <div className={isPc ? 'u6-search-main' : 'm-u6-search-main'}>
        {isPc ? null : (
          <div className="m-search-header">
            <div>
              <FiMenu
                size={30}
                onClick={navClick}
                style={{
                  color: 'firebrick',
                  marginLeft: '10px',
                  marginTop: '-4px',
                }}
              />
            </div>
            <div className="m_roomCheck_titleTextStyle">직원 검색</div>
          </div>
        )}
        {open ? <MobileNavBar open={open} /> : null}
        <div className="u6-search-contents">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
