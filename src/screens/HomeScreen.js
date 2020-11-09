import React, {useState} from 'react';
import {WebView} from 'react-native-webview';

import {baseURL} from '../config/config';

export default function LoginScreen() {
  const [userID, setUserID] = useState(null);

  const loginURL = `${baseURL}index.php?option=com_users&view=login&Itemid=350`;

  const onWebViewStateChange = (navState) => {
    console.log(navState);

    if (navState.url.includes('&user_id=')) {
      setUserID(navState.url.split('&user_id=')[1]);

      console.log(userID);
    }
  };

  return (
    <WebView
      source={{
        uri: loginURL,
      }}
      style={{flex: 1}}
      startInLoadingState
      scalesPageToFit
      javaScriptEnabled
      bounces={false}
      onNavigationStateChange={(navState) => onWebViewStateChange(navState)}
      javaScriptEnabledAndroid
    />
  );
}
