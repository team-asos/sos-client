import React from 'react';

class CurrentSeat extends React.Component {
  render(){
    var section={
      position:'absolute',
      marginTop:'12vh',
      marginLeft:'10vw',
      width:'40vw',
      height:'80vh',

      background:'gray'
    }
    return (
        <div style={section}>Hello</div>
    );
  }

}

export default CurrentSeat;
