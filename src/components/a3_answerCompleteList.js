import React, { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import * as ai from 'react-icons/ai';
import * as cg from 'react-icons/cg';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import '../assets/styles/a3_answerWaitingList.css';
import MessageCompleteBox from './a3_messageCompleteBox';

const AnswerCompleteList = () => {
  //쿠키 받아오기
  const [cookie] = useCookies('access_token');

  //문의 받아오기
  const [question, setQestion] = useState([]);

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

  //답변 받아오기
  const [answer, setAnswer] = useState([]);
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

  //선택된 질문, 답변 받아오는 변수 선언
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [selectAnswer, setSelectAnswer] = useState([]);

  const findAnswer = async id => {
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/answers/search?questionId=${id}`,
      {
        headers: { Authorization: `Bearer ${cookie.access_token}` },
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setSelectAnswer(json);
      });
  };

  //Datail 창 띄우기
  const [showDetail, setShowDetail] = useState(false);
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShowDetail(handleShow);
  };

  //답변완료 불러오기
  const isReplied = item => {
    if (item.status === 1) return 1;
  };

  const isEmpty = question => {
    for (let i = 0; i < question.length; i++) {
      if (isReplied(question[i])) {
        return 1; //문의들이 있는 경우
      }
    }
  };

  //체크박스 설정
  const [checkedList, setCheckedList] = useState([]);

  //체크박스 전체 상태 설정하기
  const onCheckedAll = useCallback(
    checked => {
      if (checked) {
        const checkedListArray = [];
        question.forEach(item => checkedListArray.push(item.id));
        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [question],
  );

  //체크박스 개별 상태 설정하기
  const onCheckedElement = useCallback(
    (checked, id) => {
      if (checked) {
        setCheckedList([...checkedList, id]);
      } else {
        setCheckedList(checkedList.filter(el => el !== id));
      }
    },
    [checkedList],
  );

  //삭제 아이콘
  const deleteClickHandler = checkedList => {
    checkedList.map(async id => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/questions/${id}`,
        {
          headers: { Authorization: `Bearer ${cookie.access_token}` },
          method: 'DELETE',
        },
      );
      window.location.href = '/notification';
    });
  };

  //검색창
  const [q, setQ] = useState('');

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter(row =>
      columns.some(column =>
        row[column] === null
          ? ''
          : row[column].toString().toLowerCase().indexOf(q) > -1,
      ),
    );
  }
  return (
    <div className="answerWaitingList">
      <div className="answerWaitingListLeft">
        <div className="answerWaitingListLeftTop">
          <ul>
            <li
              style={{
                width: '100%',
                listStyleType: 'none',
              }}
            >
              {/* 전체 체크박스  */}
              <input
                type="checkbox"
                onChange={e => onCheckedAll(e.target.checked)}
                checked={
                  checkedList.length === 0
                    ? false
                    : checkedList.length === question.length
                    ? true
                    : false
                }
              />
              {/* 삭제 아이콘 tooltip*/}
              <span>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip
                      id="button-tooltip"
                      style={{
                        fontSize: 'x-small',
                        height: 'fit-content',
                        backgroundColor: 'transparent',
                        border: 'none',
                      }}
                    >
                      선택 삭제
                    </Tooltip>
                  }
                >
                  <span>
                    <ai.AiTwotoneDelete
                      className="deleteIcon"
                      size={20}
                      onClick={() => deleteClickHandler(checkedList)}
                    />
                  </span>
                </OverlayTrigger>

                {/* 검색창 */}
                <input
                  className="searchQuestionForm"
                  type="text"
                  placeholder="검색할 문의를 입력하세요."
                  value={q}
                  onChange={e => setQ(e.target.value)}
                />
                <ai.AiOutlineSearch className="deleteIcon" size={20} />
              </span>
            </li>
          </ul>
        </div>

        {/* 문의 리스트 부분 */}
        <div className="answerWaitingListLeftBottom">
          {isEmpty(question) ? (
            <div>
              {search(question).map((item, idx) =>
                isReplied(item) ? (
                  <ul key={item.id} style={{ marginTop: '1%' }}>
                    <li
                      className={
                        selectQuestion === item ? 'clickedLi' : 'normalLi'
                      }
                      key={idx}
                      onClick={e => {
                        setSelectQuestion(item);
                        toggleTrueFalse();
                        findAnswer(item.id);
                      }}
                    >
                      <div className="waitinglistStyle">
                        <div style={{ width: '3%' }}>
                          <input
                            type="checkbox"
                            onChange={e =>
                              onCheckedElement(e.target.checked, item.id)
                            }
                            checked={
                              checkedList.includes(item.id) ? true : false
                            }
                          />
                        </div>
                        <div style={{ width: '5%', paddingLeft: '2%' }}></div>
                        <div style={{ width: '70%' }}>{item.title}</div>
                        <div style={{ width: '17%' }}>
                          {item.createdAt.slice(0, 10)}
                        </div>
                      </div>
                    </li>
                  </ul>
                ) : (
                  ''
                ),
              )}
            </div>
          ) : (
            <div className="noMessageBox">
              <cg.CgCloseO
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
                답변이 완료된 문의가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="answerWaitingListRight">
        {show ? (
          <MessageCompleteBox
            show={show}
            messageInfo={selectQuestion}
            answerInfo={selectAnswer}
            isEmpty={isEmpty(question) ? 1 : 0}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AnswerCompleteList;
