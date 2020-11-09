import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';
import {createUrl} from './encrypt';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

function MainScreen() {
  const [currentUrl, setCurrentUrl] = useState(
    'https://developer.withings.com/sdk/#/?id=webviews',
  );

  useEffect(() => {
    createUrl().then((newUrl) => {
      console.log('====== newUrl: ', newUrl);
      if (newUrl) {
        setCurrentUrl(newUrl);
      }
    });
  }, []);

  return (
    <WebView
      source={{uri: currentUrl}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    backgroundColor: Colors.black,
    flex: 1,
  },
});

export default MainScreen;
