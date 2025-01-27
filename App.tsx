import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import PushNotifications from './src/components/PushNotifications';
import Home from './src/containers/Home';

function App() {
  useEffect(() => {
    (async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash hidden');
    })();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <PushNotifications />
      <Home />
    </SafeAreaView>
  );
}

export default App;
