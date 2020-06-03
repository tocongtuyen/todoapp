// components/dashboard.js

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const isCompleted = false;
const TaskComponent = () => {
  return (
    <View style={styles.row}>
      {/* <Icon
        name={isCompleted ? 'checkmark-circle' : 'radio-button-off'}
        style={{paddingLeft: 10, color: '#1e88e5'}}
      /> */}
      <MaterialIcons
        name={isCompleted ? 'check-circle' : 'radio-button-unchecked'}
        size={30}
        color={'#1e88e5'}
        style={{width: 32, marginLeft: 10}}
      />

      <View style={styles.row_cell_timeplace}>
        <Text style={styles.row_place}>công việc</Text>
        <Text style={styles.row_time}>giờ</Text>
      </View>

      <FontAwesome
        name={isCompleted ? 'star' : 'star-o'}
        size={30}
        color={'#1e88e5'}
        style={{width: 32, marginLeft: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    elevation: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    // flex: 1,
    flexDirection: 'row', // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 18,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6,
  },
  row_cell_timeplace: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 12,
  },
  row_time: {
    color: '#464646',
    textAlignVertical: 'bottom',
    includeFontPadding: false,
    flex: 0,
    fontSize: 15,
  },
  row_place: {
    color: '#464646',
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 25,
  },
});

export default TaskComponent;
