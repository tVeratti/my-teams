import { useState } from 'react';

import { Search } from '../src/components/search';
import { Schedule } from '../src/components/schedule';
import Navigation from '../src/components/navigation';

const Index = () => {
  const [tab, setTab] = useState(0);

  return (
    <React.Fragment>
      <Navigation tab={tab} onTabChange={setTab} />
      {tab ? <Schedule /> : <Search />}
    </React.Fragment>
  );
};

export default Index;
