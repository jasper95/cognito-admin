import cognito from '@/shared/cognito';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await cognito
    .adminGetUser({
      UserPoolId: process.env.AWS_USER_POOL_ID ?? '',
      Username: req.query.username as string,
    })
    .promise();

  res.json({
    ...response,
    UserCreateDate: new Date(response.UserCreateDate ?? '').toISOString(),
    UserLastModifiedDate: new Date(response.UserLastModifiedDate ?? '').toISOString()
  })
}
