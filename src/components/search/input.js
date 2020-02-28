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
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(8),
      fontSize: theme.typography.h4.fontSize,
      border: `1px solid ${fade(theme.palette.text.primary, 0.3)}`,
      borderRadius: theme.shape.borderRadius,
      transition: 'border-color 0.3s ease-in-out',
      '&:hover,&:focus': {
        outline: 0,
        borderColor: fade(theme.palette.text.primary, 0.6)
      }
    },
    icon: {
      position: 'absolute',
      left: theme.spacing(2),
      top: '50%',
      transform: 'translateY(-50%)',
      fill: fade(theme.palette.text.primary, 0.3)
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
      />
      <Icon className={classes.icon} fontSize="large" />
    </div>
  );
};

export default Input;
