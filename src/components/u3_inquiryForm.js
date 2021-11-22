import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import '../assets/styles/u3_inquiryForm.css';
import Modal from 'react-bootstrap/Modal';

//문의 작성 폼
const InquiryForm = props => {
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

  const titleHandler = e => {
    setTitle(e.target.value);
  };
  const messageHandler = e => {
    setMessage(e.target.value);
  };

  const submitHandler = async () => {
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
      window.location.href = '/inquire'; //수정해야함
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} size="ml">
      <Modal.Header closeButton>
        <Modal.Title>새로운 문의 작성하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="inquiryForm">
          <input
            className="inquiryFormTitleStyle"
            placeholder="  문의 제목을 입력해주세요."
            onChange={titleHandler}
          ></input>
          <br></br>
          <textarea
            className="inquiryFormContentStyle"
            placeholder="  문의 내용을 입력해주세요."
            onChange={messageHandler}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="inquiryFormButton" onClick={submitHandler}>
          문의하기
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default InquiryForm;
