import { useState } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

import parse from 'autosuggest-highlight/parse';
import StarCheckBox from './star';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(0.5, 0)
    //fontWeight: 500
  },
  highlight: {
    padding: theme.spacing(0.5, 0),
    //fontWeight: 500,
    color: theme.palette.primary.dark,
    background: fade(theme.palette.primary.light, 0.2)
  }
}));

const Match = ({ name, season, matches, selected, onClick }) => {
  const classes = useStyles();
  const parts = matches ? parse(name, matches) : [{ text: name }];

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <StarCheckBox checked={selected} />
      </ListItemIcon>
      <ListItemText
        primary={parts.map((p, i) => (
          <Typography
            key={`${p.text}-${i}`}
            component="span"
            variant="h6"
            className={p.highlight ? classes.highlight : classes.text}
          >
            {p.text}
          </Typography>
        ))}
        secondary={season}
        className={classes.listItem}
      />
    </ListItem>
  );
};

export default Match;
