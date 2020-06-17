import React, { Component } from 'react'
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
} from 'react-native'
import moment from 'moment'
import { CalendarList } from 'react-native-calendars'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import Header from '../headercomponent.js';
const { width: vw } = Dimensions.get('window')
import DateTimePicker from 'react-native-modal-datetime-picker'
import firebase from '../database/firebase'

class detailtask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: this.props.route.params.userid,
            selectedDay: {
                [`${moment().format('YYYY')}-${moment().format(
                    'MM'
                )}-${moment().format('DD')}`]: {
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
            color: { colorLeft: '#979CA2', colorRight: '#E7E7EA' },
        }
    }

    addTask() {
        if (this.state.taskname === '') {
            alert('Fill at least your name!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .firestore()
                .collection('tasks')
                .add({
                    userid: this.state.userid,
                    isCompleted: false,
                    title: this.state.taskText,
                    notes: this.state.notesText,
                    time: firebase.firestore.Timestamp.fromDate(
                        new Date(this.state.alarmTime)
                    ),
                    color: this.state.color,
                    session: 1,
                })
                .then((res) => {
                    this.props.navigation.goBack()
                    // this.getTaskByGroupId(this.state.userid).then(tasks => {
                    //   this.props.route.params.onSelect({todoList: tasks});
                    // });
                })
                .catch((err) => {
                    console.error('Error found: ', err)
                })
        }
    }

    getTaskByGroupId = (id) => {
        return firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .get()
            .then((querySnapshot) => {
                return querySnapshot.docs.map((i) => ({
                    key: i.id,
                    ...i.data(),
                }))
            })
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    handleAlarmSet = () => {
        const { isAlarmSet } = this.state
        this.setState({
            isAlarmSet: !isAlarmSet,
        })
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })
    _hideDateTimePicker = () =>
        this.setState({ isDateTimePickerVisible: false })

    _handleDatePicked = (date) => {
        const { currentDay } = this.state
        const selectedDatePicked = currentDay
        const hour = moment(date).hour()
        const minute = moment(date).minute()
        const newModifiedDay = moment(selectedDatePicked)
            .hour(hour)
            .minute(minute)

        this.setState({
            alarmTime: newModifiedDay,
        })

        console.log(date)

        this._hideDateTimePicker()
    }

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
            props: { navigation },
        } = this

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
                        }}
                    >
                        <View style={styles.backButton}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                                style={{
                                    marginRight: vw / 2 - 120,
                                    marginLeft: 20,
                                }}
                            >
                                <Image
                                    style={{ height: 25, width: 40 }}
                                    source={require('../assets/back.png')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                            <Text style={styles.newTask}>Thêm công việc</Text>
                        </View>
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: 30,
                            }}
                        >
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
                                    onDayPress={(day) => {
                                        this.setState(
                                            {
                                                selectedDay: {
                                                    [day.dateString]: {
                                                        selected: true,
                                                        selectedColor:
                                                            '#2E66E7',
                                                    },
                                                },
                                                currentDay: day.dateString,
                                                alarmTime: day.dateString,
                                            },
                                            () => {
                                                console.log(currentDay)
                                            }
                                        )
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
                                    onChangeText={(text) =>
                                        this.setState({ taskText: text })
                                    }
                                    value={taskText}
                                    placeholder="Nhập công việc cần làm"
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#BDC6D8',
                                        marginVertical: 10,
                                    }}
                                >
                                    Chọn màu
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.mauvang}
                                        onPress={() =>
                                            this.setState({
                                                color: {
                                                    colorLeft: '#E7B94B',
                                                    colorRight: '#FFEFCB',
                                                },
                                            })
                                        }
                                    ></TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.mauxanh}
                                        onPress={() =>
                                            this.setState({
                                                color: {
                                                    colorLeft: '#55B053',
                                                    colorRight: '#CFEECC',
                                                },
                                            })
                                        }
                                    ></TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.maulam}
                                        onPress={() =>
                                            this.setState({
                                                color: {
                                                    colorLeft: '#2EBEBD',
                                                    colorRight: '#C0F2F6',
                                                },
                                            })
                                        }
                                    ></TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.maucham}
                                        onPress={() =>
                                            this.setState({
                                                color: {
                                                    colorLeft: '#5C8AD0',
                                                    colorRight: '#D2E2FC',
                                                },
                                            })
                                        }
                                    ></TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.mautim}
                                        onPress={() =>
                                            this.setState({
                                                color: {
                                                    colorLeft: '#8273D1',
                                                    colorRight: '#E0DAFE',
                                                },
                                            })
                                        }
                                    ></TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.mauhong}
                                        onPress={() =>
                                            this.setState({
                                                color: {
                                                    colorLeft: '#B684DE',
                                                    colorRight: '#F1DDFF',
                                                },
                                            })
                                        }
                                    ></TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.maudo}
                                        onPress={() =>
                                            this.setState({
                                                color: {
                                                    colorLeft: '#B23435',
                                                    colorRight: '#F2C4C1',
                                                },
                                            })
                                        }
                                    ></TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.mauxam}
                                        onPress={() =>
                                            this.setState({
                                                color: {
                                                    colorLeft: '#979CA2',
                                                    colorRight: '#E7E7EA',
                                                },
                                            })
                                        }
                                    ></TouchableOpacity>
                                </View>
                                <View style={styles.notesContent} />
                                <View>
                                    <Text style={styles.notes}>Ghi chú</Text>
                                    <TextInput
                                        style={{
                                            height: 25,
                                            fontSize: 19,
                                            marginTop: 3,
                                        }}
                                        onChangeText={(text) =>
                                            this.setState({ notesText: text })
                                        }
                                        value={notesText}
                                        placeholder="Nhập ghi chú cho công việc."
                                    />
                                </View>
                                <View style={styles.seperator} />
                                <View>
                                    <Text
                                        style={{
                                            color: '#9CAAC4',
                                            fontSize: 16,
                                            fontWeight: '600',
                                        }}
                                    >
                                        Bắt đầu làm
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this._showDateTimePicker()
                                        }
                                        style={{
                                            height: 25,
                                            marginTop: 3,
                                        }}
                                    >
                                        <Text style={{ fontSize: 19 }}>
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
                                    }}
                                >
                                    <View>
                                        <Text
                                            style={{
                                                color: '#9CAAC4',
                                                fontSize: 16,
                                                fontWeight: '600',
                                            }}
                                        >
                                            Nhắc nhở
                                        </Text>
                                        <View
                                            style={{
                                                height: 25,
                                                marginTop: 3,
                                            }}
                                        >
                                            <Text style={{ fontSize: 19 }}>
                                                {moment(alarmTime).format(
                                                    'h:mm A'
                                                )}
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
                                            taskText === ''
                                                ? 'rgba(46, 102, 231,0.5)'
                                                : '#2E66E7',
                                    },
                                ]}
                                onPress={async () => {
                                    this.addTask()
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: 'center',
                                        color: '#fff',
                                    }}
                                >
                                    Thêm công việc
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

