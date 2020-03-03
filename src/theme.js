import { createMuiTheme } from '@material-ui/core/styles';

import { teal, grey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: grey
    // text: {
    //   primary: blueGrey[700],
    //   secondary: blueGrey[300]
    // }
  }
});

export default theme;
