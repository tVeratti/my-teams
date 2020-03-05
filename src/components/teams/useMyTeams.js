import { useState, useEffect, useRef } from 'react';
import { flatten } from 'lodash';
import cookies from 'js-cookie';
import useTeams from './useTeams';

export const COOKIE_KEY = 'MY_TEAMS';

const getCookieTeams = teams => {
  const cookieTeams = cookies.getJSON(COOKIE_KEY) || [];
  const allTeams = flatten(teams.map(t => t.teams));
  return cookieTeams.map(id => allTeams.find(t => id === t.id));
};

export default function useMyTeams(allTeams = useTeams()) {
  const [teams, setTeams] = useState([]);
  const didMount = useRef();

  // Get initial selections from cookie on mount.
  useEffect(() => {
    if (!didMount.current) {
      const cookieTeams = getCookieTeams(allTeams);
      setTeams(cookieTeams);
      didMount.current = true;
    }
  }, []);

  // Set cookie to match selection changes from within the app.
  useEffect(() => {
    if (didMount.current) {
      const ids = teams.map(s => s.id);
      cookies.set(COOKIE_KEY, ids);
    }
  }, [teams]);

  return [teams, setTeams];
}
