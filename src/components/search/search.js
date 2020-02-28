import { useState, useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Input from './input';
import Results from './results';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1, 0),
    float: 'right'
  }
}));

const Search = () => {
  const [filter, setFilter] = useState('');
  const classes = useStyles();

  return (
    <div>
      <header className={classes.header}>
        <Container maxWidth="sm">
          <Input onChange={setFilter} />
        </Container>
      </header>
      <Container maxWidth="sm">
        <Results filter={filter} />
      </Container>
    </div>
  );
};

export default Search;
