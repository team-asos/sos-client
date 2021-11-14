import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import * as FcIcon from 'react-icons/fc';
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
  const deleteClick = questionId => {
    const response = async () => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/questions/${questionId}`,
        {
          method: 'DELETE',
        },
      );
    };
    response();
  };
  const getAnswerMessage = questionID => {
    console.log(question);
    console.log(answer?.id);
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
      <div>
        {question.length === 0 ? (
          <>
            <FcIcon.FcQuestions size={200} className="alertStyle" />
            <p className="alertTextStyle">문의 내역이 없습니다.</p>
          </>
        ) : (
          ''
        )}
      </div>
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
                <div className="inquiryMsg">{item.message}</div>
                <p
                  className="deleteInquiry"
                  onClick={() => deleteClick(item.id)}
                >
                  삭제
                </p>
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
