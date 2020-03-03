import useMyTeams from '../teams/useMyTeams';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import memoize from 'memoize-one';
import { flatten, sortBy } from 'lodash';
import dayjs from 'dayjs';

const getGames = teams =>
  sortBy(flatten(teams.map(t => t.games)), ['date', 'time']);

const memoizeGames = memoize(getGames);

const Schedule = () => {
  const [teams, setTeams] = useMyTeams();
  const games = memoizeGames(teams);

  const teamNames = teams.map(t => t.name);

  return (
    <div>
      {games.map(g => {
        const isHome = teamNames.includes(g.home);
        const date = dayjs(g.date).format('dddd');
        return (
          <Card elevation={0} variant="outlined" style={{ margin: '10px' }}>
            <CardHeader
              title={isHome ? g.home : g.away}
              subheader={`${date}, ${g.time}`}
            />
            <CardContent>Opponent: {isHome ? g.away : g.home}</CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Schedule;
