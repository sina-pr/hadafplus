import { useState, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { FaCircle } from 'react-icons/fa';
import { Skeleton, Table } from 'components/ui';
import {
  useDeleteDomainMutation,
  useGetDomainsQuery,
} from 'services/domainApi';
import classNames from 'classnames';
import { setEditingDomain } from 'store/slices/domainSlice';

import dayjs from 'dayjs';

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const statusOptions = {
  verified: {
    label: 'Verified',
    color: 'text-green-600',
  },
  rejected: {
    label: 'Rejected',
    color: 'text-red-600',
  },
  pending: {
    label: 'Pending',
    color: 'text-yellow-600',
  },
};

const TableRowSkeleton = (props) => {
  const { columns, rows, avatarInColumns, avatarProps } = props;

  return (
    <TBody>
      {Array.from(new Array(rows), (_, i) => i + 0).map((row) => (
        <Tr key={`row-${row}`}>
          {Array.from(new Array(columns), (_, i) => i + 0).map((col) => (
            <Td key={`col-${col}`}>
              <div className='flex flex-auto items-center gap-2'>
                {avatarInColumns.includes(col) && (
                  <div>
                    <Skeleton variant='circle' {...avatarProps} />
                  </div>
                )}
                <Skeleton />
              </div>
            </Td>
          ))}
        </Tr>
      ))}
    </TBody>
  );
};

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();

  const [deleteDomain, { isLoading: isDeleting }] = useDeleteDomainMutation();

  const onEdit = (domain) => {
    console.log('Edit domain:', domain);
    dispatch(setEditingDomain(domain));
  };

  const onDelete = async (id) => {
    try {
      if (!isDeleting) {
        await deleteDomain(id).unwrap();

        console.log('Domain deleted successfully:', id);
      }
    } catch (err) {
      console.error('Failed to delete the domain:', err);
    }
  };

  return (
    <div className='flex justify-end gap-3 text-lg'>
      <span
        className={`cursor-pointer text-gray-700 hover:text-red-600`}
        onClick={() => onDelete(row.id)}
      >
        <HiOutlineTrash />
      </span>
      <span
        className={`cursor-pointer text-gray-700 hover:text-indigo-600`}
        onClick={() => onEdit(row)}
      >
        <HiOutlinePencil />
      </span>
    </div>
  );
};

const columns = [
  {
    header: 'Domain URL',
    accessorKey: 'domain',
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className={`flex flex-row items-center`}>
          <span
            className={classNames('text-gray-600 text-xs  mr-3', {
              'text-green-400': row.isActive,
              'text-red-400': !row.isActive,
            })}
          >
            <FaCircle />
          </span>
          <div className='flex flex-row items-center group hover:text-blue-700 cursor-pointer gap-1'>
            <span className='font-semibold'>{row.domain}</span>
          </div>
        </div>
      );
    },
  },

  {
    header: 'Active Status',
    accessorKey: 'isActive',
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className='flex items-center'>
          <span
            className={classNames('font-semibold', {
              'text-green-600': row.isActive,
              'text-red-600': !row.isActive,
            })}
          >
            {row.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      );
    },
  },
  {
    header: 'Verification Status',
    accessorKey: 'status',
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className={statusOptions[row?.status]?.color}>
          <span className='font-semibold'>
            {statusOptions[row?.status]?.label}
          </span>
        </div>
      );
    },
  },

  {
    header: '',
    id: 'action',
    enableSorting: true,
    cell: (props) => <ActionColumn row={props.row.original} />,
  },
];

const DomainTable = () => {
  const { data: allDomains, error, isLoading } = useGetDomainsQuery();
  const [sorting, setSorting] = useState([]);
  const statusFilterValue = useSelector(
    (state) => state.domainUi.filter.status
  );
  const queryFilterValue = useSelector((state) => state.domainUi.filter.query);

  const filteredDomains = useMemo(() => {
    if (!allDomains) {
      return []; // Return empty array if data is not yet available
    }

    let domainsToFilter = [...allDomains]; // Create a copy to avoid mutating the original cache

    if (statusFilterValue && statusFilterValue !== '') {
      const isActiveBoolean = statusFilterValue === 'active';
      console.log('Filtering by domain.isActive ===', isActiveBoolean);
      domainsToFilter = domainsToFilter.filter(
        (domain) => domain.isActive === isActiveBoolean
      );
    }

    // Apply search query filter (based on queryFilterValue)
    if (queryFilterValue && queryFilterValue.trim() !== '') {
      const lowerCaseQuery = queryFilterValue.toLowerCase().trim();
      console.log('Filtering by domain name containing:', lowerCaseQuery);
      domainsToFilter = domainsToFilter.filter((domain) =>
        domain.domain.toLowerCase().includes(lowerCaseQuery)
      );
    }

    return domainsToFilter;
  }, [allDomains, statusFilterValue, queryFilterValue]);

  const table = useReactTable({
    data: filteredDomains,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : 'text-center'
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.id === 'domain' && (
                        <Sorter sort={header.column.getIsSorted()} />
                      )}
                    </div>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </THead>
        {isLoading ? (
          <TableRowSkeleton
            rows={3}
            columns={columns.length}
            avatarInColumns={[0]}
            avatarProps={{ width: 20, height: 20 }}
          />
        ) : (
          <TBody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </TBody>
        )}
      </Table>
    </>
  );
};

export default DomainTable;
