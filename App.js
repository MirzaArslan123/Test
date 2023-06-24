//================================ React Native Imported Files ======================================//
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './components/screens/Home';
import BeefCameraPage from './components/camera/Camera';
import Recipes from './components/screens/Recipes';
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraCapture from './components/screens/CameraCapture';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const ApplicationTabNavigation = createBottomTabNavigator();
const CameraStack = createStackNavigator();

function CameraStackScreen() {
  return (
    <CameraStack.Navigator headerMode={'none'}>
      <CameraStack.Screen name="Camera" component={BeefCameraPage} />
      <CameraStack.Screen name="CameraCapture" component={CameraCapture} />
    </CameraStack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <View style={styles.applicationContainer}>
        <NavigationContainer>
          <ApplicationTabNavigation.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                let iconName;
                let iconColor = focused ? '#63bbf2' : 'gray';

                if (route.name === 'Home') {
                  iconName = 'home'
                } else if (route.name === 'Camera') {
                  iconName = 'camera';
                } else if (route.name === 'Recipes') {
                  iconName = 'list'
                }

                return <Icon name={iconName} color={iconColor} size={18} />;
              },
            })}
            Options={{
              activeTintColor: 'white',
              inactiveTintColor: 'gray',
              labelStyle: styles.applicationTabNavigationTabLabel,
              style: styles.applicationTabNavigationContainer
            }}
            >
            <ApplicationTabNavigation.Screen name="Home" component={Home} />
            <ApplicationTabNavigation.Screen name="Camera" component={CameraStackScreen} options={{unmountOnBlur: true}}/>          
            <ApplicationTabNavigation.Screen name="Recipes" component={Recipes} options={{unmountOnBlur: true}}/>
          </ApplicationTabNavigation.Navigator>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  applicationContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'black'
  },
  applicationTabNavigationContainer: {
    backgroundColor: 'black',
    flex: .1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: .2,
    paddingBottom: 12
  },
  applicationTabNavigationTabLabel: {
    fontSize: 12
  }
});
