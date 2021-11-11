import React from 'react';

import AnswerTabMenu from './a3_answerTabMenu';
import Tab from './a3_tab';
import AnswerWaitingList from './a3_answerWaitingList';
import AnswerCompleteList from './a3_answerCompleteList';

import '../assets/styles/a3_messageBox.css';

class MessageBox extends React.Component {
  /*탭 설정*/
  constructor(props) {
    super(props);
    this.state = {
      selected: '답변대기',
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
            <p>문의 답변</p>
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
              {/* 답변 대기 목록 */}
              <Tab isSelected={this.state.selected === '답변대기'}>
                <AnswerWaitingList />
              </Tab>

              {/* 답변 대기 목록 */}
              <Tab isSelected={this.state.selected === '답변완료'}>
                <AnswerCompleteList />
              </Tab>
            </AnswerTabMenu>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBox;
