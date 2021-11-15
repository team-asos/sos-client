import React, { useState, useEffect } from 'react';

import '../assets/styles/a3_answerWaitingList.css';
import MessageCompleteBox from './a3_messageCompleteBox';

const AnswerCompleteList = () => {
  //문의 받아오기
  const [question, setQestion] = useState([]);
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/questions`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IuyKpO2OgOyngOuwpSIsInJvbGUiOjAsImlhdCI6MTYzNjQzNDQzMSwiZXhwIjoxNjM2NTIwODMxfQ.IQU8OkiENv1gtf88GTngwk-Rya51_USgY-GWFL-zU2E',
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setQestion(json);
        });
    };
    res();
  }, []);
  //답변완료 목록 가져오기
  const isReplied = item => {
    if (item.status === 0) return 1;
  };

  //질문 받아오기
  const [answer, setAnswer] = useState([]);
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

  //선택된 질문, 답변 받아오는 변수 선언
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [selectAnswer, setSelectAnswer] = useState([]);

  const findAnswer = id => {
    answer.map((item, idx) => {
      if (item.id === id) {
        console.log(item.id, id, item.message, 'find it');
        return setSelectAnswer(item);
      }
    });
  };

  //Datail 창 띄우기
  const [showDetail, setShowDetail] = useState(false);
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShowDetail(handleShow);
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
                  findAnswer(item.id);
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
          <MessageCompleteBox
            show={show}
            messageInfo={selectQuestion}
            answerInfo={selectAnswer}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AnswerCompleteList;
