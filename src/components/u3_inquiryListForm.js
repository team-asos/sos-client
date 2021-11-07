import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import '../assets/styles/u3_inquiryListForm.css';
//문의 리스트 폼
const InquiryListForm = () => {
  const [question, setquestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [answerMessage, setAnswerMessage] = useState([]);
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/questions`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setquestion(json);
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
  console.log(answer); //뜸
  //console.log(answer[0]);
  const getAnswerMessage = id => {
    for (let i = 0; i < answer.length; i++) {
      if (i == id) {
        return answer[i].message;
      }
    }
  };
  const getAnswerCreatedAt = id => {
    for (let i = 0; i < answer.length; i++) {
      if (i == id) {
        return answer[i].createdAt.slice(0, 10);
      }
    }
  };
  return (
    /*전체 문의 리스트 */
    <Accordion
      flush
      className="inquiryListTotal"
      style={{
        overflow: 'auto',
      }}
    >
      {/*하나의 문의 제목, 내용/답변*/}
      {question.map((item, idx) => (
        <Accordion.Item eventKey={item.id} className="inquiryTitleAndAnswer">
          <Accordion.Header className="inquiryTitle">
            <div className="inquiryTitleMain">
              <div className="inquiryTitleUpper">
                <p key={idx} className="inquiryTitleStyle">
                  {item.title}
                </p>
                <p className="inquiryDateStyle">
                  {item.createdAt.slice(0, 10)}
                </p>
              </div>
              <div className="inquiryTitleBottom">
                <p
                  className="isReply"
                  style={{
                    color: item.status ? 'green' : 'gray',
                  }}
                >
                  {item.status ? '답변완료' : '답변대기'}
                </p>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="inquiryContent">
            {item.message}
          </Accordion.Body>
          {/*답변*/}
          <Accordion.Body className="inquiryAnswer">
            <hr></hr>
            <div className="inquiryTitleUpper">
              <p>{getAnswerMessage(idx)}</p>
              <p
                style={{
                  marginLeft: '3vw',
                }}
              >
                {getAnswerCreatedAt(idx)}
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
export default InquiryListForm;
