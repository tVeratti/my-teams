import React from 'react';
import './Game.scss';

export default props => {
  return (
    <li className="game">
      <div>
        {props.date} {props.time}
      </div>
      <div>
        {props.home} vs. {props.away}
      </div>
      <div>{props.status}</div>
    </li>
  );
};
