import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { flatten, sortBy, groupBy } from 'lodash';
import memoize from 'memoize-one';
import dayjs from 'dayjs';

import useMyTeams from '../teams/useMyTeams';

// -- 1. Grey out days passed
// -- 2. Made by / About
// 3. Analytics
// 4. Actions (copy, share)
// 5. Alternate themes

const today = dayjs();

const ellipsisText = () => ({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const useStyles = makeStyles(theme => ({
  weekStart: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1)
  },
  week: {
    display: 'grid',
    padding: theme.spacing(1),
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridGap: theme.spacing(1)
  },
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

const formatWeek = date => [
  `${dayjs(date).format('ddd MMMM DD')} - `,
  `${dayjs(date)
    .endOf('week')
    .format('ddd MMMM DD')}`
];

const getGames = teams =>
  groupBy(sortBy(flatten(teams.map(t => t.games)), ['date', 'time']), g =>
    dayjs(g.date).startOf('week')
  );

const memoizeGames = memoize(getGames);

const Schedule = () => {
  const classes = useStyles();
  const [teams, setTeams] = useMyTeams();
  if (!teams.length) return <div>You must select some teams!</div>;

  const gameWeeks = memoizeGames(teams);
  const weeks = Object.keys(gameWeeks);
  const currentWeeks = weeks.filter(w => {
    return !dayjs(w)
      .endOf('week')
      .isBefore(today);
  });

  const teamNames = teams.map(t => t.name);

  return (
    <Container maxWidth="lg">
      {currentWeeks.map((date, i) => {
        const games = gameWeeks[date];
        return (
          <React.Fragment key={date}>
            <Typography variant="h4" className={classes.weekStart}>
              {i === 0 ? 'This Week' : formatWeek(date)}
            </Typography>
            <div className={classes.week}>
              {games.map(g => {
                const isHome = teamNames.includes(g.home);
                const isBoth = isHome && teamNames.includes(g.away);
                const isDone = dayjs().isAfter(dayjs(g.date));
                const team = isHome ? g.home : g.away;
                const opponent = isHome ? g.away : g.home;
                const date = dayjs(g.date).format('ddd');
                return (
                  <Card
                    key={`${g.home}-v-${g.away}`}
                    elevation={0}
                    variant="outlined"
                    className={isDone && classes.done}
                  >
                    <CardContent className={classes.card}>
                      <div>
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
                      </div>
                      <Typography variant="h6" className={classes.time}>
                        {isDone ? g.status : `${date}, ${g.time}`}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default Schedule;
