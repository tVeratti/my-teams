import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

import parse from 'autosuggest-highlight/parse';
import { Group } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(0.25, 0)
  },
  highlight: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(0.25, 0),
    color: theme.palette.primary.dark,
    background: fade(theme.palette.primary.light, 0.2)
  }
}));

const Match = ({ team, matches }) => {
  const classes = useStyles();
  const parts = parse(team, matches);

  return (
    <ListItem button>
      <ListItemIcon>
        <Group />
      </ListItemIcon>
      <ListItemText
        primary={parts.map((p, i) => (
          <span
            key={`${p.text}-${i}`}
            className={p.highlight ? classes.highlight : classes.text}
          >
            {p.text}
          </span>
        ))}
        secondary={'Saturday Morning'}
      />
    </ListItem>
  );
};

export default Match;
