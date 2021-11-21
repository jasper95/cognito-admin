import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { Auth, Hub,  } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { ErrorProps } from 'next/error'
import ErrorPage from '@/components/error-page';

function withAuthenticator<T>(WrappedComponent: React.FC<T>) {
  function App(props: T) {
    const [user, updateUser] = React.useState<CognitoUserSession | null>(null);
    const [error, setError] = React.useState<ErrorProps | null>(null)
    React.useEffect(() => {
      Auth.currentSession()
        .then((user) => {
          const payload = user.getAccessToken().decodePayload();
          if(!payload?.['cognito:groups']?.includes('Admin')) {
            setError({ statusCode: 403, title: 'You are not authorized to access this app' })
          }
          updateUser(user)
        })
        .catch(() => console.log('No signed in user.'));
      Hub.listen('auth', (data) => {
        switch (data.payload.event) {
          case 'signIn':
            return updateUser(data.payload.data);
          case 'signOut':
            return updateUser(null);
        }
      });
    }, []);
    if(error) {
      return <ErrorPage {...error}/>
    }
    if (user) {
      return <WrappedComponent {...props} />;
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignUp
            usernameAlias="email"
            slot="sign-up"
            formFields={[
              { type: 'email' },
              {
                type: 'password',
              },
            ]}
          />
        </AmplifyAuthenticator>
      </div>
    );
  }
  return App;
}

export default withAuthenticator;
