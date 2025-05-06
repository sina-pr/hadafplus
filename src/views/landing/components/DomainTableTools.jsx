import TableFilter from './TableFilter';
import { useDispatch } from 'react-redux';
import { openDomainModal } from 'store/slices/domainSlice';
import { Button } from 'components/ui';
import { IoAdd } from 'react-icons/io5';

const DomainTableTools = () => {
  const dispatch = useDispatch();

  const onAddDomainClick = () => {
    dispatch(openDomainModal());
  };

  return (
    <div className='flex flex-col lg:flex-row items-center justify-between mb-5 gap-5'>
      <div>
        <Button
          icon={<IoAdd />}
          className='min-w-50'
          onClick={onAddDomainClick}
        >
          Add Domain
        </Button>
      </div>
      <div className='flex w-full flex-col lg:flex-row items-center gap-3 justify-end'>
        <TableFilter />
      </div>
    </div>
  );
};

export default DomainTableTools;
