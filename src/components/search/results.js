import { uniq, groupBy } from 'lodash';
import memoize from 'memoize-one';
import match from 'autosuggest-highlight/match';
import { Paper, List, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useGames from '../games/useGames';
import Match from './match';

const useStyles = makeStyles(theme => ({
  list: {
    margin: theme.spacing(1, 0)
  },
  group: {
    marginTop: theme.spacing(1),
    background: theme.palette.background.default
  }
}));

const getSeasons = games => {
  const teams = {};
  const seasons = groupBy(games, 'season');

  Object.keys(seasons).forEach(s => {
    const season = seasons[s];
    const groups = groupBy(season, 'home');
    teams[s] = [];

    const teamNames = uniq(Object.keys(groups));
    teamNames.forEach(name => {
      teams[s].push(name);
    });
  });

  return teams;
};

const getMatches = (name, filter) => ({ name, matches: match(name, filter) });

const getFilteredTeams = (seasons, filter) => {
  const teams = {};

  Object.keys(seasons).forEach(s => {
    const filteredTeams = seasons[s]
      .map(name => getMatches(name, filter))
      .filter(team => team.matches.length);

    if (filteredTeams.length) {
      teams[s] = filteredTeams;
    }
  });

  return teams;
  //[t => -t.matches.length + t.matches[0][0]]
};

const getGroupedTeams = teams => groupBy(teams, 'season');

const memoizedSeasons = memoize(getSeasons);
const memoizedFilteredTeams = memoize(getFilteredTeams);

const Results = ({ filter }) => {
  const games = useGames() || [];
  const classes = useStyles();

  const seasons = memoizedSeasons(games);
  const filteredTeams = memoizedFilteredTeams(seasons, filter);

  return (
    <List className={classes.list}>
      {/* <ListSubheader className={classes.group}>My Teams</ListSubheader> */}
      {Object.keys(filteredTeams).map(season =>
        filteredTeams[season].map(team => (
          <Match key={team.name} {...team} season={season} filter={filter} />
        ))
      )}
    </List>
  );
};

export default Results;
