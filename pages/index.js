import { useEffect } from 'react';
import Router from 'next/router';

import Layout from '../src/components/layout';
import Navigation from '../src/components/navigation/navigation';
import { Search } from '../src/components/search';

import useMyTeams from '../src/components/teams/useMyTeams';

const Index = () => {
  //const myTeams = useMyTeams([], true);

  return (
    <Layout>
      <Navigation tab={0} />
      <Search />
    </Layout>
  );
};

export default Index;
