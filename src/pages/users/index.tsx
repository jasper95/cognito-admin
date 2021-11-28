import tableReducer, { tableInitialState } from '@/components/data-table/table-reducer';
import { useEffect, useMemo, useReducer } from 'react';
import DataTable from '@/components/data-table';
import { columns } from '@/shared/constants/user-list'
import { createUserSchema, ICreateUser, User } from '@/shared/models/user';
import useSwr from 'swr'
import fetcher from '@/shared/fetcher';
import SearchBar from '@/components/search-bar';
import withAuthenticator from '@/shared/hocs/withAuthenticator';
import DashboardLayout from '@/components/layout/dashboard-layout';
import Breadcrumbs from '@/components/breadcrumbs';
import useSearch from '@/shared/hooks/useSearch';
import Button from '@material-ui/core/Button';
import dynamic from 'next/dynamic';
import { useDialogStore } from '@/shared/stores/dialog';
import { useNotificationStore } from '@/shared/stores/notification';
import { useRouter } from 'next/dist/client/router';

const CreateUserDialog = dynamic(() => import('@/components/user-details/create-user-dialog'));

function UsersListPage() {
  const router = useRouter()
  const {addNotification} = useNotificationStore()
  const { data, isValidating, mutate } = useSwr<User[]>('/api/users', fetcher)
  const [tableState, tableDispatch] = useReducer(tableReducer, tableInitialState);
  const [searchState, searchHandlers] = useSearch({ list: data, searchableFields: ['Username'] })
  const users = searchState.results

  const { showDialog, toggleDialogLoading, hideDialog } = useDialogStore()
  
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
      <div className='grid grid-cols-12 gap-4 pb-4'>
        <div className='col-span-full md:col-span-4 flex items-center'>
          <Button variant='contained' color='primary' onClick={onClickCreateUser}>
            Create User
          </Button>
        </div>
        <div className='col-span-full col-start-0 md:col-span-4 md:col-start-9'>
          <SearchBar onChange={searchHandlers.onInputChange}/>
        </div>
      </div>
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

  function onClickCreateUser() {
    showDialog({
      component: CreateUserDialog,
      props: {
        title: 'Create User',
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: createUserSchema,
        onValid: onCreate,
      },
    });
  }

  async function onCreate(data: ICreateUser) {
    toggleDialogLoading();
    const response = await fetch('/api/users', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    mutate(undefined, true)
    hideDialog();
    addNotification({ message: 'User successfully created', type: 'success' })
    router.push(`/users/${response?.User?.Username}`)
  }
}

export default withAuthenticator(UsersListPage)