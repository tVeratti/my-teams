import { makeStyles, fade } from '@material-ui/core/styles';
import { Search as Icon } from '@material-ui/icons';

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      position: 'relative'
    },
    input: {
      maxWidth: '100%',
      width: '100%',
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(8),
      color: theme.palette.text.primary,
      background: theme.palette.background.default,
      fontSize: theme.typography.h6.fontSize,
      border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
      borderRadius: theme.shape.borderRadius,
      transition: 'border-color 0.3s ease-in-out',
      '&:hover,&:focus': {
        outline: 0,
        borderColor: fade(theme.palette.primary.main, 0.7)
      }
    },
    icon: {
      position: 'absolute',
      left: theme.spacing(2),
      top: '50%',
      transform: 'translateY(-50%)',
      fill: theme.palette.primary.main
    }
  };
});

const Input = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className={classes.input}
      />
      <Icon className={classes.icon} />
    </div>
  );
};

export default Input;
