import { useContext } from 'react';

import UserContext from '../src/authentication/context';

const Index = () => {
  const user = useContext(UserContext);
  return <div>Hello {user && user.username}</div>;
};

export default Index;
