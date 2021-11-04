import React from 'react';
import { Form } from 'react-bootstrap';
import '../assets/styles/u4_myInfoForm.css';
//마이페이지->나의 정보
class MyInfoForm extends React.Component {
  render() {
    return (
      <div className="myInfoForm">
        <p className="myInfoFormTitleTextStyle">나의 정보 수정</p>

        <div className="myInfoDetailForm">
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>이름</Form.Label>
              <Form.Control type="name" placeholder="홍길동" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder="asdf@asg.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="name" placeholder="010-1223-4456" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>부서</Form.Label>
              <Form.Control type="name" placeholder="개발팀" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>직급</Form.Label>
              <Form.Control type="name" placeholder="팀장" />
            </Form.Group>
          </Form>
        </div>
        <div>
          <button>수정</button>
          <button>회원 탈퇴</button>
        </div>
      </div>
    );
  }
}
export default MyInfoForm;
