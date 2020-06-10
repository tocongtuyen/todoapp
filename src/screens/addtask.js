import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import moment from 'moment';
import {CalendarList} from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Header from '../headercomponent.js';
const {width: vw} = Dimensions.get('window');
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from '../database/firebase';

class detailtask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: this.props.route.params.userid,
      selectedDay: {
        [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
          'DD',
        )}`]: {
          selected: true,
          selectedColor: '#2E66E7',
        },
      },
      currentDay: moment().format(),
      taskText: '',
      notesText: '',
      keyboardHeight: 0,
      visibleHeight: Dimensions.get('window').height,
      isAlarmSet: false,
      alarmTime: moment().format(),
      isDateTimePickerVisible: false,
      timeType: '',
      creatTodo: {},
      createEventAsyncRes: '',
    };
  }

  addTask() {
    if (this.state.taskname === '') {
      alert('Fill at least your name!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .firestore()
        .collection('tasks')
        .add({
          userid: this.state.userid,
          isCompleted: false,
          title: this.state.taskText,
          notes: this.state.notesText,
          // time: firebase.firestore.FieldValue.serverTimestamp(),
          time: firebase.firestore.Timestamp.fromDate(
            new Date(this.state.alarmTime),
          ),
          color: '#60CCFB',
        })
        .then(res => {
          this.props.navigation.goBack();
          this.getTaskByGroupId(this.state.userid).then(tasks => {
            this.props.route.params.onSelect({todoList: tasks});
          });
        })
        .catch(err => {
          console.error('Error found: ', err);
        });
    }
  }

  getTaskByGroupId = id => {
    return firebase
      .firestore()
      .collection('tasks')
      .where('userid', '==', id + '')
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(i => ({
          key: i.id,
          ...i.data(),
        }));
      })
      .catch(error => {
        console.log(error);
        return [];
      });
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});
  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = date => {
    const {currentDay} = this.state;
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    this.setState({
      alarmTime: newModifiedDay,
    });

    console.log(date);

    this._hideDateTimePicker();
  };

  render() {
    const {
      state: {
        selectedDay,
        currentDay,
        taskText,
        visibleHeight,
        notesText,
        isAlarmSet,
        alarmTime,
        isDateTimePickerVisible,
      },
      props: {navigation},
    } = this;

    return (
      <View style={styles.screenContainer}>
        {/* <Header
          title="Danh sách"
          iconLeft="arrow-left"
          iconRight="ellipsis1"
          onLeftPress={() => this.props.navigation.goBack()}
        /> */}
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="time"
        />
        <View style={styles.container}>
          <View
            style={{
              height: visibleHeight,
            }}>
            <View style={styles.backButton}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{marginRight: vw / 2 - 120, marginLeft: 20}}>
                <Image
                  style={{height: 25, width: 40}}
                  source={require('../assets/back.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <Text style={styles.newTask}>New Task</Text>
            </View>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 150,
              }}>
              <View style={styles.calenderContainer}>
                <CalendarList
                  style={{
                    width: 350,
                    height: 350,
                  }}
                  current={currentDay}
                  minDate={moment().format()}
                  horizontal
                  pastScrollRange={0}
                  pagingEnabled
                  calendarWidth={350}
                  onDayPress={day => {
                    this.setState(
                      {
                        selectedDay: {
                          [day.dateString]: {
                            selected: true,
                            selectedColor: '#2E66E7',
                          },
                        },
                        currentDay: day.dateString,
                        alarmTime: day.dateString,
                      },
                      () => {
                        console.log(currentDay);
                      },
                    );
                  }}
                  monthFormat="yyyy MMMM"
                  hideArrows
                  markingType="simple"
                  theme={{
                    selectedDayBackgroundColor: '#2E66E7',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#2E66E7',
                    backgroundColor: '#eaeef7',
                    calendarBackground: '#eaeef7',
                    textDisabledColor: '#d9dbe0',
                  }}
                  markedDates={selectedDay}
                />
              </View>
              <View style={styles.taskContainer}>
                <TextInput
                  style={styles.title}
                  onChangeText={text => this.setState({taskText: text})}
                  value={taskText}
                  placeholder="What do you need to do?"
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#BDC6D8',
                    marginVertical: 10,
                  }}>
                  Suggestion
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.readBook}>
                    <Text style={{textAlign: 'center', fontSize: 14}}>
                      Read book
                    </Text>
                  </View>
                  <View style={styles.design}>
                    <Text style={{textAlign: 'center', fontSize: 14}}>
                      Design
                    </Text>
                  </View>
                  <View style={styles.learn}>
                    <Text style={{textAlign: 'center', fontSize: 14}}>
                      Learn
                    </Text>
                  </View>
                </View>
                <View style={styles.notesContent} />
                <View>
                  <Text style={styles.notes}>Notes</Text>
                  <TextInput
                    style={{
                      height: 25,
                      fontSize: 19,
                      marginTop: 3,
                    }}
                    onChangeText={text => this.setState({notesText: text})}
                    value={notesText}
                    placeholder="Enter notes about the task."
                  />
                </View>
                <View style={styles.seperator} />
                <View>
                  <Text
                    style={{
                      color: '#9CAAC4',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    Times
                  </Text>
                  <TouchableOpacity
                    onPress={() => this._showDateTimePicker()}
                    style={{
                      height: 25,
                      marginTop: 3,
                    }}>
                    <Text style={{fontSize: 19}}>
                      {moment(alarmTime).format('h:mm A')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.seperator} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#9CAAC4',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Alarm
                    </Text>
                    <View
                      style={{
                        height: 25,
                        marginTop: 3,
                      }}>
                      <Text style={{fontSize: 19}}>
                        {moment(alarmTime).format('h:mm A')}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={isAlarmSet}
                    onValueChange={this.handleAlarmSet}
                  />
                </View>
              </View>
              <TouchableOpacity
                disabled={taskText === ''}
                style={[
                  styles.createTaskButton,
                  {
                    backgroundColor:
                      taskText === '' ? 'rgba(46, 102, 231,0.5)' : '#2E66E7',
                  },
                ]}
                onPress={async () => {
                  this.addTask();
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  ADD YOUR TASK
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

export default detailtask;

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 400,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 1,
    backgroundColor: '#eaeef7',
  },
});
