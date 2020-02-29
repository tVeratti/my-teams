import { useState, useEffect } from 'react';
import {
  Container,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Slide,
  Typography
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

import Input from './input';
import Results from './results';

const useStyles = makeStyles(theme => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: 10
  },
  stepper: {
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
  const [selections, setSelections] = useState([]);
  const classes = useStyles();

  const removeSelection = s => () =>
    setSelections(selections.filter(team => team.id !== s.id));

  return (
    <div>
      <header className={classes.header}>
        <Container maxWidth="sm">
          <Stepper nonLinear activeStep={0} className={classes.stepper}>
            <Step>
              <StepLabel>Select Team(s)</StepLabel>
            </Step>
            <Step onClick={() => console.log('VIew')}>
              <StepButton>View Schedule</StepButton>
            </Step>
          </Stepper>
          <Input onChange={setFilter} />

          <div className={classes.selections}>
            {!selections.length && (
              <div className={classes.noSelections}>No Teams Selected</div>
            )}
            {selections.map(s => (
              <Slide direction="left" in={true} unmountOnExit>
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
