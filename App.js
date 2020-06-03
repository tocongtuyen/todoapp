// App.js

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/components/login';
import Signup from './src/components/signup';
import Dashboard from './src/components/dashboard';
import TaskScreen from './src/components/taskscreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      // screenOptions={{
      //   headerTitleAlign: 'center',
      //   headerStyle: {
      //     backgroundColor: '#3740FE',
      //   },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: {
      //     fontWeight: 'bold',
      //   },
      // }}
      headerMode="none">
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{title: 'Đăng ký'}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Đăng nhập', headerLeft: null}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: 'Trang chủ', headerLeft: null}}
      />
      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{title: 'Công việc'}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
