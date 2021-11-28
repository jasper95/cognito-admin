import withDialog from '@/shared/hocs/withDialog';
import TextField from '@material-ui/core/TextField';
import { ICreateUserDialogProps } from './types';


function CreateUserDialog(props: ICreateUserDialogProps) {
  const { formProps } = props;
  return (
    <div className='grid gap-4 py-4'>
      <TextField
        fullWidth
        label="Email"
        value={formProps.values.email}
        onChange={formProps.handleChange}
        name="email"
        variant='outlined'
        error={formProps.touched.email && Boolean(formProps.errors.email)}
        helperText={formProps.touched.email && formProps.errors.email}
      />
      <TextField
        fullWidth
        label="Temporary password"
        type='password'
        value={formProps.values.password}
        onChange={formProps.handleChange}
        name="password"
        variant='outlined'
        error={formProps.touched.password && Boolean(formProps.errors.password)}
        helperText={formProps.touched.password && formProps.errors.password}
      />
    </div>
  );

}

export default withDialog(CreateUserDialog);
