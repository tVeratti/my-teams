import { useState } from 'react';

import Layout from '../src/components/layout';
import Navigation from '../src/components/navigation';
import { Search } from '../src/components/search';
import { Schedule } from '../src/components/schedule';

const Index = () => {
  const [tab, setTab] = useState(0);
  return (
    <Layout>
      <Navigation tab={tab} onTabChange={setTab} />
      {tab ? <Schedule /> : <Search />}
    </Layout>
  );
};

export default Index;
