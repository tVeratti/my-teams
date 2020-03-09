import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  content: {
    flex: '1 0 auto'
  },
  footer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexShrink: 0,
    padding: theme.spacing(3),
    textAlign: 'center'
  },
  dash: {
    display: 'inline-block',
    margin: theme.spacing(0, 0.5),
    width: '10px',
    height: '1px',
    background: theme.palette.text.secondary,
    verticalAlign: 'middle'
  },
  link: {
    lineHeight: 'inherit',
    color: 'inherit',
    textDecoration: 'none'
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <div className={classes.content}>{children}</div>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Typography variant="caption" color="textSecondary">
          <a
            href="https://github.com/tVeratti/my-teams"
            className={classes.link}
          >
            source
          </a>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          <span
            className={classes.link}
          >{`© ${new Date().getFullYear()}`}</span>
          <span className={classes.dash} />
          <a
            href="https://www.linkedin.com/in/tatianaveratti/"
            className={classes.link}
          >
            veratti
          </a>
        </Typography>
      </Container>
    </div>
  );
};

export default Layout;
