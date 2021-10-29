import React from 'react';
import Toilet from '../assets/images/toilet.png';
import AirConditioner from '../assets/images/air_conditioner.png';

import '../assets/styles/u5_facilityForm.css';
//좌석 예약 페이지->시설물 위치에 맞게 배치...seatStatusForm에 띄워야함
class FacilityForm extends React.Component {
  render() {
    return (
      <div className="facilityFormStyle">
        <img src={Toilet} alt="Logo Image" />
        <img src={AirConditioner} alt="Logo Image" />
      </div>
    );
  }
}
export default FacilityForm;
