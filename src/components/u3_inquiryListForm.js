import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import '../assets/styles/u3_inquiryListForm.css';
//문의 리스트 폼 /get할 때 권한 안써도 되는지?
const InquiryListForm = props => {
  const [question, setquestion] = useState([]);
  const [answer, setAnswer] = useState([]);

  const res = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/questions/search?userId=${props.user.id}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setquestion(json);
      });
  };

  const res2 = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/answers/search?userId=${props.user.id}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setAnswer(json);
      });
  };
  useEffect(() => {
    if (props.user.id !== 'undefined') {
      res();
      res2();
    }
  }, [props.user.id]);

  const getAnswerMessage = questionID => {
    for (let i = 0; i < answer.length; i++) {
      if (questionID === answer[i].question.id && answer[i].message) {
        return answer[i].message;
      }
    }
  };

  const getAnswerCreatedAt = questionID => {
    for (let i = 0; i < answer.length; i++) {
      if (questionID === answer[i].question.id && answer[i].message) {
        return answer[i].createdAt.slice(0, 10);
      }
    }
  };
  const isReplied = questionID => {
    for (let i = 0; i < answer.length; i++) {
      if (questionID === answer[i].question.id && answer[i].message) {
        return 1;
      }
    }
  };
  return (
    /*전체 문의 리스트 */

    <Accordion flush className="inquiryListTotal">
      <div>{question.length === 0 ? '질문내역이없습니다' : ''}</div>
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
