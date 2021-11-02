import React from 'react';

import AnswerTabMenu from './a3_answerTabMenu';
import Tab from './a3_tab';
import AnswerWaitingList from './a3_answerWaitingList';

import '../assets/styles/a3_messageBox.css';

class MessageBox extends React.Component {
  /*탭 설정*/
  constructor(props) {
    super(props);
    this.state = {
      selected: '답변대기',
      /*임의 설정 - 서버에서 받아올 값 */
      count: 4,
    };
  }
  setSelected = tab => {
    this.setState({ selected: tab });
  };

  render() {
    return (
      <div className="messageBox">
        {/* 위, 텍스트 부분 */}
        <div className="messageUpperBox">
          <div className="messageUpperBoxChild">
            <p>
              알림
              <span className="count total"> {this.state.count} </span>
            </p>
          </div>
        </div>

        {/* 아래, 메세지 부분 */}
        <div className="messageBottomBox mt-2">
          <div>
            {/* 탭 메뉴와 컨텐츠 */}
            <AnswerTabMenu
              tabs={['답변대기', '답변완료']}
              selected={this.state.selected}
              setSelected={this.setSelected}
            >
              <Tab isSelected={this.state.selected === '답변대기'}>
                {/* 답변 대기 목록 */}
                <AnswerWaitingList />
              </Tab>
              <Tab isSelected={this.state.selected === '답변완료'}>
                {/* 답변 대기 목록 */}
                <h1>More Text Test</h1>
              </Tab>
            </AnswerTabMenu>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBox;
