import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import * as hi from 'react-icons/hi';
import moment from 'moment';
import { useCookies } from 'react-cookie';

import '../assets/styles/a3_answerWaitingList.css';

//답변 내용 컴포넌트만 분리해서 사용할까 고민중 ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
const MessageCompleteBox = ({ messageInfo, answerInfo, show, isEmpty }) => {
  const [answer, getAnswer] = useState('');
  const [cookie] = useCookies('access_token');

  show = 'true';

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

  const [userId, setUserId] = useState(0);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const findUserInfo = () => {
      if (messageInfo.user !== undefined) {
        setUserId(messageInfo.user.id);
      } else if (messageInfo.user === undefined) {
        setUserInfo({
          ...userInfo,
          email: '탈퇴한 회원입니다.',
        });
      }
    };
    findUserInfo();
  }, [messageInfo]);

  const res = async () => {
    if (userId !== 0) {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setUserInfo(json);
        });
    }
  };

  useEffect(() => {
    if (userId !== undefined) res();
  }, [userId]);

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
                {userInfo.email} / {userInfo.name}
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
