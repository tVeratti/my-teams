import { useContext } from 'react';
import GamesContext from '../src/components/games/context';

const Index = () => {
  const games = useContext(GamesContext);
  console.log({ games });
  return <div>Hello</div>;
};

export default Index;
