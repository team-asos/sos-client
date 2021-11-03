import React from 'react';
import { Accordion } from 'react-bootstrap';
import InquiryData from '../assets/data/inquiryList';
import '../assets/styles/u3_inquiryListForm.css';
//문의 리스트 폼
class InquiryListForm extends React.Component {
  render() {
    return (
      /*전체 문의 리스트 */
      <Accordion flush className="inquiryListTotal">
        {/*하나의 문의 제목, 내용/답변*/}
        {InquiryData.listData.map(item => (
          <Accordion.Item eventKey={item.id} className="inquiryTitleAndAnswer">
            <Accordion.Header className="inquiryTitle">
              <div className="inquiryTitleMain">
                <div className="inquiryTitleUpper">
                  <p className="inquiryTitleStyle">{item.title}</p>
                  <p className="inquiryDateStyle">{item.created_at}</p>
                </div>
                <div className="inquiryTitleBottom">
                  <p
                    className="isReply"
                    style={{
                      color: item.status ? 'green' : 'gray',
                    }}
                  >
                    {item.status ? '답변완료' : '답변대기'}
                  </p>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body className="inquiryContent">
              {item.message}
            </Accordion.Body>

            {/*답변*/}
            <Accordion.Body className="inquiryAnswer">
              <hr></hr>
              <div className="inquiryTitleUpper">
                <p>{item.reply}</p>
                <p
                  style={{
                    marginLeft: '3vw',
                  }}
                >
                  {item.replied_at}
                </p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }
}
export default InquiryListForm;
