import { addToGroupSchema, UserDetails } from '@/shared/models/user'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';
import { GroupListType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import useSwr from 'swr'
import { useRouter } from "next/dist/client/router";
import dynamic from 'next/dynamic'
import { useDialogStore } from "@/shared/stores/dialog";
import { IGroupPayload } from "@/components/user-details/types";
import fetcher from '@/shared/fetcher';
import withAuthenticator from '@/shared/hocs/withAuthenticator';
import DashboardLayout from '@/components/layout/dashboard-layout';
import Breadcrumbs from '@/components/breadcrumbs';
import ErrorPage from '@/components/error-page';
import { useNotificationStore } from '@/shared/stores/notification';


const AddToGroupDialog = dynamic(() => import('@/components/user-details/add-to-group-dialog'));
const ConfirmDialog = dynamic(() => import('@/components/confirm-dialog'));

function UserDetailsPage() {
  const router = useRouter()
  const { showDialog, toggleDialogLoading, hideDialog } = useDialogStore()
  const username = router.query.username as string | null
  const { data: user, isValidating, mutate } = useSwr<UserDetails>(() => username ? `/api/users/${decodeURIComponent(username)}` : null, fetcher)
  const { data: groups = [], mutate: mutateGroups } = useSwr<GroupListType>(username ? `/api/users/${decodeURIComponent(username)}/groups` : null, fetcher)
  const isLoading = isValidating && !user
  const { addNotification } = useNotificationStore()
  
  if(!user && !isValidating) {
    return <ErrorPage title='Not found' statusCode={400} />
  }

  return (
    <DashboardLayout>
      <Breadcrumbs crumbs={[{ name: 'Users' }, { name: 'User Details'}]}/>
      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {!isLoading && user && (
        <div>
          <Box display="flex" py={2}>
            <Box pr={1}>
              <Button variant="outlined" onClick={onClickAddToGroup}>
                Add to group
              </Button>
            </Box>
            {user?.Enabled && (

              <Box pr={1}>
                <Button variant="outlined" onClick={onClickResetPassword}>
                  Reset password
                </Button>
              </Box>
            )}
            <Box pr={1}>
              <Button color="secondary" variant="contained" onClick={onClickToggleEnable}>
                {user?.Enabled ? 'Disable User' : 'Enable User'}
              </Button>
            </Box>
          </Box>
          <Paper>
            <Box py={2} pl={10} display="flex" flexDirection="column">
              <PropertyDisplay key={1} label="Groups" value={getUserGroupsDisplay()} />
              <PropertyDisplay key={2} label="Account Status" value={getUserStatus()} />
              <PropertyDisplay
                key={3}
                label="Last modified"
                value={format(new Date(user.UserLastModifiedDate), 'MMM dd, yyyy hh:mm:ss a')}
              />
              <PropertyDisplay
                key={4}
                label="Created"
                value={format(new Date(user.UserCreateDate), 'MMM dd, yyyy hh:mm:ss a')}
              />
              {user?.UserAttributes?.map((e) => (
                <PropertyDisplay key={e.Name} label={e.Name} value={e.Value ?? ''} />
              ))}
            </Box>
          </Paper>
        </div>
      )}
    </DashboardLayout>
  )

  function onClickAddToGroup() {
    showDialog({
      component: AddToGroupDialog,
      props: {
        title: 'Add user to group',
        initialValues: {
          group: '',
          currentGroups: groups
        },
        validationSchema: addToGroupSchema,
        onValid: onAddToGroup,
      },
    });
  }

  function onClickToggleEnable() {
    const title = user?.Enabled ? 'Disable user' : 'Enable User';
    const message = user?.Enabled
      ? 'Are you sure you want to disable this user?'
      : 'Are you sure you want to enable this user?';
    showDialog({
      component: ConfirmDialog,
      props: {
        title,
        initialValues: {
          message,
        },
        onContinue: onToggleEnableDisabled,
      },
    });
  }

  function onClickResetPassword() {
    showDialog({
      component: ConfirmDialog,
      props: {
        title: 'Reset user password',
        initialValues: {
          message: "Are you sure you want to reset this user's password?",
        },
        onContinue: onResetUserPassword,
      },
    });
  }

  async function onToggleEnableDisabled() {
    toggleDialogLoading();
    const enable = !user?.Enabled
    await fetch('/api/users/enable', {
      body: JSON.stringify({
        username: user?.Username,
        enable
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    mutate({
      ...user as UserDetails,
      Enabled: !user?.Enabled,
    }, false)
    hideDialog();
    addNotification({ message: enable ? 'User successfully enabled' : 'User successfully disabled', type: 'success' })
  }

  async function onAddToGroup(data: IGroupPayload) {
    toggleDialogLoading();
    await fetch('/api/users/add-to-group', {
      body: JSON.stringify({
        username: user?.Username,
        group: data.group,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    mutateGroups(undefined, true)
    hideDialog();
    addNotification({ message: 'User successfully added to group', type: 'success' })
  }

  async function onResetUserPassword() {
    toggleDialogLoading();
    await fetch('/api/users/reset-password', {
      body: JSON.stringify({
        username: user?.Username,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    mutate(undefined, true)
    hideDialog();
    addNotification({ message: 'Password reset successfully required for user', type: 'success' })
  }

  function getUserGroupsDisplay() {
    const display = groups?.map((e) => e.GroupName)?.join(', ');
    if (display === '') {
      return '-';
    }
    return display;
  }

  function getUserStatus() {
    if (user) {
      const enabledStatus = user.Enabled ? 'Enabled' : 'Disabled';
      return `${enabledStatus} / ${user.UserStatus}`;
    }
    return '';
  }
}

type IPropertyDisplayProps = {
  label: string;
  value: string;
};
function PropertyDisplay(props: IPropertyDisplayProps) {
  return (
    <Grid container spacing={2}>
      <Grid container justifyContent="flex-end" alignItems="center" item xs={3} lg={2}>
        <Typography align="right" variant="h6">
          {props.label}
        </Typography>
      </Grid>
      <Grid container alignItems="center" item xs={9} lg={10}>
        <Typography variant="body1">{props.value}</Typography>
      </Grid>
    </Grid>
  );
}


export default withAuthenticator(UserDetailsPage)