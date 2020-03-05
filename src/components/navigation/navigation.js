import { AppBar, Tabs, Tab, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlaylistAdd, Today } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  tabs: {
    //background: theme.palette.primary.main
  },
  tab: {
    fontWeight: 600
  }
}));

const Navigation = ({ tab }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Container maxWidth="sm">
        <Tabs
          value={tab}
          variant="fullWidth"
          //indicatorColor="primary"
          //textColor="primary"
          centered
          className={classes.tabs}
        >
          <Tab
            label="Teams"
            component="a"
            href="/"
            className={classes.tab}
            icon={<PlaylistAdd />}
          />
          <Tab
            label="Schedule"
            component="a"
            href="/schedule"
            className={classes.tab}
            icon={<Today />}
          />
        </Tabs>
      </Container>
    </AppBar>
  );
};

export default Navigation;
