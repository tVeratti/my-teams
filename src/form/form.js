import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  }
}));

const Form = ({ onSubmit }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} variant={'outlined'} className={classes.paper}>
      <form onSubmit={onSubmit}>Hi</form>
    </Paper>
  );
};

export default Form;
