import {getMessaging} from '@react-native-firebase/messaging';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import WebView from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
// @ts-ignore
import CookieManager from 'react-native-cookies';

const Home = () => {
  const webviewRef = useRef(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates if the component is unmounted // Function to set cookies

    const setCookies = async (fcmToken: string) => {
      try {
        const deviceId = DeviceInfo.getUniqueId(); // Define your cookie attributes

        const cookieDeviceId = {
          name: 'deviceId',
          value: deviceId,
          domain: 'igra.bg',
          path: '/',
          version: '1',
          expires: '2030-12-31T23:59:59.000Z', // Set an expiration date
          secure: true, // Ensure cookies are sent over HTTPS
          httpOnly: false, // Set to true if you don't need to access cookies via JavaScript
          sameSite: 'Lax', // Adjust based on your requirements
        };

        const cookieFcmToken = {
          name: 'fcmToken',
          value: fcmToken,
          domain: 'igra.bg',
          path: '/',
          version: '1',
          expires: '2030-12-31T23:59:59.000Z',
          secure: true,
          httpOnly: false,
          sameSite: 'Lax',
        }; // Set the cookies

        await CookieManager.set('https://igra.bg', cookieDeviceId);
        await CookieManager.set('https://igra.bg', cookieFcmToken);

        console.log('Cookies successfully set!');
      } catch (error) {
        console.error('Error setting cookies:', error);
      }
    }; // Initial setup: Get the current FCM token and set cookies

    const initialize = async () => {
      try {
        const fcmToken = await getMessaging().getToken();
        console.log('fcmToken', fcmToken);

        if (isMounted) {
          await setCookies(fcmToken);
        }
      } catch (error) {
        console.error('Error initializing FCM token:', error);
      }
    };

    initialize(); // Listen for token refresh events

    const unsubscribe = messaging().onTokenRefresh(async newToken => {
      console.log('FCM Token refreshed:', newToken);
      await setCookies(newToken); // Optionally, you can notify the WebView about the updated token

      if (webviewRef.current) {
        // @ts-ignore
        webviewRef.current.postMessage(
          JSON.stringify({type: 'FCM_TOKEN_REFRESHED', fcmToken: newToken}),
        );
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        // userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)
        //      AppleWebKit/605.1.15 (KHTML, like Gecko)
        //      Version/14.0 Mobile/15E148 Safari/604.1"
        originWhitelist={['*']}
        source={{
          html: `
          <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </head>
              <body style="margin:0;padding:0;">
                <iframe 
                  src="https://igra.bg" 
                  style="width:100%;height:100%;border:none;" 
                ></iframe>
              </body>
            </html>
          `,
        }}
      />
    </View>
  );
};

export default Home;
