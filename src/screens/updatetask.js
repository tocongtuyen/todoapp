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
// import Header from '../headercomponent.js';
const { width: vw } = Dimensions.get('window')
import DateTimePicker from 'react-native-modal-datetime-picker'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from '../database/firebase'
import ActionSheet from 'react-native-actionsheet'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

class UpdateTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // userid: this.props.route.params.userid,
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
            color: '#4AD565',
            isCompleted: false,
            selectedTask: this.props.route.params.data,
            id: this.props.route.params.taskid,
            colorCurrent: { color: '#FFF' },
            colorid: this.props.route.params.data.colorid,
        }
    }

    checkHour(time) {
        let tamp = new Date(time).getHours()
        console.log(tamp)
        if (tamp < 11) {
            return 1
        } else if (tamp >= 11 && tamp < 16) {
            return 2
        } else {
            return 3
        }
    }

    updateTask = (item) => {
        const updateDBRef = firebase
            .firestore()
            .collection('tasks')
            .doc(this.state.id)
        updateDBRef
            .set({
                ...item,
                time: firebase.firestore.Timestamp.fromDate(
                    new Date(item.time.toDate())
                ),
                colorid: this.state.colorid,
                session: this.checkHour(item.time.toDate()),
            })
            .then((docRef) => {
                this.props.navigation.goBack()
            })
            .catch((error) => {
                console.error('Error: ', error)
                // this.setState({
                //     isLoading: false,
                // })
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
        const { selectedTask } = this.state
        const prevSelectedTask = { ...selectedTask }
        const selectedDatePicked = prevSelectedTask.time.toDate()
        const hour = moment(date).hour()
        const minute = moment(date).minute()
        const newModifiedDay = moment(selectedDatePicked)
            .hour(hour)
            .minute(minute)

        prevSelectedTask.time = newModifiedDay
        this.setState({
            selectedTask: prevSelectedTask,
        })

        this._hideDateTimePicker()
    }

    getTaskById = (id) => {
        return firebase
            .firestore()
            .collection('tasks')
            .doc('QbdXFnnICWgJrjxGEGSL')
            .get()
            .then((docRef) => {
                // console.log(docRef.data())
                return docRef.data()
            })
            .catch((error) => {})
    }

    deleteTask = (key) => {
        const dbRef = firebase.firestore().collection('tasks').doc(key)
        dbRef.delete().then((res) => {
            this.props.navigation.goBack()
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

    getColorById = (id) => {
        return firebase
            .firestore()
            .collection('colors')
            .doc(id + '')
            .get()
            .then((docRef) => {
                // console.log(docRef.data())
                return docRef.data()
            })
            .catch((error) => {})
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
                // console.log(querySnapshot)
                this.setState({ arrColor: arr })
            })
    }

    deleteColor = (key) => {
        const dbRef = firebase.firestore().collection('colors').doc(key)
        dbRef.delete().then((res) => {
            // this.props.navigation.goBack()
        })
    }

    componentDidMount() {
        // const taskid = this.props.route.params.taskid
        // this.getTaskById('QbdXFnnICWgJrjxGEGSL').then((tasks) => {
        //     this.setState({ selectedTask: tasks }, () => {
        //         console.log(this.state.selectedTask)
        //     })
        // })
        this.getAllColor(firebase.auth().currentUser.uid)
        this.getColorById(this.state.selectedTask.colorid).then((color) => {
            console.log(color)
            this.setState({ colorCurrent: color })
        })
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
                selectedTask,
            },
            props: { navigation },
        } = this

        return (
            <SafeAreaView>
                <ActionSheet
                    ref={(o) => (this.ActionSheet = o)}
                    title={'Dữ liệu sẽ bị xoá vĩnh viễn!'}
                    options={['Xoá công việc', 'Huỷ bỏ']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={(index) => {
                        if (index == 0) {
                            this.deleteTask(this.state.id)
                        }
                    }}
                />
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
                        date={
                            new Date(
                                moment(selectedTask.time.toDate()).add(
                                    0,
                                    'hours'
                                )
                            )
                        }
                        mode="time"
                    />
                    <View style={styles.container}>
                        <View
                            style={{
                                height: visibleHeight,
                            }}
                        >
                            <View
                                style={
                                    ([styles.backButton],
                                    {
                                        height: 35,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    })
                                }
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.goBack()
                                    }
                                    style={{
                                        // marginRight: vw / 2 - 120,
                                        marginLeft: 10,
                                    }}
                                >
                                    <Image
                                        style={{ height: 25, width: 40 }}
                                        source={require('../assets/back.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <Text style={styles.newTask}>
                                    Chi tiết công việc
                                </Text>
                                <View style={{ marginRight: 30 }}>
                                    <Text> </Text>
                                </View>
                            </View>
                            <ScrollView
                                contentContainerStyle={{
                                    paddingBottom: 75,
                                }}
                            >
                                <View style={styles.calenderContainer}>
                                    {/* <CalendarList
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
                                /> */}
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
                                        onChangeText={(text) => {
                                            const prevSelectedTask = {
                                                ...selectedTask,
                                            }
                                            prevSelectedTask.title = text
                                            this.setState(
                                                {
                                                    selectedTask: prevSelectedTask,
                                                },
                                                () => {
                                                    console.log(
                                                        selectedTask.title
                                                    )
                                                }
                                            )
                                        }}
                                        value={selectedTask.title}
                                        placeholder="Nhập công việc cần làm"
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
                                                                    colorCurrent: {
                                                                        color:
                                                                            item.color,
                                                                    },
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
                                                            marginLeft: 5,
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
                                                        backgroundColor: `${this.state.colorCurrent.color}`,
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
                                            onChangeText={(text) => {
                                                const prevSelectedTask = {
                                                    ...selectedTask,
                                                }
                                                prevSelectedTask.notes = text
                                                this.setState({
                                                    selectedTask: prevSelectedTask,
                                                })
                                            }}
                                            value={selectedTask.notes}
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
                                                {moment(
                                                    selectedTask.time.toDate()
                                                ).format('HH:mm')}
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
                                                    {moment(
                                                        selectedTask.alarmTime.toDate()
                                                    ).format('HH:mm')}
                                                </Text>
                                            </View>
                                        </View>
                                        <Switch
                                            value={selectedTask.isAlarmSet}
                                            onValueChange={() => {
                                                const prevSelectedTask = {
                                                    ...selectedTask,
                                                }
                                                prevSelectedTask.isAlarmSet = !selectedTask.isAlarmSet
                                                this.setState({
                                                    selectedTask: prevSelectedTask,
                                                })
                                            }}
                                        />
                                    </View>
                                    {/* <View style={styles.seperator} />
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
                                                    {moment(
                                                        selectedTask.time.toDate()
                                                    ).format('DD/MM/YYYY')}
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
                                    </View> */}
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
                                                Trạng thái công việc
                                            </Text>
                                            <View
                                                style={{
                                                    height: 25,
                                                    marginTop: 3,
                                                }}
                                            >
                                                <Text style={{ fontSize: 19 }}>
                                                    {selectedTask.isCompleted
                                                        ? 'Hoàn thành'
                                                        : 'Không hoàn thành'}
                                                </Text>
                                            </View>
                                        </View>
                                        <Switch
                                            value={selectedTask.isCompleted}
                                            onValueChange={() => {
                                                const prevSelectedTask = {
                                                    ...selectedTask,
                                                }
                                                prevSelectedTask.isCompleted = !selectedTask.isCompleted
                                                this.setState({
                                                    selectedTask: prevSelectedTask,
                                                })
                                            }}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        disabled={selectedTask.title === ''}
                                        style={[
                                            styles.updateButton,
                                            {
                                                backgroundColor:
                                                    selectedTask.title === ''
                                                        ? 'rgba(46, 102, 231,0.5)'
                                                        : '#2E66E7',
                                            },
                                        ]}
                                        onPress={async () => {
                                            this.updateTask(
                                                this.state.selectedTask
                                            )
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                textAlign: 'center',
                                                color: '#fff',
                                            }}
                                        >
                                            Cập nhật
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={async () => {
                                            this.ActionSheet.show()
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                textAlign: 'center',
                                                color: '#fff',
                                            }}
                                        >
                                            Xoá
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default UpdateTask

const styles = StyleSheet.create({
    createTaskButton: {
        width: 252,
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
        height: 10,
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
    },
    container: {
        flex: 1,
        paddingTop: 1,
        backgroundColor: '#eaeef7',
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        width: 150,
        height: 38,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
    },
    updateButton: {
        backgroundColor: '#2E66E7',
        width: 150,
        height: 38,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 20,
    },
})
