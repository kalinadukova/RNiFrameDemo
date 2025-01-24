import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import Home from './src/containers/Home';
import PushNotifications from './src/components/PushNotifications';

function App() {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <PushNotifications />
      <Home />
    </SafeAreaView>
  );
}

export default App;
