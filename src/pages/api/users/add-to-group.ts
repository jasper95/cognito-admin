import cognito from '@/shared/cognito';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req
  const response = await cognito
      .adminAddUserToGroup({
        Username: body.username,
        GroupName: body.group,
        UserPoolId: process.env.AWS_USER_POOL_ID ?? ''
      })
      .promise();
  res.json(response)
}
