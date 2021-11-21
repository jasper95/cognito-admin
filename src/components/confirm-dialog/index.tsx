import withDialog, { IDialogContentProps } from '@/shared/hocs/withDialog';
import Typography from '@material-ui/core/Typography';

type IConfirmPaylaod = {
  message: string;
};
type IConfirmDialogProps = IDialogContentProps<IConfirmPaylaod>;

function ConfirmDialog(props: IConfirmDialogProps) {
  const { formProps } = props;
  return (
    <div>
      <Typography variant="body1">{formProps.values.message}</Typography>
    </div>
  );
}

export default withDialog(ConfirmDialog);
