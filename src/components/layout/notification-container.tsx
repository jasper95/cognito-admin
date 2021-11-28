import { useNotificationStore } from "@/shared/stores/notification";
import Notification from "@/components/notification";

function NotificationContainer() {
  const { notifications, dismissNotification } = useNotificationStore();

  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </>
  );
}

export default NotificationContainer