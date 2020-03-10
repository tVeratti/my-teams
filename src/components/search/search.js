import { useState } from 'react';
import { Container, Chip, Slide, Typography } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

import Input from './input';
import Results from './results';
import useTeams from '../teams/useTeams';
import useMyTeams from '../teams/useMyTeams';
import Heading from '../heading';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2, 0),
    backgroundColor: theme.palette.background.default,
    zIndex: 10
  },
  selectionLabel: {
    display: 'block',
    fontSize: theme.typography.caption.fontSize,
    textAlign: 'center',
    color: fade(theme.palette.text.primary, 0.3)
  },
  count: {
    fontWeight: 700,
    color: theme.palette.primary.main
  },
  selections: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.action.hover,
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

  const addSelection = s => () => setSelections([...selections, s]);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <Container maxWidth="md">
          <Heading
            title="Add Teams"
            subtitle="Search for your teams by name. All selected teams will be added to the composite schedule."
          />
          <Input onChange={setFilter} value={filter} />
          <div className={classes.selections}>
            <Typography variant="button" className={classes.selectionLabel}>
              <span className={classes.count}>{selections.length}</span> Teams
              Selected
            </Typography>
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
        <Container maxWidth="md">
          <Results
            filter={filter}
            selections={selections}
            onAddSelection={addSelection}
            onRemoveSelection={removeSelection}
          />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Search;
