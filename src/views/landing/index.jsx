import DomainDrawer from './components/DomainDrawer/index.jsx';
import DomainTable from './components/DomainTable.jsx';
import DomainTableTools from './components/DomainTableTools.jsx';

const Landing = () => {
  return (
    <div className='flex flex-col w-full h-full p-8  overflow-hidden'>
      <h2 className='text-4xl mb-5'>Domains</h2>
      <DomainTableTools />
      <DomainTable />
      <DomainDrawer />
    </div>
  );
};

export default Landing;
