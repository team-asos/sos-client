import React from 'react';

import NavBarUser from '../components/u_navBar';
import { Search } from '../components/Search';

const SearchPage = () => {
  return (
    <div className="userSeatPage">
      <div>
        <NavBarUser />
      </div>
      <div style={{ flex: 1 }}>
        <Search />
      </div>
    </div>
  );
};

export default SearchPage;
