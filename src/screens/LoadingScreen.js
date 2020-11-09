import React from 'react';
import {ActivityIndicator, View} from 'react-native-webview';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export default function LoadingScreen() {
  return (
    <View>
      <ActivityIndicator
        color={'green'}
        style={{
          position: 'absolute',
          top: responsiveHeight(40),
          alignSelf: 'center',
          zIndex: 10,
        }}
        size="large"
      />
    </View>
  );
}
