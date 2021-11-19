import React, { useState, useEffect } from 'react';
import { Accordion, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as AiIcon from 'react-icons/ai';

import InquiryForm from './u3_inquiryForm';
import '../assets/styles/u3_inquiryListForm.css';

//문의 리스트 폼 /get할 때 권한 안써도 되는지?
const InquiryListForm = props => {
  //문의 가져오기
  const [question, setquestion] = useState([]);

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

  //답변 가져오기
  const [answer, setAnswer] = useState([]);

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

  //문의 답변 삭제 버튼
  const deleteClick = questionId => {
    const deleteHandler = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/questions/${questionId}`,
        {
          method: 'DELETE',
        },
      );
      window.location.href = '/inquire'; //성공이면 바꾸기
      if (response.status === 200) {
        alert('문의가 삭제되었습니다.');
      } else {
        const json = await response.json();
        alert(json.message);
      }
    };
    deleteHandler();
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

  //모달 관련 합수
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };
  return (
    /*전체 문의 리스트 */
    <div>
      <div className="inquiryListTotal">
        <div className="inquiryListUpper">
          <p className="myListText">나의 문의 내역</p>
          <span>
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip
                  id={`tooltip-bottom`}
                  style={{
                    fontSize: 'small',
                    height: 'fit-content',
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                >
                  <strong style={{ color: '#c00000' }}>새로운 문의</strong>{' '}
                  작성하기
                </Tooltip>
              }
            >
              <span>
                <AiIcon.AiOutlinePlusSquare
                  className="newInquiryIcon"
                  size={30}
                  onClick={e => toggleTrueFalse()}
                />
              </span>
            </OverlayTrigger>
          </span>
        </div>
        {question.length === 0 ? (
          <div className="noInquiryList">
            <div>
              <AiIcon.AiOutlineQuestionCircle
                size={50}
                className="alertStyle"
              />
            </div>
            <div>
              <p className="alertTextStyle">
                문의 내역이 존재하지 않습니다.
                <br />
                상단의 <AiIcon.AiOutlinePlusSquare size={20} />
                버튼을 눌러 새로운 문의를 하세요.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Accordion className="accordion" defaultActiveKey="0" flush>
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
                      {/* 문의 헤더 */}
                      <Accordion.Header className="inquiryTitle">
                        <div className="inquiryTitleMain">
                          <div className="inquiryTitleUpper">
                            <p className="index">{idx + 1}</p>
                            {/* 문의 상태 */}
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
                            {/* 문의 제목 */}
                            <p key={idx} className="inquiryTitleStyle">
                              {item.title}
                            </p>
                            {/* 문의 날짜 */}
                            <p className="inquiryDateStyle">
                              {item.createdAt.slice(0, 10)}
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
                      {/* 답변 */}
                      <Accordion.Body className="inquiryAnswer">
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
          </div>
        )}
      </div>
      {show ? <InquiryForm show={show} handleClose={handleClose} /> : ''}
    </div>
  );
};
export default InquiryListForm;
