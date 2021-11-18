import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import MessageDetailBox from './a3_messageDetailBox';
import '../assets/styles/a3_answerWaitingList.css';

const AnswerWaitingList = () => {
  const [question, setQestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);

  const [cookie] = useCookies('access_token');

  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/questions`, {
        headers: { Authorization: `Bearer ${cookie.access_token}` },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setQestion(json);
        });
    };
    res();
  }, []);

  useEffect(() => {
    const res2 = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/answers`, {
        headers: { Authorization: `Bearer ${cookie.access_token}` },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setAnswer(json);
        });
    };
    res2();
  }, []);

  const toggleTrueFalse = () => {
    setShowDetail(handleShow);
  };

  //답변대기 불러오기
  const isReplied = item => {
    if (item.status === 0) {
      return 1;
    }
  };

  return (
    <div className="answerWaitingList">
      <div className="answerWaitingListLeft">
        {question.map((item, idx) => (
          <ul>
            {isReplied(item) ? (
              <li
                key={idx}
                onClick={e => {
                  setSelectQuestion(item);
                  toggleTrueFalse();
                }}
              >
                <div className="waitinglistStyle">
                  <div style={{ width: '5%' }}>-</div>
                  <div style={{ width: '10%' }}>{item.id}</div>
                  <div style={{ width: '70%' }}>{item.title}</div>
                  <div style={{ width: '17%' }}>
                    {item.createdAt.slice(0, 10)}
                  </div>
                </div>
              </li>
            ) : (
              ''
            )}
          </ul>
        ))}
      </div>
      <div className="answerWaitingListRight">
        {show ? (
          <MessageDetailBox show={show} messageInfo={selectQuestion} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AnswerWaitingList;
