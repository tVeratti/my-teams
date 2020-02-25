import { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Amplify, { Auth } from 'aws-amplify';

import UserContext from '../src/authentication/context';
import aws_exports from '../src/aws-exports';
import theme from '../src/theme';

Amplify.configure(aws_exports);

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      setUser(cognitoUser);
    };

    if (!user) getUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <CssBaseline />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
