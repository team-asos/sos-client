import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import moment from 'moment';
import '../assets/styles/a3_answerWaitingList.css';

//답변 내용 컴포넌트만 분리해서 사용할까 고민중 ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
const MessageCompleteBox = ({ messageInfo, answerInfo, show }) => {
  const [answer, setAnswer] = useState('');

  return (
    <div>
      {messageInfo.length === 0 ? (
        <p
          style={{
            fontSize: 'smaller',
            textAlign: 'center',
            fontStyle: 'italic',
            marginTop: '5%',
          }}
        >
          답변 완료 된 문의가 없습니다.
        </p>
      ) : (
        <div className="messageDetailBox" show={show}>
          <ListGroup variant="flush" className="detailList">
            <ListGroup.Item>
              <span style={{ fontWeight: '650' }}>제목 : </span>
              {messageInfo.title}
            </ListGroup.Item>
            <ListGroup.Item>
              <span style={{ fontWeight: '650' }}>발신자 이메일 : </span>
              {messageInfo.id}
            </ListGroup.Item>
            <ListGroup.Item>
              <span style={{ fontWeight: '650' }}>수신 시간 : </span>
              {moment(messageInfo.createdAt).format('YYYY-MM-DD / hh:mm:ss')}
            </ListGroup.Item>
            <ListGroup.Item>
              <span style={{ fontWeight: '650' }}>문의 내용 </span>
              <br />
              {messageInfo.message}
            </ListGroup.Item>
            <ListGroup.Item>
              <span style={{ fontWeight: '650' }}>답변 내용 </span>
              <br />
              {answerInfo.message}
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
    </div>
  );
};
export default MessageCompleteBox;
