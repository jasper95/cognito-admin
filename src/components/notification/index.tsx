import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Notification as INotification } from '@/shared/stores/notification'

export type NotificationProps = {
  notification: INotification;
  onDismiss: (id: string) => void;
};

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction='right' />;
}

export default function Notification(props: NotificationProps) {
  const { notification, onDismiss } = props
  return (
    <Snackbar TransitionComponent={SlideTransition} open autoHideDuration={6000} onClose={() => onDismiss(notification.id)}>
      <MuiAlert onClose={() => onDismiss(notification.id)} severity={notification.type}>
        {notification.message}
      </MuiAlert>
    </Snackbar>
  )
}