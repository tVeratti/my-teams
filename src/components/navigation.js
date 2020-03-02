import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tabs: {
    margin: theme.spacing(2, 0)
  },
  tab: {
    fontWeight: 600
  }
}));

const Navigation = () => {
  const classes = useStyles();

  return (
    <Tabs value={0} variant="fullWidth" centered className={classes.tabs}>
      <Tab label="Select Team(s)" className={classes.tab} />
      <Tab label="View Schedule" className={classes.tab} />
    </Tabs>
  );
};

export default Navigation;
