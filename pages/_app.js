import { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import GamesContext from '../src/components/games/context';

import theme from '../src/theme';

//const storageGames = localStorage?.getItem('games');
//const initialGames = storageGames && JSON.parse(storageGames);

function App({ Component, pageProps }) {
  const [games, setGames] = useState(null);

  useEffect(() => {
    const getGames = async () => {
      const { data } = await API.graphql(graphqlOperation(listGames));
      setGames(data.listGames.items);
      //localStorage?.setItem('games', JSON.stringify(allGames));
    };

    if (!games) getGames();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GamesContext.Provider value={games}>
        <CssBaseline />
        <Component {...pageProps} />
      </GamesContext.Provider>
    </ThemeProvider>
  );
}

export default App;
