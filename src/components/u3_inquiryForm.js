import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import '../assets/styles/u3_inquiryForm.css';
import Modal from 'react-bootstrap/Modal';

//문의 작성 폼
const InquiryForm = props => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  //쿠키 생성
  const [cookie] = useCookies(['access_token']);

  //내 계정 가져오기
  const [user, setUser] = useState({});

  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setUser(json);
        });
    };
    res();
  }, []);

  //문의 생성 관련 함수와 변수
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [messageLength, setMessageLength] = useState(0);
  const [allMessageLength, setAllMessageLength] = useState(0);
  const titleHandler = e => {
    setTitle(e.target.value);
  };
  const messageHandler = e => {
    setAllMessageLength(e.target.value.length);
    if (e.target.value.length > 500) {
      e.preventDefault();
      alert('글자 수를 초과했습니다.');
      return;
    } else if (e.target.value.length <= 500) {
      setMessage(e.target.value);
      setMessageLength(e.target.value.length);
    }
  };
  const submitHandler = async () => {
    if (title.length === 0) {
      alert('제목을 입력해주세요');
      return;
    }
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/questions`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          message,
          userId: Number(user.id),
        }),
      },
    );
    if (res.status === 201) {
      alert('문의가 등록되었습니다.');
      window.location.href = '/inquire';
    }
  };
  console.log(title.length);
  return (
    <Modal show={props.show} onHide={props.handleClose} size="ml">
      <Modal.Header closeButton>
        <Modal.Title>새로운 문의 작성하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="inquiryForm">
          <input
            className={
              isPc ? 'inquiryFormTitleStyle' : 'm_inquiryFormTitleStyle'
            }
            placeholder="  문의 제목을 입력해주세요."
            onChange={titleHandler}
          ></input>
          <br></br>
          <textarea
            className={
              isPc ? 'inquiryFormContentStyle' : 'm_inquiryFormContentStyle'
            }
            placeholder="  문의 내용을 입력해주세요.(500자 이내)"
            onChange={
              allMessageLength <= 500
                ? messageHandler
                : alert('글자 수를 초과했습니다.')
            }
          ></textarea>
          <div>{messageLength}/500</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="inquiryFormButton"
          onClick={
            allMessageLength <= 500
              ? submitHandler
              : alert('글자 수를 초과했습니다.')
          }
        >
          문의하기
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default InquiryForm;
