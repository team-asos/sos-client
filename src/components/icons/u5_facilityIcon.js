import React from 'react';
import * as BsIcon from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../../assets/styles/u5_facilityIcon.css';
import FacilityForm from '../u5_facilityForm';

class FacilityIcon extends React.Component {
  constructor() {
    super();
    this.state = { isToggleOn: 1 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }));
    this.state.isToggleOn
      ? (e.target.style.color = '#820101')
      : (e.target.style.color = 'black');
  }
  render() {
    return (
      <div className="facility-icon-box">
        <div className="facility-icon-div">
          <Link
            to="/seat-reservation"
            style={{
              color: 'inherit',
            }}
          >
            <BsIcon.BsFillInfoCircleFill
              className="facilityicon"
              size={35}
              onClick={this.handleClick}
            ></BsIcon.BsFillInfoCircleFill>
          </Link>
        </div>
      </div>
    );
  }
}

export default FacilityIcon;
