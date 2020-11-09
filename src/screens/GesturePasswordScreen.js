import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import axios from 'axios';

import {baseURL} from '../config/config';

import GesturePassword from 'react-native-simple-gesture-password';

export default function GesturePasswordScreen() {
  const [userPassword, setUserPassword] = useState(null);

  useEffect(() => {
    const getWithingsData = async () => {
      /* const {
        data: {success, data},
      } = await axios.post(
        `${baseURL}?option=com_ajax&plugin=Withings_Callback&client_id=1109&format=json`,
      );

      console.log(success);

      if (success) {
        console.log(...data);
      }*/
    };

    if (userPassword) {
      //getWithingsData();
      Actions.reset('mainFlow');
    }
  }, [userPassword]);

  return (
    <View style={{flex: 1, padding: responsiveWidth(15)}}>
      <Image
        style={{
          alignSelf: 'center',
          width: 90,
          height: 90,
        }}
        source={require('../assets/logo.png')}
        resizeMode="contain"
      />

      <GesturePassword onChange={(value) => setUserPassword(value)} />
    </View>
  );
}
