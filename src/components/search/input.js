import { makeStyles, fade } from '@material-ui/core/styles';
import { Search as Icon } from '@material-ui/icons';

const useStyles = makeStyles(theme => {
  const gradient = (opacity, start) =>
    `linear-gradient(45deg, ${fade(
      theme.palette.primary.dark,
      opacity
    )} 30%, ${fade(theme.palette.primary.light, opacity)} 90%)`;

  return {
    wrapper: {
      position: 'relative',
      padding: theme.spacing(0.1),
      //paddingRight: theme.spacing(8),
      background: gradient(0.5),
      borderRadius: theme.spacing(0.6),
      transition: 'background 0.3s ease-in-out',
      '&:hover, &:focus-within': {
        background: gradient(0.8)
      }
    },
    input: {
      maxWidth: '100%',
      width: '100%',
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(9),
      fontSize: theme.typography.h4.fontSize,
      background: fade(theme.palette.background.paper, 1),
      border: 0,
      borderRadius: theme.spacing(0.5),
      '&:focus': {
        outline: 0
      }
    },
    icon: {
      position: 'absolute',
      left: theme.spacing(3),
      top: '50%',
      transform: 'translateY(-50%)',
      fill: theme.palette.primary.dark
    }
  };
});

const Input = ({ onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <input
        onChange={e => onChange(e.target.value)}
        className={classes.input}
        fullWidth
      />
      <Icon className={classes.icon} fontSize="large" />
    </div>
  );
};

export default Input;