export default detailtask

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
    mautim: {
        height: 30,
        width: 30,
        backgroundColor: '#8273D1',
        justifyContent: 'center',
        borderRadius: 15,
    },
    mauhong: {
        height: 30,
        width: 30,
        backgroundColor: '#B684DE',
        justifyContent: 'center',
        borderRadius: 15,
    },
    mauxanh: {
        height: 30,
        width: 30,
        backgroundColor: '#55B053',
        justifyContent: 'center',
        borderRadius: 15,
    },
    maucham: {
        height: 30,
        width: 30,
        backgroundColor: '#5C8AD0',
        justifyContent: 'center',
        borderRadius: 15,
    },
    maudo: {
        height: 30,
        width: 30,
        backgroundColor: '#B23435',
        justifyContent: 'center',
        borderRadius: 15,
    },
    mauvang: {
        height: 30,
        width: 30,
        backgroundColor: '#E7B94B',
        justifyContent: 'center',
        borderRadius: 15,
    },
    maulam: {
        height: 30,
        width: 30,
        backgroundColor: '#2EBEBD',
        justifyContent: 'center',
        borderRadius: 15,
    },
    mauxam: {
        height: 30,
        width: 30,
        backgroundColor: '#979CA2',
        justifyContent: 'center',
        borderRadius: 15,
    },
    title: {
        height: 25,
        // borderColor: '#5DD976',
        // borderLeftWidth: 1,
        // paddingLeft: 8,
        fontSize: 19,
    },
    taskContainer: {
        // height: 600,
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
        marginTop: 10,
        width: 350,
        height: 350,
        alignSelf: 'center',
    },
    newTask: {
        alignSelf: 'center',
        fontSize: 20,
        // width: 120,
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
})
