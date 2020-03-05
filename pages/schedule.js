import Layout from '../src/components/layout';
import Navigation from '../src/components/navigation/navigation';
import { Schedule } from '../src/components/schedule';

const Index = () => {
  return (
    <Layout>
      <Navigation tab={1} />
      <Schedule />
    </Layout>
  );
};

export default Index;
