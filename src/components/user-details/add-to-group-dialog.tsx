import withDialog from '@/shared/hocs/withDialog';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { GroupListType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { IAddToGroupDialogProps } from './types';
import useSwr from 'swr'
import fetcher from '@/shared/fetcher';

function AddToGroupDialog(props: IAddToGroupDialogProps) {
  const { formProps } = props;
  const { data: userPoolGroups } = useSwr<GroupListType>('/api/groups', fetcher)
  const currentGroupNames = formProps.values.currentGroups.map(e => e.GroupName)
  return (
    <div>
      <TextField
        fullWidth
        select
        label="Group"
        placeholder="Select a group"
        value={formProps.values.group}
        onChange={formProps.handleChange}
        name="group"
        error={formProps.touched.group && Boolean(formProps.errors.group)}
        helperText={formProps.touched.group && formProps.errors.group}
      >
        {userPoolGroups?.filter(e => !currentGroupNames.includes(e.GroupName)).map((e) => (
          <MenuItem key={e.GroupName} value={e.GroupName}>{e.GroupName}</MenuItem>
        ))}
      </TextField>
    </div>
  );

}

export default withDialog(AddToGroupDialog);
