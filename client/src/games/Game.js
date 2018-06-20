import React from 'react';
import { Card, Label, Divider } from 'semantic-ui-react';
import './Game.scss';

export default props => {
  return (
    <li className="game">
      <Card>
        <Card.Content>
          {props.first && (
            <div>
              <Label ribbon color="teal">
                {props.date}
              </Label>
              <Divider hidden />
            </div>
          )}
          <Card.Header>{props.time}</Card.Header>
          <Card.Meta>{props.status}</Card.Meta>
          <Card.Description>
            {props.home} vs. {props.away}
          </Card.Description>
        </Card.Content>
      </Card>
    </li>
  );
};
