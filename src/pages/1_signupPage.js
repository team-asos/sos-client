import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { InputGroup, FormControl, Form } from 'react-bootstrap';

import * as MdIcon from 'react-icons/md';
import * as ai from 'react-icons/ai';
import * as hi from 'react-icons/hi';
import Logo from '../assets/images/new_logo_shadow_3.png';

import '../assets/styles/1_signupPage.css';
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
    } else if (result.status === 400) {
      alert('정보를 정확하게 입력해 주세요.');
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
        <div className="register">
          <div className="left">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="right">
            <div className="register-form">
              <p
                style={{
                  fontSize: '1.4em',
                  marginBottom: '0',
                  color: 'rgb(231,231,231)',
                }}
              >
                환영합니다.
              </p>
              <p
                style={{
                  fontSize: '1em',
                  color: 'rgb(189,189,189)',
                  marginBottom: '5%',
                }}
              >
                회원가입을 위해 아래의 정보를 입력해주세요.
              </p>
              <div className="column">
                <div>
                  <label>
                    이메일
                    <input
                      type="text"
                      className="form-control"
                      placeholder="회사 이메일을 입력해주세요"
                      onChange={inputEmail}
                      value={email}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    이름
                    <input
                      type="text"
                      className="form-control"
                      placeholder="이름"
                      onChange={inputName}
                      value={name}
                    />
                  </label>
                </div>
              </div>
              <div className="column">
                <div>
                  <label>
                    비밀번호
                    <input
                      type="password"
                      className="form-control"
                      placeholder="대소문자와 숫자를 포함한 8~12자리"
                      onChange={inputPw}
                      value={password}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    비밀번호 확인
                    <input
                      type="password"
                      className="form-control"
                      placeholder="비밀번호 확인"
                      onBlur={confirmHandler}
                      onChange={inputConfirmPw}
                      value={confirmPw}
                    />
                  </label>
                </div>
              </div>
              <div className="column">
                <div>
                  <label>
                    사원번호
                    <input
                      type="text"
                      className="form-control"
                      placeholder="사원번호"
                      onChange={inputIdNo}
                      value={employeeId}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    전화번호
                    <input
                      type="text"
                      className="form-control"
                      placeholder="- 를 제외하고 입력하세요"
                      onChange={inputPhone}
                      value={tel}
                    />
                  </label>
                </div>
              </div>
              <div className="column">
                <div>
                  <label>
                    부서
                    <input
                      type="text"
                      className="form-control"
                      placeholder="부서"
                      onChange={inputDep}
                      value={department}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    직급
                    <input
                      type="text"
                      className="form-control"
                      placeholder="직급"
                      onChange={inputPosition}
                      value={position}
                    />
                  </label>
                </div>
              </div>
              <button
                className="registerButton"
                onClick={registerClickHandler}
                disabled={disable}
              >
                가입
              </button>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="m-register">
          <div className="m-upper-register">
            <p className="m-welcome-text-register">환영합니다.</p>
            <p>회원 가입을 위해 아래의 정보를 입력해주세요.</p>
          </div>
          <div className="m-bottom-register">
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiTwotoneMail style={{ color: 'black' }} />
                </InputGroup.Text>
                <FormControl
                  className="m-form-control"
                  placeholder="회사 이메일"
                  onChange={inputEmail}
                  value={email}
                  style={{ width: '60vw' }}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiOutlineUser style={{ color: 'gray' }} />
                </InputGroup.Text>
                <FormControl
                  placeholder="이름"
                  onChange={inputName}
                  value={name}
                  style={{ width: '60vw' }}
                />
              </InputGroup>
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
                  placeholder="비밀번호"
                  onChange={inputPw}
                  value={password}
                  style={{ width: '60vw' }}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiFillUnlock style={{ color: 'gray' }} />
                </InputGroup.Text>
                <FormControl
                  type="password"
                  placeholder="비밀번호 확인"
                  onBlur={confirmHandler}
                  onChange={inputConfirmPw}
                  value={confirmPw}
                  style={{ width: '60vw' }}
                />
              </InputGroup>
            </div>

            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <hi.HiIdentification style={{ color: 'black' }} />
                </InputGroup.Text>
                <FormControl
                  placeholder="사원번호"
                  onChange={inputIdNo}
                  value={employeeId}
                  style={{ width: '60vw' }}
                />
              </InputGroup>
            </div>

            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiFillPhone style={{ color: 'gray' }} />
                </InputGroup.Text>
                <FormControl
                  placeholder="전화번호를 입력하세요."
                  onChange={inputPhone}
                  value={tel}
                  style={{ width: '60vw' }}
                />
              </InputGroup>
            </div>

            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <ai.AiFillShopping style={{ color: 'black' }} />
                </InputGroup.Text>
                <FormControl
                  placeholder="부서"
                  onChange={inputDep}
                  value={department}
                  style={{ width: '60vw' }}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <hi.HiPaperAirplane style={{ color: 'gray' }} />
                </InputGroup.Text>
                <FormControl
                  placeholder="직급"
                  onChange={inputPosition}
                  value={position}
                  style={{ width: '60vw' }}
                />
              </InputGroup>
            </div>
            <div>
              <button
                className="m_registerButton-register"
                onClick={registerClickHandler}
                disabled={disable}
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
