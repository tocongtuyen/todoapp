import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    Modal,
    TextInput,
    Switch,
    SafeAreaView,
} from 'react-native'
import moment from 'moment'
import TaskItem from '../components/taskitem.js'
import Header from '../components/headercomponent.js'
import DateTimePicker from 'react-native-modal-datetime-picker'
import firebase from '../database/firebase'
import ActionSheet from 'react-native-actionsheet'
import CalendarStrip from 'react-native-calendar-strip'
const { width: vw } = Dimensions.get('window')
import Timeline from 'react-native-timeline-flatlist'

function nextDate(num) {
    let today = moment()
    let nextday = moment(today).add(num, 'days')
    let stringday =
        moment(nextday).format('YYYY') +
        '/' +
        moment(nextday).format('MM') +
        '/' +
        moment(nextday).format('DD')

    return stringday
}

function convertDateString(date) {
    return moment(date.toDate()).format('HH:mm')
}

export default class TaskCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: firebase.auth().currentUser.uid,
            datesWhitelist: [
                {
                    start: moment(),
                    end: moment().add(365, 'days'), // total 4 days enabled
                },
            ],
            todoList: [],
            markedDate: [],
            currentDate: `${moment().format('YYYY')}-${moment().format(
                'MM'
            )}-${moment().format('DD')}`,
            isModalVisible: false,
            selectedTask: null,
            isDateTimePickerVisible: false,
            keyTaskCurrent: '',
        }
    }

    getTask = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .orderBy('time')
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    const { time, title, description, color } = doc.data()
                    todo.push({
                        key: doc.id,
                        description,
                        title,
                        lineColor: color.colorLeft,
                        circleColor: color.colorLeft,
                        time: convertDateString(time),
                    })
                })
                console.log(todo)
                this.setState({ todoList: todo })
            })
    }

    componentDidMount() {
        this.getTask(this.state.userid, nextDate(0), nextDate(1))
    }

    render() {
        const {
            state: {
                userid,
                datesWhitelist,
                markedDate,
                todoList,
                isModalVisible,
                selectedTask,
                isDateTimePickerVisible,
                currentDate,
            },
            props: { navigation },
        } = this
        return (
            <SafeAreaView>
                <View
                    style={{
                        flex: 1,
                        //   paddingTop: 20,
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

                        {/* <Text style={styles.newTask}>Danh sách</Text> */}
                    </View>
                    <CalendarStrip
                        ref={(ref) => {
                            this.calenderRef = ref
                        }}
                        // scrollable="true"
                        calendarAnimation={{ type: 'sequence', duration: 30 }}
                        daySelectionAnimation={{
                            type: 'background',
                            duration: 200,
                            highlightColor: '#ffffff',
                        }}
                        style={{
                            height: 120,
                            // paddingTop: 20,
                            paddingBottom: 20,
                        }}
                        calendarHeaderStyle={{ color: '#000000' }}
                        dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
                        dateNameStyle={{ color: '#BBBBBB' }}
                        highlightDateNumberStyle={{
                            color: '#fff',
                            backgroundColor: '#2E66E7',
                            marginTop: 10,
                            height: 35,
                            width: 35,
                            textAlign: 'center',
                            borderRadius: 17.5,
                            overflow: 'hidden',
                            paddingTop: 6,
                            fontWeight: '400',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        highlightDateNameStyle={{ color: '#2E66E7' }}
                        disabledDateNameStyle={{ color: 'grey' }}
                        disabledDateNumberStyle={{
                            color: 'grey',
                            paddingTop: 10,
                        }}
                        // datesWhitelist={datesWhitelist}
                        iconLeft={require('../assets/left-arrow.png')}
                        iconRight={require('../assets/right-arrow.png')}
                        iconContainer={{ flex: 0.1 }}
                        markedDates={markedDate}
                        selectedDate={moment()}
                        onDateSelected={(date) => {
                            const selectedDate = `${moment(date).format(
                                'YYYY'
                            )}/${moment(date).format('MM')}/${moment(
                                date
                            ).format('DD')}`
                            let nextday = moment(date).add(1, 'days')
                            let stringday =
                                moment(nextday).format('YYYY') +
                                '/' +
                                moment(nextday).format('MM') +
                                '/' +
                                moment(nextday).format('DD')
                            console.log(stringday)
                            this.getTask(
                                this.state.userid,
                                selectedDate,
                                stringday
                            )

                            // this.setState({
                            //     currentDate: selectedDate,
                            // })
                        }}
                    />
                    {/* nut them để chuyển sang màng hình thêm task */}
                    {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Addtask', {
              userid: this.state.userid,
              onSelect: this.onSelect,
            });
          }}
          style={styles.viewTask}>
          <Image
            source={require('../assets/plus.png')}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity> */}
                    {/*  */}
                    <View
                        style={{
                            width: '100%',
                            height: Dimensions.get('window').height - 170,
                        }}
                    >
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: 20,
                            }}
                        >
                            <View
                                style={{
                                    marginLeft: 40,
                                }}
                            >
                                <Timeline
                                    data={this.state.todoList}
                                    circleSize={20}
                                    circleColor="rgb(45,156,219)"
                                    lineColor="rgb(45,156,219)"
                                    timeContainerStyle={{
                                        minWidth: 52,
                                        marginTop: -5,
                                    }}
                                    timeStyle={{
                                        textAlign: 'center',
                                        backgroundColor: '#0074DE',
                                        color: 'white',
                                        padding: 5,
                                        borderRadius: 13,
                                    }}
                                    descriptionStyle={{ color: 'gray' }}
                                    options={{
                                        style: { paddingTop: 5 },
                                    }}
                                    innerCircle={'dot'}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    taskListContent: {
        height: 100,
        width: 327,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginBottom: 10,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    newTask: {
        alignSelf: 'center',
        fontSize: 20,
        width: 120,
        height: 25,
        textAlign: 'center',
    },
    cardMain: {
        position: 'absolute',
        top: 100,
        width: 327,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
})
