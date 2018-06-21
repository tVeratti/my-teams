import React from 'react';
import { Step, Label, Divider } from 'semantic-ui-react';
import classnames from 'classnames';
import './Game.scss';

export default props => {
  const homeClassNames = classnames('team', {
    'team--home': true,
    'team--mine': props.isHome
  });

  const awayClassNames = classnames('team', {
    'team--away': true,
    'team--mine': props.isAway
  });

  return (
    <Step>
      {props.countdown && <Label corner="left" icon="time" color="teal" />}
      <Step.Content>
        <Step.Title>{props.time}</Step.Title>
        <Step.Description>
          <div className={homeClassNames}>{props.home}</div>
          <div className={awayClassNames}>{props.away}</div>
        </Step.Description>
      </Step.Content>
    </Step>
  );
};
