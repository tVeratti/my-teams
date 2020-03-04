import memoize from 'memoize-one';
import { sortBy } from 'lodash';
import match from 'autosuggest-highlight/match';
import { Paper, List, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Match from './match';
import useTeams from '../teams/useTeams';

const useStyles = makeStyles(theme => ({
  list: {
    padding: 0
  }
}));

const getMatches = (team, filter) => {
  return {
    ...team,
    matches: match(team.name, filter)
  };
};

const getFilteredTeams = (allTeams, filter) => {
  let teams = [];

  allTeams.forEach(season => {
    const filteredTeams = season.teams
      .map(team => getMatches(team, filter))
      .filter(team => team.matches.length);

    if (filteredTeams.length) {
      teams = [...teams, ...filteredTeams];
    }
  });

  return sortBy(teams, [
    t => t.matches[0][0] - (t.matches.length + t.matches[0].length)
  ]);
};

const memoizedFilteredTeams = memoize(getFilteredTeams);

const Results = ({ filter, selections, onAddSelection, onRemoveSelection }) => {
  const teams = useTeams() || [];
  const classes = useStyles();
  const filteredTeams = memoizedFilteredTeams(teams, filter);
  const showResults = !!filteredTeams.length;
  if (!showResults) return <React.Fragment />;

  return (
    <Paper elevation={0} variant="outlined">
      <List className={classes.list}>
        {filteredTeams.map((team, i) => {
          const selected = selections.some(s => s.id === team.id);
          const onClick = () => {
            if (selected) onRemoveSelection(team)();
            else onAddSelection(team)();
          };
          return (
            <React.Fragment key={team.id}>
              {!!i && <Divider />}
              <Match
                key={team.id}
                {...team}
                filter={filter}
                selected={selected}
                onClick={onClick}
              />
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default Results;
