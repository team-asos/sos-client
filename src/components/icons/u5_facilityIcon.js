import React from 'react';
import * as BsIcon from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../../assets/styles/u5_facilityIcon.css';

/*class FacilityIcon extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
    this.state = { isToggleOn: true };

    this.handleClick = this.handleClick.bind(this);
  }
  onMouseOver(e) {
    this.setState({ text: '시설' });
    e.target.style.color = '#820101';
    //e.target.style.transform='scale(1.1)'
  }
  onMouseOut(e) {
    this.setState({ text: '' });
    e.target.style.color = 'black';
  }
  handleClick(e) {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }));
    e.target.style.color = '#820101';
  }

  render() {
    const { text } = this.state;
    const { isToggleOn } = this.state;
    return (
      <div
        className="facility-icon-box"
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        <div
          className="facility-icon-div"
          onClick={this.handleClick.bind(this)}
        >
          <div className="facility-text-div">
            <p className="facility-text"> {text}</p>
          </div>
          <Link
            to="/seat-reservation"
            style={{
              color: 'inherit',
            }}
          >
            <BsIcon.BsFillInfoCircleFill
              className="facilityicon"
              size={35}
            ></BsIcon.BsFillInfoCircleFill>
          </Link>
        </div>
      </div>
    );
  }
}*/

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
