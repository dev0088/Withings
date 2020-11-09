/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { Router, Scene, Tabs, Stack } from 'react-native-router-flux';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';

import LoadingScreen from './src/screens/LoadingScreen';
import GesturePasswordScreen from './src/screens/GesturePasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import WithingsScreen from './src/screens/WithingsScreen';

export default function App() {
  const renderIcon = (focused, title, icon) => (
    <>
      <Image
        resizeMode="contain"
        style={{
          width: responsiveWidth(6),
          height: responsiveWidth(6),
          tintColor: focused ? 'green' : 'black',
          marginBottom: 5,
        }}
        source={icon}
      />
      <Text
        style={[
          {
            fontSize: responsiveFontSize(1.5),
            color: focused ? 'green' : 'black',
          },
        ]}>
        {title}
      </Text>
    </>
  );

  return (
    <Router>
      <Scene key="root">
        <Scene
          key="LoadingScreen"
          component={LoadingScreen}
          title="LoadingScreen"
          //initial={true}
          hideNavBar={true}
        />

        <Scene
          key="GesturePasswordScreen"
          component={GesturePasswordScreen}
          title="GesturePasswordScreen"
          hideNavBar={true}
        />

        <Tabs
          key="mainFlow"
          showLabel={false}
          tabBarPosition="bottom"
          hideNavBar
          initial={true}
          tabBarStyle={{ backgroundColor: 'white', paddingVertical: 15 }}>
          <Stack
            icon={(props) =>
              renderIcon(
                props.focused,
                'Accueil',
                require('./src/assets/tabs/home.png'),
              )
            }>
            <Scene
              key="HomeScreen"
              component={HomeScreen}
              title="HomeScreen"
              initial={true}
              hideNavBar={true}
            />
          </Stack>

          <Stack
            icon={(props) =>
              renderIcon(
                props.focused,
                'Withings',
                require('./src/assets/tabs/settings.png'),
              )
            }>
            <Scene
              key="WithingsScreen"
              component={WithingsScreen}
              title="WithingsScreen"
              initial={false}
              hideNavBar={true}
            />
          </Stack>
        </Tabs>
      </Scene>
    </Router>
  );
}
