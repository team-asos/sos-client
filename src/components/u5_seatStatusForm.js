import React from 'react';
import FacilityIcon from '../components/icons/u5_facilityIcon';
import '../assets/styles/u5_seatStatusForm.css';
class SeatStatusForm extends React.Component {
  render() {
    return (
      <div className="seatForm">
        <div className="u_seatFormUpper">
          <div className="selectedFloorName">
            <p className="selectedFloorNameTextStyle">2F</p>
          </div>

          <div className="statusForm">
            <div className="showFacility">
              <FacilityIcon />
            </div>
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

        <div className="u_seatFormBottom">
          <div className="seatLayout"></div>
          <div className="floorList">
            <button className="u_floorNameButton">1F</button>
            <button className="u_floorNameButton_selected">2F</button>
          </div>
        </div>
      </div>
    );
  }
}
export default SeatStatusForm;
