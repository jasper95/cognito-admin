import { ColumnSort, ColumnType } from '@/components/data-table/types';
import Link from '@material-ui/core/Link';
import NextLink from 'next/link'
import { format } from 'date-fns';
import {User} from '@/shared/models/user'

export const defaultSort: ColumnSort[] = [{ column: 'created_date', direction: 'desc' }];

export const data: User[] = [];
export const columns: ColumnType<User>[] = [
  {
    title: 'Username',
    type: 'function',
    fn: (user) => {
      return (
        <NextLink href={`/users/${encodeURIComponent(user.Username ?? '')}`} passHref>
          <Link color='primary'>
            {user.Username}
          </Link>
        </NextLink>
      );
    },
    sortable: false,
  },
  {
    title: 'Enabled',
    accessor: 'Enabled',
    sortable: false,
  },
  {
    title: 'Email',
    accessor: 'Username',
    sortable: false,
  },
  {
    title: 'Email Verified',
    type: 'function',
    sortable: false,
    fn: (user) => `${user.UserStatus === 'CONFIRMED'}`,
  },
  {
    title: 'Updated',
    type: 'function',
    sortable: false,
    fn: (user) => format(new Date(user.UserLastModifiedDate), 'MMM dd, yyyy hh:mm:ss a'),
  },
  {
    title: 'Created',
    type: 'function',
    sortable: false,
    fn: (user) => format(new Date(user.UserCreateDate), 'MMM dd, yyyy hh:mm:ss a'),
  },
];
