// components/dashboard.js

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const RightActions = ({progress, dragX, onPress}) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rightAction}>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
          <AntDesign name="delete" size={25} color="#fff" />
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const TaskComponent = ({
  name,
  iscompleted,
  time,
  onRightPress,
  onClick,
  onCheckStatus,
  color,
}) => {
  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={onRightPress}
        />
      )}>
      <View style={[styles.row, {backgroundColor: `${color}`}]}>
        {/* <Icon
        name={isCompleted ? 'checkmark-circle' : 'radio-button-off'}
        style={{paddingLeft: 10, color: '#1e88e5'}}
      /> */}
        <TouchableOpacity onPress={onCheckStatus}>
          <MaterialIcons
            name={iscompleted ? 'check-circle' : 'radio-button-unchecked'}
            size={30}
            color={'black'}
            style={{width: 32, marginLeft: 10}}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row_cell_timeplace} onPress={onClick}>
          <Text
            style={[
              styles.row_place,
              ,
              {
                textDecorationLine: !iscompleted ? 'none' : 'line-through',
                color: !iscompleted ? 'black' : 'gray',
              },
            ]}>
            {name}
          </Text>
          <Text
            style={[styles.row_time, {color: !iscompleted ? 'black' : 'gray'}]}>
            {time.toDate().toLocaleString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          {/* <FontAwesome
            name={isimportant ? 'star' : 'star-o'}
            size={30}
            color={'#1e88e5'}
            style={{width: 32, marginLeft: 10}}
          /> */}
        </TouchableOpacity>
      </View>
    </Swipeable>
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
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginBottom: 6,
    marginRight: 14,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default TaskComponent;
