import React from 'react';
import * as MdIcon from 'react-icons/md';
import '../../assets/styles/IconStyle.css';

const SearchIcon = () => {
  return (
    <div className="icon-box">
      <MdIcon.MdSearch className="icon" size={27} />
    </div>
  );
};

export default SearchIcon;
