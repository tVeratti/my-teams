import { createMuiTheme } from '@material-ui/core/styles';

import { deepPurple, blue } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepPurple
    // text: {
    //   primary: blueGrey[700],
    //   secondary: blueGrey[300]
    // }
  }
});

export default theme;
