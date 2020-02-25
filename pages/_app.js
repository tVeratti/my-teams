import { useRef, useEffect, useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../src/aws-exports';

Amplify.configure(aws_exports);

import UserContext from '../src/authentication/context';

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const didMount = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      setUser(cognitoUser);
    };

    if (!didMount.current) getUser();
    else didMount.current = true;
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default App;
