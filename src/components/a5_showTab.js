import React from 'react';

const ShowTab = props => {
  console.log(props.clickedSeat);
  return (
    <div style={{ marginTop: '5%' }}>
      <table style={{}}>
        <tr>
          <th>좌석 번호</th>
          <td>{props.clickedSeat.name}</td>
        </tr>
        <tr>
          <th>좌석 위치</th>
          <td>
            ({props.clickedSeat.x + 1}, {props.clickedSeat.y + 1})
          </td>
        </tr>
      </table>
    </div>
  );
};
export default ShowTab;
