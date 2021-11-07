import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import '../assets/styles/u3_inquiryListForm.css';
//문의 리스트 폼
const InquiryListForm = () => {
  const [question, setquestion] = useState([]);
  const [answer, setAnswer] = useState([]);
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
  const getAnswerMessage = questionID => {
    //console.log(question);
    //console.log(question.length);
    //question.length로 바꿔야 하는데 에러 뜬다
    for (let i = 0; i < answer.length; i++) {
      if (questionID == answer[i].id) {
        return answer[i].message;
      }
    }
  };
  const getAnswerCreatedAt = questionID => {
    //question.length로 바꿔야 함
    for (let i = 0; i < answer.length; i++) {
      if (questionID == answer[i].id) {
        return answer[i].createdAt.slice(0, 10);
      }
    }
  };
  const isReplied = questionID => {
    for (let i = 0; i < answer.length; i++) {
      if (questionID == answer[i].id && answer[i].message) return 1;
    }
  };
  console.log(answer);
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
      {question &&
        question
          .slice(0)
          .reverse()
          .map((item, idx) => (
            <Accordion.Item
              eventKey={item.id}
              className="inquiryTitleAndAnswer"
            >
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
                      style={
                        isReplied(item.id)
                          ? { color: '#62AB72' }
                          : { color: 'gray' }
                      }
                    >
                      {isReplied(item.id) ? '답변완료' : '답변대기'}
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
                  <p>{getAnswerMessage(item.id)}</p>
                  <p
                    style={{
                      marginLeft: '3vw',
                    }}
                  >
                    {getAnswerCreatedAt(item.id)}
                  </p>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
    </Accordion>
  );
};
export default InquiryListForm;
