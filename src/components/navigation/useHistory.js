import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import cookies from 'js-cookie';

export const COOKIE_KEY = 'MY_TAB';
const ROUTES = ['/', '/schedule'];

const getLastTab = () => cookies.getJSON(COOKIE_KEY) || 0;

export default function useHistory() {
  const [tab, setTab] = useState();
  const didMount = useRef();

  // Get initial selection from cookie on mount.
  useEffect(() => {
    if (!didMount.current) {
      const lastTab = getLastTab();
      setTab(lastTab);
      didMount.current = true;
    }
  }, []);

  // Set cookie to match selection changes from within the app.
  useEffect(() => {
    if (didMount.current) {
      cookies.set(COOKIE_KEY, tab);
      Router.push(ROUTES[tab]);
    }
  }, [tab]);

  return [tab, setTab];
}
