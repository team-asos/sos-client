import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import * as hi from 'react-icons/hi';
import moment from 'moment';
import '../assets/styles/a3_answerWaitingList.css';

//답변 내용 컴포넌트만 분리해서 사용할까 고민중 ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
const MessageCompleteBox = ({ messageInfo, answerInfo, show, isEmpty }) => {
  console.log(answerInfo);
  console.log(messageInfo);

  const [answer, getAnswer] = useState('');

  useEffect(() => {
    const findAnswerMessage = (answerInfo, id) => {
      answerInfo.map(item => {
        if (item.question.id === id) {
          getAnswer(item.message);
        }
      });
    };
    findAnswerMessage(answerInfo, messageInfo.id);
  }, [messageInfo, answerInfo]);

  return (
    <div>
      {isEmpty === 1 ? (
        messageInfo.length === 0 ? (
          <div className="noMessageBox">
            <hi.HiCursorClick
              size={20}
              style={{ color: '#820101', marginTop: '5%' }}
            />
            <p
              style={{
                fontSize: 'smaller',
                fontStyle: 'italic',
                marginTop: '1.5%',
              }}
            >
              조회하고 싶은 문의를 선택해주세요.
            </p>
          </div>
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
                {answer}
              </ListGroup.Item>
            </ListGroup>
          </div>
        )
      ) : (
        ''
      )}
    </div>
  );
};
export default MessageCompleteBox;
