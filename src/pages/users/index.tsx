import tableReducer, { tableInitialState } from '@/components/data-table/table-reducer';
import { useEffect, useMemo, useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import DataTable from '@/components/data-table';
import { columns } from '@/shared/constants/user-list'
import { User } from '@/shared/models/user';
import useSwr from 'swr'
import fetcher from '@/shared/fetcher';
import SearchBar from '@/components/search-bar';
import withAuthenticator from '@/shared/hocs/withAuthenticator';
import DashboardLayout from '@/components/layout/dashboard-layout';
import Breadcrumbs from '@/components/breadcrumbs';
import useSearch from '@/shared/hooks/useSearch';

function UsersListPage() {
  const { data, isValidating } = useSwr<User[]>('/api/users', fetcher)
  const [tableState, tableDispatch] = useReducer(tableReducer, tableInitialState);
  const [searchState, searchHandlers] = useSearch({ list: data, searchableFields: ['Username'] })
  const users = searchState.results

  useEffect(() => {
    tableDispatch({ type: 'SetPage', payload: tableInitialState.page })
  }, [users])

  const paginatedUsers = useMemo(() => {
    const { page, size } = tableState;
    const starting = page * size;
    const ending = starting + size;
    return users?.slice(starting, ending) ?? [];
  }, [tableState, users]);

  useEffect(() => {
    tableDispatch({ type: 'SetTotal', payload: users?.length ?? 0 })
  }, [users])

  return (
    <DashboardLayout>
      <Breadcrumbs crumbs={[{ name: 'Users' }]}/>
      <Grid className='flex justify-end pb-4' container>
        <Grid item xs={12} sm={6} md={4}>
          <SearchBar onChange={searchHandlers.onInputChange}/>
        </Grid>
      </Grid>
      <DataTable
        columns={columns}
        tableDispatch={tableDispatch}
        tableState={tableState}
        rows={paginatedUsers}
        showPagination
        loading={isValidating && !paginatedUsers.length}
      />
    </DashboardLayout>
  );
}

export default withAuthenticator(UsersListPage)