import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { flatten, sortBy, groupBy } from 'lodash';
import memoize from 'memoize-one';
import dayjs from 'dayjs';

import useMyTeams from '../teams/useMyTeams';
import Game from './game';
import Heading from '../heading';

// -- 1. Grey out days passed
// -- 2. Made by / About
// -- 3. Analytics
// 4. Actions (copy, share)
// 5. Alternate themes

const today = dayjs();

const useStyles = makeStyles(theme => ({
  weekStart: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1)
  },
  week: {
    display: 'grid',
    padding: theme.spacing(1),
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gridGap: theme.spacing(1)
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
  if (!teams.length) return <div />;

  const gameWeeks = memoizeGames(teams);
  const weeks = Object.keys(gameWeeks);
  const currentWeeks = weeks.filter(w => {
    return !dayjs(w)
      .endOf('week')
      .isBefore(today);
  });

  const teamNames = teams.map(t => t.name);

  return (
    <Container maxWidth="md">
      {currentWeeks.map((date, i) => {
        const games = gameWeeks[date];
        return (
          <React.Fragment key={date}>
            <Typography variant="h4" className={classes.weekStart}>
              {i === 0 ? (
                <Heading title="This Week" subtitle={formatWeek(date)} />
              ) : (
                formatWeek(date)
              )}
            </Typography>
            <div className={classes.week}>
              {games.map(g => (
                <Game {...g} teams={teamNames} />
              ))}
            </div>
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default Schedule;
