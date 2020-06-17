import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import TaskItem from '../components/taskitem.js'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTask } from '../database/api'
import firebase from '../database/firebase'

const renderDateOnWeek = (num) => {
    // Lấy số thứ tự của ngày hiện tại
    let today = moment()
    let nextday = moment(today).add(num, 'days')
    let stringday =
        moment(nextday).format('YYYY') +
        '/' +
        moment(nextday).format('MM') +
        '/' +
        moment(nextday).format('DD')

    let current_day = new Date(stringday).getDay()
    // Biến lưu tên của thứ
    let day_name = ''
    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            day_name = 'Chủ nhật'
            break
        case 1:
            day_name = 'Thứ hai'
            break
        case 2:
            day_name = 'Thứ ba'
            break
        case 3:
            day_name = 'Thứ tư'
            break
        case 4:
            day_name = 'Thứ năm'
            break
        case 5:
            day_name = 'Thứ sáu'
            break
        case 6:
            day_name = 'Thứ bảy'
    }
    return day_name
}

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

export default class calendarscreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            number: 0,
            arrS0: [],
            arrS1: [],
            arrS2: [],
            arrS3: [],
            arrS4: [],
            arrS5: [],
            arrS6: [],
            arrT0: [],
            arrT1: [],
            arrT2: [],
            arrT3: [],
            arrT4: [],
            arrT5: [],
            arrT6: [],
            arrC0: [],
            arrC1: [],
            arrC2: [],
            arrC3: [],
            arrC4: [],
            arrC5: [],
            arrC6: [],
        }
    }

    getTaskS0 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 1)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrS0: todo })
            })
    }

    getTaskS1 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 1)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrS1: todo })
            })
    }

    getTaskS2 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 1)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrS2: todo })
            })
    }

    getTaskS3 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 1)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrS3: todo })
            })
    }

    getTaskS4 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 1)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrS4: todo })
            })
    }

    getTaskS5 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 1)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrS5: todo })
            })
    }

    getTaskS6 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 1)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrS6: todo })
            })
    }

    getTaskT0 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 2)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrT0: todo })
            })
    }

    getTaskT1 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 2)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrT1: todo })
            })
    }

    getTaskT2 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 2)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrT2: todo })
            })
    }

    getTaskT3 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 2)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrT3: todo })
            })
    }

    getTaskT4 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 2)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrT4: todo })
            })
    }

    getTaskT5 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 2)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrT5: todo })
            })
    }

    getTaskT6 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 2)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrT6: todo })
            })
    }

    getTaskC0 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 3)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrC0: todo })
            })
    }

    getTaskC1 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 3)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrC1: todo })
            })
    }

    getTaskC2 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 3)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrC2: todo })
            })
    }

    getTaskC3 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 3)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrC3: todo })
            })
    }

    getTaskC4 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 3)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrC4: todo })
            })
    }

    getTaskC5 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 3)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrC5: todo })
            })
    }

    getTaskC6 = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .where('session', '==', 3)
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({ key: doc.id, ...doc.data() })
                })
                console.log(todo)
                this.setState({ arrC6: todo })
            })
    }

    componentDidMount() {
        this.setState(
            {
                uid: firebase.auth().currentUser.uid,
            },
            () => {
                this.getTaskS0(
                    this.state.uid,
                    nextDate(0 + this.state.number),
                    nextDate(1 + this.state.number)
                )
                this.getTaskT0(
                    this.state.uid,
                    nextDate(0 + this.state.number),
                    nextDate(1 + this.state.number)
                )
                this.getTaskC0(
                    this.state.uid,
                    nextDate(0 + this.state.number),
                    nextDate(1 + this.state.number)
                )
                this.getTaskS1(
                    this.state.uid,
                    nextDate(1 + this.state.number),
                    nextDate(2 + this.state.number)
                )
                this.getTaskT1(
                    this.state.uid,
                    nextDate(1 + this.state.number),
                    nextDate(2 + this.state.number)
                )
                this.getTaskC1(
                    this.state.uid,
                    nextDate(1 + this.state.number),
                    nextDate(2 + this.state.number)
                )
                this.getTaskS2(
                    this.state.uid,
                    nextDate(2 + this.state.number),
                    nextDate(3 + this.state.number)
                )
                this.getTaskT2(
                    this.state.uid,
                    nextDate(2 + this.state.number),
                    nextDate(3 + this.state.number)
                )
                this.getTaskC2(
                    this.state.uid,
                    nextDate(2 + this.state.number),
                    nextDate(3 + this.state.number)
                )
                this.getTaskS3(
                    this.state.uid,
                    nextDate(3 + this.state.number),
                    nextDate(4 + this.state.number)
                )
                this.getTaskT3(
                    this.state.uid,
                    nextDate(3 + this.state.number),
                    nextDate(4 + this.state.number)
                )
                this.getTaskC3(
                    this.state.uid,
                    nextDate(3 + this.state.number),
                    nextDate(4 + this.state.number)
                )
                this.getTaskS4(
                    this.state.uid,
                    nextDate(4 + this.state.number),
                    nextDate(5 + this.state.number)
                )
                this.getTaskT4(
                    this.state.uid,
                    nextDate(4 + this.state.number),
                    nextDate(5 + this.state.number)
                )
                this.getTaskC4(
                    this.state.uid,
                    nextDate(4 + this.state.number),
                    nextDate(5 + this.state.number)
                )
                this.getTaskS5(
                    this.state.uid,
                    nextDate(5 + this.state.number),
                    nextDate(6 + this.state.number)
                )
                this.getTaskT5(
                    this.state.uid,
                    nextDate(5 + this.state.number),
                    nextDate(6 + this.state.number)
                )
                this.getTaskC5(
                    this.state.uid,
                    nextDate(5 + this.state.number),
                    nextDate(6 + this.state.number)
                )
                this.getTaskS6(
                    this.state.uid,
                    nextDate(6 + this.state.number),
                    nextDate(7 + this.state.number)
                )
                this.getTaskT6(
                    this.state.uid,
                    nextDate(6 + this.state.number),
                    nextDate(7 + this.state.number)
                )
                this.getTaskC6(
                    this.state.uid,
                    nextDate(6 + this.state.number),
                    nextDate(7 + this.state.number)
                )
            }
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#424F61' }}>
                <View
                    style={{
                        height: 50,
                        // backgroundColor: '#EFEFEF',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            console.log('vai')
                            this.props.navigation.navigate('Addtask', {
                                userid: this.state.uid,
                            })
                        }}
                    >
                        <AntDesign
                            name={'plus'}
                            size={30}
                            color={'#EFEFEF'}
                            style={{ width: 32, marginRight: 10 }}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* lui 1 tuan */}
                    <TouchableOpacity
                        style={styles.buttonSlide}
                        onPress={() => {
                            this.setState(
                                (state) => ({
                                    number: state.number - 7,
                                }),
                                () => {
                                    this.getTaskS0(
                                        this.state.uid,
                                        nextDate(0 + this.state.number),
                                        nextDate(1 + this.state.number)
                                    )
                                    this.getTaskT0(
                                        this.state.uid,
                                        nextDate(0 + this.state.number),
                                        nextDate(1 + this.state.number)
                                    )
                                    this.getTaskC0(
                                        this.state.uid,
                                        nextDate(0 + this.state.number),
                                        nextDate(1 + this.state.number)
                                    )
                                    this.getTaskS1(
                                        this.state.uid,
                                        nextDate(1 + this.state.number),
                                        nextDate(2 + this.state.number)
                                    )
                                    this.getTaskT1(
                                        this.state.uid,
                                        nextDate(1 + this.state.number),
                                        nextDate(2 + this.state.number)
                                    )
                                    this.getTaskC1(
                                        this.state.uid,
                                        nextDate(1 + this.state.number),
                                        nextDate(2 + this.state.number)
                                    )
                                    this.getTaskS2(
                                        this.state.uid,
                                        nextDate(2 + this.state.number),
                                        nextDate(3 + this.state.number)
                                    )
                                    this.getTaskT2(
                                        this.state.uid,
                                        nextDate(2 + this.state.number),
                                        nextDate(3 + this.state.number)
                                    )
                                    this.getTaskC2(
                                        this.state.uid,
                                        nextDate(2 + this.state.number),
                                        nextDate(3 + this.state.number)
                                    )
                                    this.getTaskS3(
                                        this.state.uid,
                                        nextDate(3 + this.state.number),
                                        nextDate(4 + this.state.number)
                                    )
                                    this.getTaskT3(
                                        this.state.uid,
                                        nextDate(3 + this.state.number),
                                        nextDate(4 + this.state.number)
                                    )
                                    this.getTaskC3(
                                        this.state.uid,
                                        nextDate(3 + this.state.number),
                                        nextDate(4 + this.state.number)
                                    )
                                    this.getTaskS4(
                                        this.state.uid,
                                        nextDate(4 + this.state.number),
                                        nextDate(5 + this.state.number)
                                    )
                                    this.getTaskT4(
                                        this.state.uid,
                                        nextDate(4 + this.state.number),
                                        nextDate(5 + this.state.number)
                                    )
                                    this.getTaskC4(
                                        this.state.uid,
                                        nextDate(4 + this.state.number),
                                        nextDate(5 + this.state.number)
                                    )
                                    this.getTaskS5(
                                        this.state.uid,
                                        nextDate(5 + this.state.number),
                                        nextDate(6 + this.state.number)
                                    )
                                    this.getTaskT5(
                                        this.state.uid,
                                        nextDate(5 + this.state.number),
                                        nextDate(6 + this.state.number)
                                    )
                                    this.getTaskC5(
                                        this.state.uid,
                                        nextDate(5 + this.state.number),
                                        nextDate(6 + this.state.number)
                                    )
                                    this.getTaskS6(
                                        this.state.uid,
                                        nextDate(6 + this.state.number),
                                        nextDate(7 + this.state.number)
                                    )
                                    this.getTaskT6(
                                        this.state.uid,
                                        nextDate(6 + this.state.number),
                                        nextDate(7 + this.state.number)
                                    )
                                    this.getTaskC6(
                                        this.state.uid,
                                        nextDate(6 + this.state.number),
                                        nextDate(7 + this.state.number)
                                    )
                                }
                            )
                        }}
                    >
                        <Text style={{ color: 'white' }}>{'< tuần trước'}</Text>
                    </TouchableOpacity>
                    {/* Tuan hien tai */}
                    <TouchableOpacity
                        style={styles.buttonSlide}
                        onPress={() => {
                            this.setState({ number: 0 }, () => {
                                this.getTaskS0(
                                    this.state.uid,
                                    nextDate(0 + this.state.number),
                                    nextDate(1 + this.state.number)
                                )
                                this.getTaskT0(
                                    this.state.uid,
                                    nextDate(0 + this.state.number),
                                    nextDate(1 + this.state.number)
                                )
                                this.getTaskC0(
                                    this.state.uid,
                                    nextDate(0 + this.state.number),
                                    nextDate(1 + this.state.number)
                                )
                                this.getTaskS1(
                                    this.state.uid,
                                    nextDate(1 + this.state.number),
                                    nextDate(2 + this.state.number)
                                )
                                this.getTaskT1(
                                    this.state.uid,
                                    nextDate(1 + this.state.number),
                                    nextDate(2 + this.state.number)
                                )
                                this.getTaskC1(
                                    this.state.uid,
                                    nextDate(1 + this.state.number),
                                    nextDate(2 + this.state.number)
                                )
                                this.getTaskS2(
                                    this.state.uid,
                                    nextDate(2 + this.state.number),
                                    nextDate(3 + this.state.number)
                                )
                                this.getTaskT2(
                                    this.state.uid,
                                    nextDate(2 + this.state.number),
                                    nextDate(3 + this.state.number)
                                )
                                this.getTaskC2(
                                    this.state.uid,
                                    nextDate(2 + this.state.number),
                                    nextDate(3 + this.state.number)
                                )
                                this.getTaskS3(
                                    this.state.uid,
                                    nextDate(3 + this.state.number),
                                    nextDate(4 + this.state.number)
                                )
                                this.getTaskT3(
                                    this.state.uid,
                                    nextDate(3 + this.state.number),
                                    nextDate(4 + this.state.number)
                                )
                                this.getTaskC3(
                                    this.state.uid,
                                    nextDate(3 + this.state.number),
                                    nextDate(4 + this.state.number)
                                )
                                this.getTaskS4(
                                    this.state.uid,
                                    nextDate(4 + this.state.number),
                                    nextDate(5 + this.state.number)
                                )
                                this.getTaskT4(
                                    this.state.uid,
                                    nextDate(4 + this.state.number),
                                    nextDate(5 + this.state.number)
                                )
                                this.getTaskC4(
                                    this.state.uid,
                                    nextDate(4 + this.state.number),
                                    nextDate(5 + this.state.number)
                                )
                                this.getTaskS5(
                                    this.state.uid,
                                    nextDate(5 + this.state.number),
                                    nextDate(6 + this.state.number)
                                )
                                this.getTaskT5(
                                    this.state.uid,
                                    nextDate(5 + this.state.number),
                                    nextDate(6 + this.state.number)
                                )
                                this.getTaskC5(
                                    this.state.uid,
                                    nextDate(5 + this.state.number),
                                    nextDate(6 + this.state.number)
                                )
                                this.getTaskS6(
                                    this.state.uid,
                                    nextDate(6 + this.state.number),
                                    nextDate(7 + this.state.number)
                                )
                                this.getTaskT6(
                                    this.state.uid,
                                    nextDate(6 + this.state.number),
                                    nextDate(7 + this.state.number)
                                )
                                this.getTaskC6(
                                    this.state.uid,
                                    nextDate(6 + this.state.number),
                                    nextDate(7 + this.state.number)
                                )
                            })
                        }}
                    >
                        <Text style={{ color: 'white' }}>
                            {'tuần hiện tại'}
                        </Text>
                    </TouchableOpacity>
                    {/* Tang 1 tuan */}
                    <TouchableOpacity
                        style={styles.buttonSlide}
                        onPress={() => {
                            this.setState(
                                (state) => ({
                                    number: state.number + 7,
                                }),
                                () => {
                                    this.getTaskS0(
                                        this.state.uid,
                                        nextDate(0 + this.state.number),
                                        nextDate(1 + this.state.number)
                                    )
                                    this.getTaskT0(
                                        this.state.uid,
                                        nextDate(0 + this.state.number),
                                        nextDate(1 + this.state.number)
                                    )
                                    this.getTaskC0(
                                        this.state.uid,
                                        nextDate(0 + this.state.number),
                                        nextDate(1 + this.state.number)
                                    )
                                    this.getTaskS1(
                                        this.state.uid,
                                        nextDate(1 + this.state.number),
                                        nextDate(2 + this.state.number)
                                    )
                                    this.getTaskT1(
                                        this.state.uid,
                                        nextDate(1 + this.state.number),
                                        nextDate(2 + this.state.number)
                                    )
                                    this.getTaskC1(
                                        this.state.uid,
                                        nextDate(1 + this.state.number),
                                        nextDate(2 + this.state.number)
                                    )
                                    this.getTaskS2(
                                        this.state.uid,
                                        nextDate(2 + this.state.number),
                                        nextDate(3 + this.state.number)
                                    )
                                    this.getTaskT2(
                                        this.state.uid,
                                        nextDate(2 + this.state.number),
                                        nextDate(3 + this.state.number)
                                    )
                                    this.getTaskC2(
                                        this.state.uid,
                                        nextDate(2 + this.state.number),
                                        nextDate(3 + this.state.number)
                                    )
                                    this.getTaskS3(
                                        this.state.uid,
                                        nextDate(3 + this.state.number),
                                        nextDate(4 + this.state.number)
                                    )
                                    this.getTaskT3(
                                        this.state.uid,
                                        nextDate(3 + this.state.number),
                                        nextDate(4 + this.state.number)
                                    )
                                    this.getTaskC3(
                                        this.state.uid,
                                        nextDate(3 + this.state.number),
                                        nextDate(4 + this.state.number)
                                    )
                                    this.getTaskS4(
                                        this.state.uid,
                                        nextDate(4 + this.state.number),
                                        nextDate(5 + this.state.number)
                                    )
                                    this.getTaskT4(
                                        this.state.uid,
                                        nextDate(4 + this.state.number),
                                        nextDate(5 + this.state.number)
                                    )
                                    this.getTaskC4(
                                        this.state.uid,
                                        nextDate(4 + this.state.number),
                                        nextDate(5 + this.state.number)
                                    )
                                    this.getTaskS5(
                                        this.state.uid,
                                        nextDate(5 + this.state.number),
                                        nextDate(6 + this.state.number)
                                    )
                                    this.getTaskT5(
                                        this.state.uid,
                                        nextDate(5 + this.state.number),
                                        nextDate(6 + this.state.number)
                                    )
                                    this.getTaskC5(
                                        this.state.uid,
                                        nextDate(5 + this.state.number),
                                        nextDate(6 + this.state.number)
                                    )
                                    this.getTaskS6(
                                        this.state.uid,
                                        nextDate(6 + this.state.number),
                                        nextDate(7 + this.state.number)
                                    )
                                    this.getTaskT6(
                                        this.state.uid,
                                        nextDate(6 + this.state.number),
                                        nextDate(7 + this.state.number)
                                    )
                                    this.getTaskC6(
                                        this.state.uid,
                                        nextDate(6 + this.state.number),
                                        nextDate(7 + this.state.number)
                                    )
                                }
                            )
                        }}
                    >
                        <Text style={{ color: 'white' }}>{'tuần sau >'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View>
                        <View style={styles.colmday}>
                            <View
                                style={[
                                    styles.headercolm,
                                    { backgroundColor: '#424F61' },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        getTask(
                                            'vHWoFPdFbMcmmcv0gmavkdeJZWb2',
                                            nextDate(0 + this.state.number),
                                            nextDate(1 + this.state.number),
                                            3
                                        )
                                    }}
                                >
                                    <Text>0</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={[
                                    styles.stylecolunm,
                                    { backgroundColor: '#B0D9F8' },
                                ]}
                            >
                                <Text>Sáng</Text>
                            </View>
                            <View style={styles.dividercolunm}></View>
                            <View
                                style={[
                                    styles.stylecolunm,
                                    { backgroundColor: '#EFEFEF' },
                                ]}
                            >
                                <Text>Trưa</Text>
                            </View>
                            <View style={styles.dividercolunm}></View>
                            <View
                                style={[
                                    styles.stylecolunm,
                                    { backgroundColor: '#B0D9F8' },
                                ]}
                            >
                                <Text>Chiều</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView horizontal={true}>
                            <View style={styles.calendar}>
                                <View style={styles.colmday}>
                                    <View
                                        style={{
                                            height: 50,
                                            backgroundColor: '#EFEFEF',
                                        }}
                                    >
                                        <View
                                            style={{
                                                height: 5,
                                                backgroundColor: '#0074DF',
                                            }}
                                        ></View>
                                        <View style={styles.stylecolunm}>
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: '600',
                                                    color: '#0074DF',
                                                }}
                                            >
                                                {renderDateOnWeek(
                                                    0 + this.state.number
                                                )}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: '300',
                                                    color: '#0074DF',
                                                }}
                                            >
                                                {nextDate(
                                                    0 + this.state.number
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.stylecolunm}>
                                        {/* S0 */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrS0}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* T0 */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrT0}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrC0}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={styles.divider}></View>
                                <View style={styles.colmday}>
                                    <View
                                        style={[
                                            styles.headercolm,
                                            { backgroundColor: '#B0D9F8' },
                                        ]}
                                    >
                                        <Text style={styles.textHeaderColunm}>
                                            {renderDateOnWeek(
                                                1 + this.state.number
                                            )}
                                        </Text>
                                        <Text
                                            style={styles.textHeaderColunmDate}
                                        >
                                            {nextDate(1 + this.state.number)}
                                        </Text>
                                    </View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrS1}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrT1}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrC1}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={styles.divider}></View>
                                <View style={styles.colmday}>
                                    <View style={styles.headercolm}>
                                        <Text style={styles.textHeaderColunm}>
                                            {renderDateOnWeek(
                                                2 + this.state.number
                                            )}
                                        </Text>
                                        <Text
                                            style={styles.textHeaderColunmDate}
                                        >
                                            {nextDate(2 + this.state.number)}
                                        </Text>
                                    </View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrS2}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrT2}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrC2}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={styles.divider}></View>
                                <View style={styles.colmday}>
                                    <View
                                        style={[
                                            styles.headercolm,
                                            { backgroundColor: '#B0D9F8' },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.textHeaderColunm,
                                                {},
                                            ]}
                                        >
                                            {renderDateOnWeek(
                                                3 + this.state.number
                                            )}
                                        </Text>
                                        <Text
                                            style={styles.textHeaderColunmDate}
                                        >
                                            {nextDate(3 + this.state.number)}
                                        </Text>
                                    </View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrS3}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrT3}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrC3}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={styles.divider}></View>
                                <View style={styles.colmday}>
                                    <View style={styles.headercolm}>
                                        <Text style={styles.textHeaderColunm}>
                                            {renderDateOnWeek(
                                                4 + this.state.number
                                            )}
                                        </Text>
                                        <Text
                                            style={styles.textHeaderColunmDate}
                                        >
                                            {nextDate(4 + this.state.number)}
                                        </Text>
                                    </View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrS4}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrT4}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrC4}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={styles.divider}></View>
                                <View style={styles.colmday}>
                                    <View
                                        style={[
                                            styles.headercolm,
                                            { backgroundColor: '#B0D9F8' },
                                        ]}
                                    >
                                        <Text style={styles.textHeaderColunm}>
                                            {renderDateOnWeek(
                                                5 + this.state.number
                                            )}
                                        </Text>
                                        <Text
                                            style={styles.textHeaderColunmDate}
                                        >
                                            {nextDate(5 + this.state.number)}
                                        </Text>
                                    </View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrS5}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrT5}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrC5}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={styles.divider}></View>
                                <View style={styles.colmday}>
                                    <View style={styles.headercolm}>
                                        <Text style={styles.textHeaderColunm}>
                                            {renderDateOnWeek(
                                                6 + this.state.number
                                            )}
                                        </Text>
                                        <Text
                                            style={styles.textHeaderColunmDate}
                                        >
                                            {nextDate(6 + this.state.number)}
                                        </Text>
                                    </View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrS6}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrT6}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dividercolunm}></View>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ScrollView>
                                            <View>
                                                <FlatList
                                                    data={this.state.arrC6}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.props.navigation.navigate(
                                                                    'UpdateTask',
                                                                    {
                                                                        taskid:
                                                                            item.key,
                                                                    }
                                                                )
                                                            }}
                                                            key={item.key}
                                                        >
                                                            <TaskItem
                                                                title={
                                                                    item.title
                                                                }
                                                                color={
                                                                    item.color
                                                                }
                                                                time={item.time.toDate()}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) =>
                                                        item.key
                                                    }
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendar: {
        flex: 1,
        width: 900,
        height: 731,
        flexDirection: 'row',
        backgroundColor: '#B0D9F8',
    },
    colmday: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    divider: {
        width: 1,
        backgroundColor: '#cad3c3',
    },
    dividercolunm: {
        height: 1,
        backgroundColor: '#cad3c3',
    },
    headercolm: {
        height: 50,
        backgroundColor: '#EFEFEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stylecolunm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeaderColunm: {
        fontSize: 20,
        fontWeight: '600',
    },
    textHeaderColunmDate: {
        fontSize: 12,
        fontWeight: '300',
    },
    buttonSlide: {
        backgroundColor: '#0074D6',
        padding: 5,
        borderRadius: 10,
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
})
