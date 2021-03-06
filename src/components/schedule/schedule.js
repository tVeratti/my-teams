import {
  Container,
  Typography,
  Button,
  fade,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { flatten, sortBy, groupBy } from 'lodash';
import memoize from 'memoize-one';
import dayjs from 'dayjs';

import useMyTeams from '../teams/useMyTeams';
import Game from './game';
import Heading from '../heading';
import Link from 'next/link';

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
  },
  none: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(4, 2),
    background: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center'
  },
  return: {
    marginTop: theme.spacing(2)
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

const NoTeams = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.none}>
      <Heading
        title="No Teams Selected"
        subtitle="You must have at least one team selected before you can view a schedule."
      />
      <Link href="/" passHref>
        <Button color="primary" variant="outlined" className={classes.return}>
          Return to Selection
        </Button>
      </Link>
    </Container>
  );
};

const Schedule = () => {
  const classes = useStyles();
  const [teams, setTeams] = useMyTeams();
  if (!teams.length) return <NoTeams />;

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
        let heading;
        switch (i) {
          case 0:
            heading = 'This Week';
            break;
          case 1:
            heading = 'Next Week';
            break;
          default:
            heading = `In ${i} Weeks`;
            break;
        }
        return (
          <React.Fragment key={date}>
            <Heading
              title={heading}
              subtitle={formatWeek(date)}
              className={classes.weekStart}
            />
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
