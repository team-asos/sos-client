import React, { useState, useEffect } from 'react';

import MessageDetailBox from './a3_messageDetailBox';
import '../assets/styles/a3_answerWaitingList.css';

const AnswerWaitingList = () => {
  const [question, setQestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/questions`, {
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

  const isReplied = questionID => {
    for (let i = 0; i < answer.length; i++) {
      if (questionID === answer[i].id && answer[i].message) return 1;
    }
  };

  //가장 위에 있는 값으로 초기설정하고 싶다..
  //setSelectQuestion(question[0]);

  return (
    <div className="answerWaitingList">
      <div className="answerWaitingListLeft">
        {question.map((item, idx) => (
          <ul>
            {isReplied(item.id) ? (
              ''
            ) : (
              <li
                key={idx}
                onClick={e => {
                  setSelectQuestion(item);
                  toggleTrueFalse();
                }}
              >
                <div className="waitinglistStyle">
                  <div style={{ width: '5%' }}>{idx}</div>
                  <div style={{ width: '10%' }}>{item.id}</div>
                  <div style={{ width: '70%' }}>{item.title}</div>
                  <div style={{ width: '17%' }}>
                    {item.createdAt.slice(0, 10)}
                  </div>
                </div>
              </li>
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
