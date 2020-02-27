import { TextField, InputAdornment } from '@material-ui/core';
import { Search as Icon } from '@material-ui/icons';

const Input = ({ onChange }) => {
  return (
    <div>
      <TextField
        label="Teams"
        onChange={e => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          )
        }}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default Input;
