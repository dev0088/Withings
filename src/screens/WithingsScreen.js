import React, {useState, useEffect} from 'react';
import {NativeModules} from 'react-native';
import {WebView} from 'react-native-webview';

import {SafeAreaView} from 'react-native';
import axios from 'axios';

import {
  client_id,
  client_secret,
  baseURL,
  withingsAuthUrl,
  withingsTokenUrl,
  redirect_uri,
} from '../config/config';

export default function LoginScreen() {
  const [currentUrl, setCurrentUrl] = useState(null);

  useEffect(() => {
    const createUrl = async () => {
      const external_id = '17633015';
      const preflang = 'en_US';
      const shortname = 'abc';
      const gender = '0';

      const result = await axios.post(`http://192.168.0.123:8888/index.php`);

      setCurrentUrl(result.data);

      console.log(NativeModules.bridgeWithings);
    };

    createUrl();
  }, []);

  const onWebViewStateChange = async (navState) => {
    //console.log(navState);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {currentUrl && (
        <WebView
          source={{
            uri: currentUrl,
          }}
          onNavigationStateChange={(navState) => onWebViewStateChange(navState)}
        />
      )}
    </SafeAreaView>
  );
}
