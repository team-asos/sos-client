import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { InputGroup, FormControl, Form } from 'react-bootstrap';

import * as MdIcon from 'react-icons/md';
import * as ai from 'react-icons/ai';
import * as hi from 'react-icons/hi';

import '../assets/styles/1_signupPage.css';
import '../assets/styles/1_containerStyle.css';
import '../assets/fonts/font.css';

const SignUp = () => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [disable, setDisable] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [name, setName] = useState('');
  const [employeeId, setIdNo] = useState('');
  const [tel, setPhone] = useState('');
  const [department, setDep] = useState('');
  const [position, setPosition] = useState('');

  const registerClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
      {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          name,
          password,
          tel,
          employeeId,
          department,
          position,
        }),
      },
    );
    if (result.status === 201) {
      alert('회원가입이 완료되었습니다.');
      window.location.href = '/';
    } else {
      alert(result.message);
    }
  };
  const confirmHandler = () => {
    if (password !== confirmPw) {
      setDisable(1); //다름
      alert('비밀번호가 다릅니다.');
    } else {
      setDisable(0);
    }
  };
  const inputEmail = e => {
    setEmail(e.target.value);
  };
  const inputPw = e => {
    setPassword(e.target.value);
  };
  const inputConfirmPw = e => {
    setConfirmPw(e.target.value);
  };
  const inputName = e => {
    setName(e.target.value);
  };
  const inputIdNo = e => {
    setIdNo(e.target.value);
  };
  const inputPhone = e => {
    setPhone(e.target.value);
  };
  const inputDep = e => {
    setDep(e.target.value);
  };
  const inputPosition = e => {
    setPosition(e.target.value);
  };
  return (
    <>
      {isPc && (
        <div className="container register">
          <div className="upper">
            <Link to="/">
              <MdIcon.MdArrowBackIos className="goBackIcon" size={20} />
            </Link>
            <p>회원 가입</p>
          </div>

          <div className="bottom">
            <div className="column">
              <div>
                <label>이메일</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="회사 이메일을 입력해주세요"
                  onChange={inputEmail}
                  value={email}
                />
              </div>
              <div>
                <label>이름</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="이름"
                  onChange={inputName}
                  value={name}
                />
              </div>
            </div>

            <div className="column">
              <div>
                <label>비밀번호</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="대소문자와 숫자를 포함한 8~12자리"
                  onChange={inputPw}
                  value={password}
                />
              </div>
              <div>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="비밀번호 확인"
                  onBlur={confirmHandler}
                  onChange={inputConfirmPw}
                  value={confirmPw}
                />
              </div>
            </div>

            <div className="column">
              <div>
                <label>사원번호</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="사원번호"
                  onChange={inputIdNo}
                  value={employeeId}
                />
              </div>
              <div>
                <label>전화번호</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="- 를 제외하고 입력하세요"
                  onChange={inputPhone}
                  value={tel}
                />
              </div>
            </div>

            <div className="column">
              <div>
                <label>부서</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="부서"
                  onChange={inputDep}
                  value={department}
                />
              </div>
              <div>
                <label>직급</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="직급"
                  onChange={inputPosition}
                  value={position}
                />
                {/* <Select className="position" options={positionList}/> */}
              </div>
            </div>
            <div>
              <button
                className="registerButton"
                onClick={registerClickHandler}
                disabled={disable}
                style={
                  disable === 1
                    ? { backgroundColor: '#380202' }
                    : { backgroundColor: '#c00000' }
                }
              >
                가입
              </button>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="m_register">
          <div className="m_upper">
            <Link to="/">
              <MdIcon.MdArrowBackIos className="goBackIcon" size={20} />
            </Link>
            <p style={{ color: '#c00000', fontSize: '1.2em' }}>회원 가입</p>
          </div>
          <p
            style={{
              fontSize: '0.9em',
              marginLeft: '15%',
              marginTop: '-3%',
              fontStyle: 'italic',
            }}
          >
            회원 가입을 위해 아래의 정보를 입력해주세요.
          </p>
          <div className="m_bottom">
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiTwotoneMail style={{ color: 'black' }} />
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="회사 이메일"
                  onChange={inputEmail}
                  value={email}
                  style={{ width: '55vw' }}
                />
              </InputGroup>

              {/* <input
                type="text"
                className="m_form-control"
                placeholder="회사 이메일을 입력해주세요"
                onChange={inputEmail}
                value={email}
              /> */}
            </div>
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiOutlineUser style={{ color: 'gray' }} />
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="이름"
                  onChange={inputName}
                  value={name}
                  style={{ width: '55vw' }}
                />
              </InputGroup>

              {/* <label>이름</label>
              <input
                type="text"
                className="m_form-control"
                placeholder="이름"
                onChange={inputName}
                value={name}
              /> */}
            </div>

            <div>
              <Form.Text style={{ marginTop: '-1%' }}>
                알파벳을 포함한 5~12자리
              </Form.Text>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiFillLock style={{ color: 'black' }} />
                </InputGroup.Text>
                <FormControl
                  type="password"
                  id="inlineFormInputGroup"
                  placeholder="비밀번호"
                  onChange={inputPw}
                  value={password}
                  style={{ width: '55vw' }}
                />
              </InputGroup>

              {/* <label>비밀번호</label>
              <input
                type="password"
                className="m_form-control"
                placeholder="대소문자와 숫자를 포함한 8~12자리"
                onChange={inputPw}
                value={password}
              /> */}
            </div>
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiFillUnlock style={{ color: 'gray' }} />
                </InputGroup.Text>
                <FormControl
                  type="password"
                  id="inlineFormInputGroup"
                  placeholder="비밀번호 확인"
                  onBlur={confirmHandler}
                  onChange={inputConfirmPw}
                  value={confirmPw}
                  style={{ width: '55vw' }}
                />
              </InputGroup>
              {/* <label>비밀번호 확인</label>
              <input
                type="password"
                className="m_form-control"
                placeholder="비밀번호 확인"
                onBlur={confirmHandler}
                onChange={inputConfirmPw}
                value={confirmPw}
              /> */}
            </div>

            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <hi.HiIdentification style={{ color: 'black' }} />
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="사원번호"
                  onChange={inputIdNo}
                  value={employeeId}
                  style={{ width: '55vw' }}
                />
              </InputGroup>
              {/* <label>사원번호</label>
              <input
                type="text"
                className="m_form-control"
                placeholder="사원번호"
                onChange={inputIdNo}
                value={employeeId}
              /> */}
            </div>

            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiFillPhone style={{ color: 'gray' }} />
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="전화번호를 입력하세요."
                  onChange={inputPhone}
                  value={tel}
                  style={{ width: '55vw' }}
                />
              </InputGroup>
              {/* <label>전화번호</label>
              <input
                type="text"
                className="m_form-control"
                placeholder="- 를 제외하고 입력하세요"
                onChange={inputPhone}
                value={tel}
              /> */}
            </div>

            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiFillShopping style={{ color: 'black' }} />
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="부서"
                  onChange={inputDep}
                  value={department}
                  style={{ width: '55vw' }}
                />
              </InputGroup>
              {/* <label>부서</label>
              <input
                type="text"
                className="m_form-control"
                placeholder="부서"
                onChange={inputDep}
                value={department}
              /> */}
            </div>
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <hi.HiPaperAirplane style={{ color: 'gray' }} />
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="직급"
                  onChange={inputPosition}
                  value={position}
                  style={{ width: '55vw' }}
                />
              </InputGroup>
              {/* <label>직급</label>
              <input
                type="text"
                className="m_form-control"
                placeholder="직급"
                onChange={inputPosition}
                value={position}
              /> */}
            </div>
            <div>
              <button
                className="m_registerButton"
                onClick={registerClickHandler}
                disabled={disable}
                style={
                  disable === 1
                    ? { backgroundColor: '#380202' }
                    : { backgroundColor: '#c00000' }
                }
              >
                가입
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
