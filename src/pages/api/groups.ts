import cognito from '@/shared/cognito';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await cognito
    .listGroups({
      UserPoolId: process.env.AWS_USER_POOL_ID ?? ''
    })
    .promise();
  res.json(response?.Groups ?? [])
}
