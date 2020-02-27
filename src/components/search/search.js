import { useState } from 'react';
import { Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Input from './input';
import Results from './results';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10)
  }
}));

const Search = () => {
  const [filter, setFilter] = useState('');
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={0} className={classes.paper}>
          <Input onChange={setFilter} />
        </Paper>
        <Results filter={filter} />
      </Container>
    </div>
  );
};

export default Search;
