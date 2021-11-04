import React from 'react';
import * as MdIcon from 'react-icons/md';
import { Link } from 'react-router-dom';

class SeatReservationIcon extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
  }
  onMouseOver(e) {
    this.setState({ text: '좌석' });
    e.target.style.color = '#820101';
    //e.target.style.transform='scale(1.1)'
  }
  onMouseOut(e) {
    this.setState({ text: '' });
    e.target.style.color = 'black';
  }
  render() {
    const { text } = this.state;
    return (
      <div
        className="icon-box"
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        <Link
          to="/seat-reservation"
          style={{
            color: 'inherit',
          }}
        >
          <MdIcon.MdEventSeat className="icon" size={35} />
        </Link>
        <p className="text"> {text}</p>
      </div>
    );
  }
}

export default SeatReservationIcon;
