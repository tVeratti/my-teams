import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import memoize from 'memoize-one';
import match from 'autosuggest-highlight/match';
import { List, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useGames from '../games/useGames';
import Match from './match';

const useStyles = makeStyles(theme => ({
  list: {
    margin: theme.spacing(2, 0)
  }
}));

const getTeams = games => uniq(flatten(games.map(g => [g.home, g.away])));
const getMatches = (team, filter) => ({ team, matches: match(team, filter) });
const getFilteredTeams = (teams, filter) =>
  sortBy(
    teams
      .map(team => getMatches(team, filter))
      .filter(team => team.matches.length),
    [t => -t.matches.length + t.matches[0][0]]
  );

const memoizedTeams = memoize(getTeams);
const memoizedFilteredTeams = memoize(getFilteredTeams);

const Results = ({ filter }) => {
  const games = useGames() || [];
  const teams = memoizedTeams(games);
  const filteredTeams = memoizedFilteredTeams(teams, filter);
  const classes = useStyles();

  return (
    <React.Fragment>
      {!!filteredTeams.length && (
        <List className={classes.list}>
          {filteredTeams.map(team => (
            <Match key={team.team} {...team} filter={filter} />
          ))}
        </List>
      )}
    </React.Fragment>
  );
};

export default Results;
