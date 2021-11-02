import React from 'react';

import '../assets/styles/a3_answerTabMenu.css';

export default class answerTabMenu extends React.Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          {this.props.tabs.map(tab => {
            const active = tab === this.props.selected ? 'active' : '';
            return (
              <li className="nav-item" key={tab}>
                <a
                  className={'nav-link ' + active}
                  onClick={() => this.props.setSelected(tab)}
                  href
                >
                  {tab}
                </a>
              </li>
            );
          })}
        </ul>
        {this.props.children}
      </div>
    );
  }
}
