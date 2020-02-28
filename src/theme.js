import { createMuiTheme } from '@material-ui/core/styles';

import { blueGrey, green, lightBlue } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: blueGrey,
    text: {
      primary: blueGrey[700],
      secondary: blueGrey[300]
    }
  }
});

export default theme;
