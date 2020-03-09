import { createMuiTheme } from '@material-ui/core/styles';

import { teal, grey, lightBlue } from '@material-ui/core/colors';

const baseTheme = {
  palette: {
    //type: 'dark',
    primary: teal,
    secondary: grey
    // text: {
    //   primary: blueGrey[700],
    //   secondary: blueGrey[300]
    // }
  }
};

// Create a theme instance.
const theme = createMuiTheme(baseTheme);

export default theme;
