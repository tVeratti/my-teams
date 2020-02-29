import { useState, useEffect } from 'react';
import storage from 'local-storage';

const KEY_TEAMS = 'TEAMS';
const KEY_LAST_FETCHED = 'LAST_FETCHED';

export default function useTeams() {
  const [teams, setTeams] = useState(storage.get(KEY_TEAMS));

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch('/.netlify/functions/teams');
      const data = await response.json();
      setTeams(data);
      storage.set(KEY_TEAMS, data);
      storage.set(KEY_LAST_FETCHED, Date.now());
    };

    const lastFetched = storage.get(KEY_LAST_FETCHED);
    const hourDelta = (Date.now() - lastFetched) / 1000 / 60 / 60;

    if (!teams || hourDelta > 12) getTeams();
  }, []);

  return teams;
}
