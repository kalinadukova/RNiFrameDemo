import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

const PushNotifications = () => {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  return null;
};

export default PushNotifications;
