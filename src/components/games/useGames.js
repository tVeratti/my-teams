import { useState, useEffect } from 'react';
import storage from 'local-storage';

const KEY_GAMES = 'GAMES';
const KEY_LAST_FETCHED = 'LAST_FETCHED';

export default function useGames() {
  const [games, setGames] = useState(storage.get(KEY_GAMES));

  useEffect(() => {
    const getGames = async () => {
      const response = await fetch('/.netlify/functions/games');
      const data = await response.json();
      setGames(data);
      storage.set(KEY_GAMES, data);
      storage.set(KEY_LAST_FETCHED, Date.now());
    };

    const lastFetched = storage.get(KEY_LAST_FETCHED);
    const hourDelta = (Date.now() - lastFetched) / 1000 / 60 / 60;

    if (!games || hourDelta > 12) getGames();
  }, []);

  return games;
}
