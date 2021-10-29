import React from 'react';
import MyReservationData from '../assets/data/myReservationList';
import '../assets/styles/u4_myReservationListForm.css';
//마이페이지->나의 예약 내역 조회/취소

class MyReservationListForm extends React.Component {
  clickHandler = id => {
    if (MyReservationData.listData[id].status == 0) {
      return '예약 취소';
    } else if (MyReservationData.listData[id].status == 1) {
      return '퇴실 하기';
    } else return null;
  };
  render() {
    return (
      <div className="myReservationListForm">
        <p className="myReservationListFormTitleTextStyle">
          나의 예약 조회/취소
        </p>

        <div className="myReservationList">
          {MyReservationData.listData.map((item, idx) => (
            <div
              key={idx}
              className="myReservationDetail"
              onClick={() => this.clickHandler(idx)}
            >
              <p className="rvDate">{item.reseration_date}</p>

              <p className="rvTime">{item.reservation_time}</p>
              <p className="rvFloor">{item.floor_id}층</p>
              <p className="rvSeatNum">{item.seat_id}번</p>
              <p className="rvStatus">
                {item.status == 0
                  ? '예약완료'
                  : item.status == 1
                  ? '사용중'
                  : '사용완료'}
              </p>

              {item.status == 0 ? ( //예약완료 상태면
                <button className="reservationCancelBtn">예약 취소</button>
              ) : item.status == 1 ? ( //사용중이면
                <button className="checkOutBtn">퇴실 하기</button>
              ) : (
                //칸 맞추기용
                <div className="noneBtn"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default MyReservationListForm;
