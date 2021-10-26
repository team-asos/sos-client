import React from 'react';
import '../assets/styles/u3_inquiryForm.css';

class InquiryForm extends React.Component {
  render() {
    return (
      <div className="inquiryForm">
        <input
          className="inquiryFormTitleStyle"
          placeholder="제목을 입력해주세요."
        ></input>
        <br></br>
        <textarea
          className="inquiryFormContentStyle"
          placeholder="내용을 입력해주세요."
        ></textarea>
        <button className="inquiryFormButton">문의하기</button>
      </div>
    );
  }
}

export default InquiryForm;
