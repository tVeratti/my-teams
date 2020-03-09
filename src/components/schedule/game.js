import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

const ellipsisText = () => ({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  done: {
    opacity: 0.5
  },
  team: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: 600,
    ...ellipsisText()
  },
  opponent: {
    ...ellipsisText()
  },
  time: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.action.hover,
    textAlign: 'center'
  }
}));

const Game = ({ teams, home, away, date, time }) => {
  const classes = useStyles();
  const isHome = teams.includes(home);
  const isBoth = isHome && teams.includes(away);
  const isDone = dayjs()
    .subtract(1, 'day')
    .isAfter(dayjs(date));
  const team = isHome ? home : away;
  const opponent = isHome ? away : home;
  const day = dayjs(date).format('ddd');

  return (
    <Card
      key={`${home}-v-${away}`}
      elevation={0}
      variant="outlined"
      className={isDone && classes.done}
    >
      <CardContent className={classes.card}>
        <Typography color="primary" className={classes.team}>
          {team}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          className={classes.opponent}
        >
          vs. {opponent}
        </Typography>

        <Typography variant="h6" className={classes.time}>
          {isDone ? 'Complete' : `${day}, ${time}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Game;
