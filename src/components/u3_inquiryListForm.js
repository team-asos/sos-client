import React from 'react';
import '../assets/styles/u3_inquiryListForm.css';
import { Accordion } from 'react-bootstrap';

class InquiryListForm extends React.Component {
  render() {
    return (
      /*전체 문의 리스트 */
      <Accordion flush className="inquiryListTotal">
        {/*하나의 문의 제목, 내용/답변*/}
        <Accordion.Item eventKey="0" className="inquiryTitleAndAnswer">
          <Accordion.Header className="inquiryTitle">
            <div className="inquiryTitleMain">
              <div className="inquiryTitleUpper">
                <p className="inquiryTitleStyle">ESL 연동이 안돼요</p>
                <p className="inquiryDateStyle">21.10.18</p>
              </div>
              <div className="inquiryTitleBottom">
                <p className="isReply">답변대기</p>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="inquiryContent">
            제가오늘 뭐를 해쓴데
          </Accordion.Body>

          {/*답변*/}
          <Accordion.Body className="inquiryAnswer">
            <hr></hr>
            여기는 답변
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>좌석 예약이 안돼요</Accordion.Header>
          <Accordion.Body>문의 내용 여기</Accordion.Body>
          <Accordion.Body>
            <hr></hr>
            여기는 답변
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
}
export default InquiryListForm;
