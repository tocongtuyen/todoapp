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
    SafeAreaView,
    FlatList,
} from 'react-native'
import moment from 'moment'
import { CalendarList } from 'react-native-calendars'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Header from '../headercomponent.js';
const { width: vw } = Dimensions.get('window')
import DateTimePicker from 'react-native-modal-datetime-picker'
import firebase from '../database/firebase'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import ActionSheet from 'react-native-actionsheet'

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
            time: moment().format(),
            alarmTime: moment().format(),
            isDateTimePickerVisible: false,
            isDateTimePickerAlarmTimeVisible: false,
            timeType: '',
            creatTodo: {},
            createEventAsyncRes: '',
            arrColor: [],
            colors: { label: '', color: '#FFF' },
            colorid: '',
            keyColorCurrent: '',
        }
    }

    checkHour() {
        let tamp = new Date(this.state.time).getHours()
        console.log(tamp)
        if (tamp < 11) {
            return 1
        } else if (tamp >= 11 && tamp < 16) {
            return 2
        } else {
            return 3
        }
    }

    addTask() {
        if (this.state.colorid === '') {
            Alert.alert('Thông báo', 'Hãy chọn một màu')
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
                        new Date(this.state.time)
                    ),
                    alarmTime: firebase.firestore.Timestamp.fromDate(
                        new Date(this.state.alarmTime)
                    ),
                    isAlarmSet: this.state.isAlarmSet,
                    session: this.checkHour(),
                    colorid: this.state.colorid,
                    colorCurrent: '#FFF',
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

    getAllColor = (id) => {
        firebase
            .firestore()
            .collection('colors')
            .where('userid', '==', id + '')
            .onSnapshot((querySnapshot) => {
                let arr = []
                querySnapshot.forEach(function (doc) {
                    arr.push({ key: doc.id, data: doc.data(), ...doc.data() })
                })
                console.log(arr)
                this.setState({ arrColor: arr })
            })
    }

    deleteColor = (key) => {
        const dbRef = firebase.firestore().collection('colors').doc(key)
        dbRef.delete().then((res) => {
            // this.props.navigation.goBack()
        })
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

    getTaskByColorId = (id) => {
        return firebase
            .firestore()
            .collection('tasks')
            .where('colorid', '==', id + '')
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

        let currentTime = new Date(moment().format()).getTime()
        let selectime = new Date(date).getTime()
        console.log(currentTime - selectime)

        if (selectime < currentTime) {
            this.setState({
                time: moment().format(),
                alarmTime: moment().format(),
            })
        } else {
            this.setState({
                time: newModifiedDay,
                alarmTime: newModifiedDay,
            })
        }

        this._hideDateTimePicker()
    }

    _showDateTimePicker1 = () =>
        this.setState({ isDateTimePickerAlarmTimeVisible: true })
    _hideDateTimePicker1 = () =>
        this.setState({ isDateTimePickerAlarmTimeVisible: false })

    _handleDatePicked1 = (date) => {
        const { currentDay } = this.state
        const selectedDatePicked = currentDay
        const hour = moment(date).hour()
        const minute = moment(date).minute()
        const newModifiedDay = moment(selectedDatePicked)
            .hour(hour)
            .minute(minute)

        let doTime = new Date(this.state.time).getTime()
        let alarmTime = new Date(date).getTime()

        if (doTime < alarmTime) {
            this.setState({
                alarmTime: this.state.time,
                isAlarmSet: true,
            })
        } else {
            this.setState({
                alarmTime: newModifiedDay,
                isAlarmSet: true,
            })
        }

        console.log(date)

        this._hideDateTimePicker1()
    }

    componentDidMount() {
        this.getAllColor(this.state.userid)
        // console.log(new Date().getHours())
        // this.refreshTask();
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
                time,
                alarmTime,
                isDateTimePickerVisible,
                isDateTimePickerAlarmTimeVisible,
            },
            props: { navigation },
        } = this

        return (
            <SafeAreaView>
                <View style={styles.screenContainer}>
                    <ActionSheet
                        ref={(o) => (this.ActionSheet = o)}
                        title={'Dữ liệu sẽ bị xoá vĩnh viễn!'}
                        options={['Xoá công việc', 'Huỷ bỏ']}
                        cancelButtonIndex={1}
                        destructiveButtonIndex={0}
                        onPress={(index) => {
                            if (index == 0) {
                                this.getTaskByColorId(
                                    this.state.keyColorCurrent
                                ).then((task) => {
                                    if (task.length == 0) {
                                        this.deleteColor(
                                            this.state.keyColorCurrent
                                        )
                                    } else {
                                        Alert.alert(
                                            'Thông báo',
                                            'Màu này không thể xoá được',
                                            [
                                                {
                                                    text: 'OK',
                                                    onPress: () =>
                                                        console.log(
                                                            'OK Pressed'
                                                        ),
                                                },
                                            ],
                                            { cancelable: false }
                                        )
                                    }
                                })
                            }
                        }}
                    />
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
                        date={new Date(moment(this.state.time).add(0, 'hours'))}
                        mode="time"
                    />
                    <DateTimePicker
                        isVisible={isDateTimePickerAlarmTimeVisible}
                        onConfirm={this._handleDatePicked1}
                        onCancel={this._hideDateTimePicker1}
                        date={
                            new Date(moment(this.state.time).add(-1, 'hours'))
                        }
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
                                    onPress={() =>
                                        this.props.navigation.goBack()
                                    }
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

                                <Text style={styles.newTask}>
                                    Thêm công việc
                                </Text>
                                <View></View>
                            </View>
                            <ScrollView
                                contentContainerStyle={{
                                    paddingBottom: 70,
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
                                                    time: day.dateString,
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
                                            selectedDayBackgroundColor:
                                                '#2E66E7',
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
                                    <Text
                                        style={{
                                            color: '#9CAAC4',
                                            fontSize: 16,
                                            fontWeight: '600',
                                            marginVertical: 10,
                                        }}
                                    >
                                        Tên công việc
                                    </Text>
                                    <TextInput
                                        style={styles.title}
                                        onChangeText={(text) =>
                                            this.setState({ taskText: text })
                                        }
                                        value={taskText}
                                        placeholder="Nhập công việc cần làm"
                                        autoFocus={true}
                                    />
                                    <View style={styles.seperator} />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#BDC6D8',
                                            marginVertical: 5,
                                        }}
                                    >
                                        Chọn màu
                                    </Text>
                                    <View
                                        style={
                                            {
                                                // flexDirection: 'row',
                                                // justifyContent: 'space-between',
                                            }
                                        }
                                    >
                                        <FlatList
                                            data={this.state.arrColor}
                                            renderItem={({ item, index }) => (
                                                <View
                                                    style={{
                                                        marginBottom: 10,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.mauvang,
                                                            {
                                                                backgroundColor:
                                                                    item.color,
                                                            },
                                                        ]}
                                                        onPress={() =>
                                                            this.setState(
                                                                {
                                                                    colorid:
                                                                        item.key,
                                                                    colorCurrent:
                                                                        item.color,
                                                                },
                                                                () => {
                                                                    console.log(
                                                                        this
                                                                            .state
                                                                            .colorid
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    ></TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{
                                                            flex: 1,
                                                            backgroundColor:
                                                                item.color,
                                                            padding: 5,
                                                            marginRight: 5,
                                                        }}
                                                        onPress={() => {
                                                            this.props.navigation.navigate(
                                                                'UpdateColor',
                                                                {
                                                                    id:
                                                                        item.key,
                                                                    data:
                                                                        item.data,
                                                                }
                                                            )
                                                        }}
                                                    >
                                                        <Text>
                                                            {item.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {/* <TouchableOpacity
                                                        onPress={() => {
                                                            this.setState({
                                                                keyColorCurrent:
                                                                    item.key,
                                                            })
                                                            this.ActionSheet.show()
                                                        }}
                                                    >
                                                        <Feather
                                                            name="delete"
                                                            size={26}
                                                            color="red"
                                                        />
                                                    </TouchableOpacity> */}
                                                </View>
                                            )}
                                            keyExtractor={(item) => item.key}
                                        />
                                        <View
                                            style={{
                                                marginBottom: 10,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={[
                                                    styles.maudo,
                                                    {
                                                        backgroundColor: '#FFF',
                                                    },
                                                ]}
                                                onPress={() => {
                                                    this.props.navigation.navigate(
                                                        'AddColor'
                                                    )
                                                }}
                                            >
                                                <AntDesign
                                                    name={'pluscircleo'}
                                                    size={30}
                                                    color={'gray'}
                                                    style={{
                                                        width: 32,
                                                        alignSelf: 'center',
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    paddingLeft: 10,
                                                }}
                                            >
                                                Thêm màu mới
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                // marginBottom: 10,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text>Màu đã chọn</Text>
                                            <View
                                                style={[
                                                    styles.mauvang,
                                                    {
                                                        backgroundColor: `${this.state.colorCurrent}`,
                                                        marginLeft: 10,
                                                    },
                                                ]}
                                            ></View>
                                        </View>
                                    </View>
                                    <View style={styles.notesContent} />
                                    <View>
                                        <Text style={styles.notes}>
                                            Ghi chú
                                        </Text>
                                        <TextInput
                                            style={{
                                                height: 75,
                                                fontSize: 19,
                                                marginTop: 3,
                                            }}
                                            multiline
                                            numberOfLines={4}
                                            onChangeText={(text) =>
                                                this.setState({
                                                    notesText: text,
                                                })
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
                                                {moment(time).format('HH:mm')}
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
                                            <TouchableOpacity
                                                style={{
                                                    height: 25,
                                                    marginTop: 3,
                                                }}
                                                onPress={
                                                    this._showDateTimePicker1
                                                }
                                            >
                                                <Text style={{ fontSize: 19 }}>
                                                    {moment(alarmTime).format(
                                                        'HH:mm'
                                                    )}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Switch
                                            value={isAlarmSet}
                                            onValueChange={this.handleAlarmSet}
                                        />
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
                                                Ngày kết thúc
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    height: 25,
                                                    marginTop: 3,
                                                }}
                                                onPress={
                                                    this._showDateTimePicker1
                                                }
                                            >
                                                <Text style={{ fontSize: 19 }}>
                                                    {moment(alarmTime).format(
                                                        'DD/MM/YYYY'
                                                    )}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                // height: 50,
                                                // backgroundColor: '#EFEFEF',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Text>Không lặp</Text>
                                            <FontAwesome
                                                name={'angle-right'}
                                                size={30}
                                                color={'gray'}
                                                style={{
                                                    marginLeft: 10,
                                                }}
                                            />
                                        </View>
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
            </SafeAreaView>
        )
    }
}

export default detailtask

const styles = StyleSheet.create({
    createTaskButton: {
        width: 327,
        height: 48,
        alignSelf: 'center',
        marginTop: 20,
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
        // backgroundColor: '#E7B94B',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 3,
        borderRadius: 15,
        marginRight: 5,
    },
    selectcolor: {
        height: 16,
        width: 16,
        backgroundColor: '#E7B94B',
        justifyContent: 'center',
        // borderWidth: 3,
        margin: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 10,
    },
    maulam: {
        height: 30,
        width: 30,
        backgroundColor: '#2EBEBD',
        justifyContent: 'center',
        borderRadius: 15,
        marginRight: 10,
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
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        // justifyContent:'space-between',
    },
    container: {
        flex: 1,
        paddingTop: 1,
        backgroundColor: '#eaeef7',
    },
})
