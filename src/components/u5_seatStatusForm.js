import React from 'react';
import '../assets/styles/u5_seatStatusForm.css';
class SeatStatusForm extends React.Component {
  render() {
    return (
      <div className="seatForm">
        <div className="u_seatFormUpper">
          <div className="showFacility">
            <button className="showFacilityButton">시설</button>
          </div>
          <div className="seatsStatusForm">
            <div className="reservedSeats">
              <div className="reservedSeatShape"></div>
              <p className="reservedSeatsTextStyle">사용 좌석 20석</p>
            </div>
            <div className="ableSeats">
              <div className="ableSeatShape"></div>
              <p className="ableSeatsTextStyle">예약 가능 13석</p>
            </div>
          </div>
        </div>

        <div className="u_seatFormBottom"></div>
      </div>
    );
  }
}
export default SeatStatusForm;
