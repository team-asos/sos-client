import React, { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import * as ai from 'react-icons/ai';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import MessageDetailBox from './a3_messageDetailBox';
import '../assets/styles/a3_answerWaitingList.css';

const AnswerWaitingList = props => {
  //쿠키 받아오기
  const [cookie] = useCookies('access_token');

  //문의 받아오기
  const [question, setQestion] = useState([]); //전체 문의
  const [selectQuestion, setSelectQuestion] = useState([]); //선택된 문의

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

  //MessageDetailBox 컴포넌트 불러오는 함수
  const [showDetail, setShowDetail] = useState(false);
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShowDetail(handleShow);
  };

  //답변대기 불러오기
  const isReplied = item => {
    if (item.status === 0) {
      return 1;
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
      if (result.status === 200) {
        alert('문의를 삭제하였습니다.');
      }
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
          <li>
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
        </div>
        <div className="answerWaitingListLeftBottom">
          {search(question).map((item, idx) => (
            <ul style={{ marginTop: '1%' }}>
              {isReplied(item) ? (
                <li
                  className={selectQuestion === item ? 'clickedLi' : 'normalLi'}
                  key={idx}
                  onClick={e => {
                    setSelectQuestion(item);
                    toggleTrueFalse();
                  }}
                >
                  <div className="waitinglistStyle">
                    <div style={{ width: '3%' }}>
                      <input
                        type="checkbox"
                        onChange={e =>
                          onCheckedElement(e.target.checked, item.id)
                        }
                        checked={checkedList.includes(item.id) ? true : false}
                      />
                    </div>
                    <div style={{ width: '10%', paddingLeft: '4%' }}>
                      {idx + 1}
                    </div>
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
