// components/dashboard.js

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from './headercomponent.js';
import TaskItem from './taskcomponent.js';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default class TaskScreen extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
    };
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Header
          title="Danh sách"
          iconLeft="arrow-left"
          iconRight="ellipsis1"
          onLeftPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.textStyle}>Tiêu đề</Text>
        <ScrollView>
          <TaskItem />
          <TaskItem />
        </ScrollView>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            this.showDialog();
            console.log(this.state.dialogVisible);
          }}>
          <Fontisto name="plus-a" size={30} color="gray" />
          <Text style={[styles.itemText, {marginLeft: 20, color: 'gray'}]}>
            Thêm công việc mới
          </Text>
          {/* <FontAwesome name="angle-right" size={26} color="#1e1e1e" /> */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 35,
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
    fontSize: 22,
  },
});
