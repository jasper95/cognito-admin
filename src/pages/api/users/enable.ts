import cognito from '@/shared/cognito';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req
  const params = {
    Username: body.username,
    UserPoolId: process.env.AWS_USER_POOL_ID ?? ''
}
  if (body.enable) {
    await cognito.adminEnableUser(params).promise();
  } else {
    await cognito.adminDisableUser(params).promise();
  }
  res.json({ success: true })
}
