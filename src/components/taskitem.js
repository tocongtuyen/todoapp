import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';

const taskitem = props => {
  return (
    <View style={[styles.taskListContent, {shadowColor: props.color}]}>
      <View
        style={{
          marginLeft: 13,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: props.color,
              marginRight: 8,
            }}
          />
          <Text
            style={{
              color: '#554A4C',
              fontSize: 20,
              fontWeight: '700',
            }}>
            {props.title}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: '#BBBBBB',
                  fontSize: 14,
                  marginRight: 5,
                }}>
                {`${moment(props.time).format('YYYY')}/${moment(
                  props.time,
                ).format('MM')}/${moment(props.time).format('DD')}`}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#BBBBBB',
                  fontSize: 14,
                  marginLeft: 20,
                }}>
                {props.notes}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 60,
          width: 5,
          backgroundColor: props.color,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default taskitem;

const styles = StyleSheet.create({
  taskListContent: {
    height: 80,
    width: 350,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
