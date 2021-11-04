import React from 'react';

import { SpinnerCircular } from 'spinners-react';

import '../assets/styles/1_containerStyle.css';
import '../assets/styles/1_loadingPage.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="container loading">
        <SpinnerCircular
          size={300}
          thickness={50}
          speed={101}
          color="#c00000"
          className="spinnerStyle"
        />
        <p className="welcomeText">
          환영합니다. <br />
          홍길동 부장님
        </p>
      </div>
    );
  }
}

export default Loading;
