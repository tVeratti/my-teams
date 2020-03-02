import { useState, useEffect, useRef } from 'react';
import { Container, Chip, Tabs, Tab, Slide } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import cookies from 'js-cookie';

import Input from './input';
import Results from './results';
import useTeams from '../teams/useTeams';
import Navigation from '../navigation';
import useMyTeams from '../teams/useMyTeams';

const useStyles = makeStyles(theme => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: 10
  },
  tabs: {
    marginBottom: theme.spacing(2),
    backgroundColor: 'transparent'
  },
  noSelections: {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: '30px',
    color: fade(theme.palette.primary.dark, 0.5),
    textAlign: 'center'
  },
  selections: {
    minHeight: theme.spacing(6),
    padding: theme.spacing(1),
    border: `1px solid ${fade(theme.palette.primary.light, 0.1)}`,
    borderTop: 0,
    borderRadius: theme.shape.borderRadius,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: fade(theme.palette.primary.light, 0.1),
    //whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  chip: {
    margin: theme.spacing(0.5, 0.5, 0, 0)
  }
}));

const Search = () => {
  const [filter, setFilter] = useState('');
  const classes = useStyles();

  const teams = useTeams();
  const [selections, setSelections] = useMyTeams(teams);

  const removeSelection = s => () =>
    setSelections(selections.filter(team => team.id !== s.id));

  return (
    <div>
      <header className={classes.header}>
        <Container maxWidth="sm">
          <Navigation />
          <Input onChange={setFilter} />
          <div className={classes.selections}>
            {!selections.length && (
              <div key="no-selections" className={classes.noSelections}>
                No Teams Selected
              </div>
            )}
            {selections.map(s => (
              <Slide key={s.name} direction="left" in={true} unmountOnExit>
                <Chip
                  label={s.name}
                  className={classes.chip}
                  onDelete={removeSelection(s)}
                  size="small"
                  color="primary"
                />
              </Slide>
            ))}
          </div>
        </Container>
      </header>
      <section>
        <Container maxWidth="sm">
          <Results
            filter={filter}
            selections={selections}
            onSelection={setSelections}
          />
        </Container>
      </section>
    </div>
  );
};

export default Search;
