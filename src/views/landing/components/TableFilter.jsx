import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'components/ui';
import { setFilterQuery, setFilterStatus } from 'store/slices/domainSlice';
import Input from '../../../components/ui/Input/Input';

const statusOptions = [
  { value: '', label: 'All', color: 'bg-gray-500' },
  { value: 'active', label: 'Active', color: 'bg-emerald-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-red-500' },
];

const TableFilter = () => {
  const dispatch = useDispatch();

  const { query, status } = useSelector((state) => state.domainUi.filter);

  const onSearchQueryChange = (event) => {
    const query = event.target.value;

    dispatch(setFilterQuery(query));
  };
  const onStatusFilterChange = (selectedOption) => {
    const newValue = selectedOption ? selectedOption.value : ''; // Default to 'All' if cleared
    dispatch(setFilterStatus(newValue));
  };
  return (
    <>
      <Select
        options={statusOptions}
        size='sm'
        className='lg:max-w-[130px] w-full'
        placeholder='Status'
        value={statusOptions.filter((option) => option.value === status)}
        onChange={onStatusFilterChange}
      />
      <Input
        className='lg:max-w-[250px] w-full '
        placeholder='Search domain...'
        value={query}
        onChange={onSearchQueryChange}
      />
    </>
  );
};

export default TableFilter;
