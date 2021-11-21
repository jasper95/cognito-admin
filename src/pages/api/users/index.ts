import cognito from '@/shared/cognito';
import { User } from '@/shared/models/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { ListUsersRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let users: User[] = [];
  let more = true;
  let paginationToken = '';
  while (more) {
    let params: ListUsersRequest = {
      UserPoolId: process.env.AWS_USER_POOL_ID ?? '',
      Limit: 60,
    };
    if (paginationToken !== '') {
      params.PaginationToken = paginationToken;
    }

    const rawUsers = await cognito.listUsers(params).promise();
    users = users.concat(rawUsers.Users?.map(e => ({
      ...e, id: e.Username ?? '',
      UserCreateDate: new Date(e.UserCreateDate ?? '').toISOString(),
      UserLastModifiedDate: new Date(e.UserLastModifiedDate ?? '').toISOString()
    })) ?? []);
    if (rawUsers.PaginationToken) {
      paginationToken = rawUsers.PaginationToken;
    } else {
      more = false;
    }
  }
  res.json(users)
}
