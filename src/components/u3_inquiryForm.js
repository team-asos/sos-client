import React, { useState } from 'react';
import '../assets/styles/u3_inquiryForm.css';
//문의 작성 폼
const InquiryForm = props => {
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
          userId: Number(props.user.id),
        }),
      },
    );
    if (res.status === 201) {
      alert('문의가 등록되었습니다.');
      window.location.href = '/inquire'; //수정해야함
    }
  };
  return (
    <div className="inquiryForm">
      <input
        className="inquiryFormTitleStyle"
        placeholder="제목을 입력해주세요."
        onChange={titleHandler}
      ></input>
      <br></br>
      <textarea
        className="inquiryFormContentStyle"
        placeholder="내용을 입력해주세요."
        onChange={messageHandler}
      ></textarea>
      <button className="inquiryFormButton" onClick={submitHandler}>
        문의하기
      </button>
    </div>
  );
};

export default InquiryForm;
