import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import GamesContext from '../src/components/games/context';

import useGames from '../src/hooks/useGames';
import theme from '../src/theme';

function App({ Component, pageProps }) {
  const games = useGames();

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
