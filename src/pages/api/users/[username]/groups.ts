import cognito from '@/shared/cognito';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query
  const response =  await cognito
    .adminListGroupsForUser({
      UserPoolId: process.env.AWS_USER_POOL_ID ?? '',
      Username: username as string,
    })
    .promise()
  res.json(response.Groups ?? [])
}
