import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_USER_POOL_REGION,
  accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
});

export default cognito;
