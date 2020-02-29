import memoize from 'memoize-one';
import { sortBy } from 'lodash';
import match from 'autosuggest-highlight/match';
import { Paper, List, ListSubheader, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Match from './match';
import useTeams from '../teams/useTeams';

const useStyles = makeStyles(theme => ({
  group: {
    marginTop: theme.spacing(1),
    background: theme.palette.background.default
  }
}));

const getMatches = (team, filter) => {
  return {
    ...team,
    id: `${team.season}_${team.name}`,
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

const Results = ({ filter, selections, onSelection }) => {
  const teams = useTeams() || [];
  const classes = useStyles();
  const filteredTeams = memoizedFilteredTeams(teams, filter);

  return (
    <List>
      {filteredTeams.map((team, i) => {
        const selected = selections.some(s => s.id === team.id);
        const onClick = () => {
          if (selected) onSelection(selections.filter(s => s.id !== team.id));
          else onSelection([...selections, team]);
        };
        return (
          <React.Fragment>
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
  );
};

export default Results;
