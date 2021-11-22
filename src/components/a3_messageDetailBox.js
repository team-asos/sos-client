import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import moment from 'moment';
import * as hi from 'react-icons/hi';
import { useCookies } from 'react-cookie';
import '../assets/styles/a3_answerWaitingList.css';

const MessageDetailBox = ({ messageInfo, show, isEmpty }) => {
  const [message, setMessage] = useState('');
  const [cookie] = useCookies('access_token');

  console.log(messageInfo);

  //내 계정 가져오기
  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setMyInfo(json);
        });
    };
    res();
  }, []);

  console.log(myInfo);

  const submitHandler = async () => {
    console.log(message, Number(myInfo.id), Number(messageInfo.id));
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/answers`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'POST',
        body: JSON.stringify({
          //answer에 필요한 변수 : message, userId, questionId
          message,
          userId: Number(myInfo.id),
          questionId: Number(messageInfo.id),
        }),
      },
    );
    if (result.status === 201) {
      alert('답변이 등록되었습니다.');
      window.location.href = './notification';
    }
  };

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
              답변하고 싶은 문의를 선택해주세요.
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
                {/* 데이터베이스에서 있는 userid -> 이름, 이메일 받기 */}
                <span style={{ fontWeight: '650' }}>발신자 이메일 : </span>
                {messageInfo.id}
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={{ fontWeight: '650' }}>수신 시간 : </span>
                {messageInfo.length !== 0
                  ? moment(messageInfo.createdAt).format(
                      'YYYY-MM-DD / hh:mm:ss',
                    )
                  : ''}
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
                  onChange={e => setMessage(e.target.value)}
                />
                <button className="sendBtn" onClick={submitHandler}>
                  보내기
                </button>
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
export default MessageDetailBox;
