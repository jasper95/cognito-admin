import { Auth } from 'aws-amplify'

const config = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION || '',
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || '',
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_USERPOOL_CLIENT_ID || '',
};
  
export default config;
  