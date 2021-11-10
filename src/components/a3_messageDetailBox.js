import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import moment from 'moment';
import '../assets/styles/a3_answerWaitingList.css';

const MessageDetailBox = ({ messageInfo, show }) => {
  const [message, setMessage] = useState('');

  const inputMessage = e => {
    setMessage(e.target.value);
  };

  const submitHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/answers`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          //answer에 필요한 변수 : message, userId, questionId
          message,
          userId: Number(1),
          questionId: Number(messageInfo.id),
        }),
      },
    );

    if (result.status === 201) {
      alert('답변을 보냈습니다.');
      console.log('Submit the answer');
    }
  };

  console.log(messageInfo);
  console.log('2: ', messageInfo.status);

  return (
    <div className="messageDetailBox" show={show}>
      <ListGroup variant="flush" className="detailList">
        <ListGroup.Item>
          <span style={{ fontWeight: '650' }}>제목 : </span>
          {messageInfo.title}
        </ListGroup.Item>
        <ListGroup.Item>
          {/* 데이터베이스에서 있는 userid -> 이름, 이메일 받기 */}
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
          <textarea
            className="answerInput"
            placeholder="답변 
            내용을 입력해주세요."
            onChange={inputMessage}
          />
          <button className="sendBtn" onClick={submitHandler}>
            보내기
          </button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};
export default MessageDetailBox;
