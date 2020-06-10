// App.js

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/login';
import Signup from './src/screens/signup';
import Dashboard from './src/screens/dashboard';
import TaskScreen from './src/screens/taskscreen';
import Addtask from './src/screens/addtask';
import Tasklist from './src/screens/tasklist.js';

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
      <Stack.Screen
        name="Addtask"
        component={Addtask}
        options={{title: 'Thêm công việc'}}
      />
      <Stack.Screen
        name="Tasklist"
        component={Tasklist}
        options={{title: 'Danh sách công việc'}}
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
