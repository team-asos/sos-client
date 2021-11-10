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
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/answers/search`, {
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
    answer.map((item, idx) => {
      //console.log(item.question.id);
      if (questionID === item.question.id) {
        console.log(item.message);
        return item.message;
      }
    });
  };
  const getAnswerCreatedAt = questionID => {
    answer.map((item, idx) => {
      if (questionID === item.question.id) {
        return item.createdAt.slice(0, 10);
      }
    });
  };
  const isReplied = questionID => {
    answer.map((item, idx) => {
      if (questionID == item.question.id && item.message) return 1;
    });
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
                      {item.id}
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
