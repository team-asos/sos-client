import React from 'react';
import '../assets/styles/u3_tabMenu.css';
import First from './u3_inquiryListForm';
import Second from './u3_inquiryForm';
//문의하기 페이지에서 탭 메뉴
const tabBar = {
  0: <First />,
  1: <Second />,
};

class TabMenu extends React.Component {
  state = {
    activeId: 0,
  };

  clickHandler = id => {
    this.setState({ activeId: id });
  };

  render() {
    return (
      <div className="tabMenuForm">
        <div className="tabs">
          <button onClick={() => this.clickHandler(0)} className="firstTab">
            문의내역
          </button>
          <button onClick={() => this.clickHandler(1)} className="secondTab">
            문의하기
          </button>
        </div>
        <div className="contents">{tabBar[this.state.activeId]}</div>
      </div>
    );
  }
}
export default TabMenu;
