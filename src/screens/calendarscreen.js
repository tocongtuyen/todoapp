import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native'
import moment from 'moment'
import TaskItem from '../components/taskitem.js'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTask } from '../database/api'
import firebase from '../database/firebase'
import ActionSheet from 'react-native-actionsheet'
import ListTaskItem from '../components/listtaskitem'

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
            day_name = 'CN'
            break
        case 1:
            day_name = 'Thứ 2'
            break
        case 2:
            day_name = 'Thứ 3'
            break
        case 3:
            day_name = 'Thứ 4'
            break
        case 4:
            day_name = 'Thứ 5'
            break
        case 5:
            day_name = 'Thứ 6'
            break
        case 6:
            day_name = 'Thứ 7'
    }
    return day_name
}

const checkThu2 = () => {
    let current_day = new Date().getDay()
    // Cột hiện tại
    let day_name = 0
    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            day_name = -6
            break
        case 1:
            day_name = 0
            break
        case 2:
            day_name = -1
            break
        case 3:
            day_name = -2
            break
        case 4:
            day_name = -3
            break
        case 5:
            day_name = -4
            break
        case 6:
            day_name = -5
    }
    return day_name
}

const checkThu3 = () => {
    return checkThu2() + 1
}

const checkThu4 = () => {
    return checkThu2() + 2
}

const checkThu5 = () => {
    return checkThu2() + 3
}

const checkThu6 = () => {
    return checkThu2() + 4
}

const checkThu7 = () => {
    return checkThu2() + 5
}

const checkCN = () => {
    return checkThu2() + 6
}

function nextDate(num, b) {
    let today = moment()
    let nextday = moment(today).add(num, 'days')
    let stringday =
        moment(nextday).format('YYYY') +
        '/' +
        moment(nextday).format('MM') +
        '/' +
        moment(nextday).format('DD')
    if (b) {
        return moment(nextday).format('DD') + '/' + moment(nextday).format('MM')
    }
    return stringday
}

const focusDay = (day) => {
    if (
        day ===
        moment().format('YYYY') +
            '/' +
            moment().format('MM') +
            '/' +
            moment().format('DD')
    ) {
        return 0
    }
    return 1
}
const StyleHeaderFocus = (props) => {
    const { check, number } = props
    return (
        <View
            style={{
                height: 50,
                backgroundColor:
                    focusDay(nextDate(check + number)) == 0
                        ? '#FFF'
                        : '#EFEFEF',
            }}
        >
            <View
                style={{
                    height: focusDay(nextDate(check + number)) == 0 ? 5 : 0,
                    backgroundColor: '#0074DF',
                }}
            />
            <View style={styles.stylecolunm}>
                <Text
                    style={{
                        fontWeight: '600',
                        color:
                            focusDay(nextDate(check + number)) == 0
                                ? '#0074DF'
                                : 'black',
                    }}
                >
                    {renderDateOnWeek(check + number)}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '300',
                        color:
                            focusDay(nextDate(check + number)) == 0
                                ? '#0074DF'
                                : 'black',
                    }}
                >
                    {nextDate(check + number, true)}
                </Text>
            </View>
        </View>
    )
}

export default class calendarscreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: firebase.auth().currentUser.uid,
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
            keyTaskCurrent: '',
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
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
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
                })
                console.log(todo)
                this.setState({ arrC6: todo })
            })
    }

    deleteTask = (key) => {
        const dbRef = firebase.firestore().collection('tasks').doc(key)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
        })
    }

    renderData = () => {
        this.getTaskS0(
            this.state.uid,
            nextDate(checkThu2() + this.state.number),
            nextDate(checkThu3() + this.state.number)
        )
        this.getTaskT0(
            this.state.uid,
            nextDate(checkThu2() + this.state.number),
            nextDate(checkThu3() + this.state.number)
        )
        this.getTaskC0(
            this.state.uid,
            nextDate(checkThu2() + this.state.number),
            nextDate(checkThu3() + this.state.number)
        )
        this.getTaskS1(
            this.state.uid,
            nextDate(checkThu3() + this.state.number),
            nextDate(checkThu4() + this.state.number)
        )
        this.getTaskT1(
            this.state.uid,
            nextDate(checkThu3() + this.state.number),
            nextDate(checkThu4() + this.state.number)
        )
        this.getTaskC1(
            this.state.uid,
            nextDate(checkThu3() + this.state.number),
            nextDate(checkThu4() + this.state.number)
        )
        this.getTaskS2(
            this.state.uid,
            nextDate(checkThu4() + this.state.number),
            nextDate(checkThu5() + this.state.number)
        )
        this.getTaskT2(
            this.state.uid,
            nextDate(checkThu4() + this.state.number),
            nextDate(checkThu5() + this.state.number)
        )
        this.getTaskC2(
            this.state.uid,
            nextDate(checkThu4() + this.state.number),
            nextDate(checkThu5() + this.state.number)
        )
        this.getTaskS3(
            this.state.uid,
            nextDate(checkThu5() + this.state.number),
            nextDate(checkThu6() + this.state.number)
        )
        this.getTaskT3(
            this.state.uid,
            nextDate(checkThu5() + this.state.number),
            nextDate(checkThu6() + this.state.number)
        )
        this.getTaskC3(
            this.state.uid,
            nextDate(checkThu5() + this.state.number),
            nextDate(checkThu6() + this.state.number)
        )
        this.getTaskS4(
            this.state.uid,
            nextDate(checkThu6() + this.state.number),
            nextDate(checkThu7() + this.state.number)
        )
        this.getTaskT4(
            this.state.uid,
            nextDate(checkThu6() + this.state.number),
            nextDate(checkThu7() + this.state.number)
        )
        this.getTaskC4(
            this.state.uid,
            nextDate(checkThu6() + this.state.number),
            nextDate(checkThu7() + this.state.number)
        )
        this.getTaskS5(
            this.state.uid,
            nextDate(checkThu7() + this.state.number),
            nextDate(checkCN() + this.state.number)
        )
        this.getTaskT5(
            this.state.uid,
            nextDate(checkThu7() + this.state.number),
            nextDate(checkCN() + this.state.number)
        )
        this.getTaskC5(
            this.state.uid,
            nextDate(checkThu7() + this.state.number),
            nextDate(checkCN() + this.state.number)
        )
        this.getTaskS6(
            this.state.uid,
            nextDate(checkCN() + this.state.number),
            nextDate(checkCN() + 1 + this.state.number)
        )
        this.getTaskT6(
            this.state.uid,
            nextDate(checkCN() + this.state.number),
            nextDate(checkCN() + 1 + this.state.number)
        )
        this.getTaskC6(
            this.state.uid,
            nextDate(checkCN() + this.state.number),
            nextDate(checkCN() + 1 + this.state.number)
        )
    }

    componentDidMount() {
        this.renderData()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#424F61' }}>
                <ActionSheet
                    ref={(o) => (this.ActionSheet = o)}
                    title={'Dữ liệu sẽ bị xoá vĩnh viễn!'}
                    options={['Xoá công việc', 'Huỷ bỏ']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={(index) => {
                        if (index == 0) {
                            this.deleteTask(this.state.keyTaskCurrent)
                        }
                    }}
                />
                <View
                    style={{
                        height: 35,
                        // backgroundColor: '#EFEFEF',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>
                            {nextDate(0 + this.state.number) +
                                ' - ' +
                                nextDate(6 + this.state.number)}
                        </Text>
                    </View> */}

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
                                        this.renderData()
                                    }
                                )
                            }}
                        >
                            <Text style={{ color: 'white' }}>
                                {'< tuần trước'}
                            </Text>
                        </TouchableOpacity>
                        {/* Tuan hien tai */}
                        <TouchableOpacity
                            style={styles.buttonSlide}
                            onPress={() => {
                                this.setState({ number: 0 }, () => {
                                    this.renderData()
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
                                        this.renderData()
                                    }
                                )
                            }}
                        >
                            <Text style={{ color: 'white' }}>
                                {'tuần sau >'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Addtask', {
                                    userid: this.state.uid,
                                })
                            }}
                        >
                            <AntDesign
                                name={'plus'}
                                size={30}
                                color={'#EFEFEF'}
                                style={{
                                    width: 32,
                                    marginRight: 10,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <View style={styles.colmday}>
                            <View style={[styles.headercolm, {}]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        getTask(
                                            'vHWoFPdFbMcmmcv0gmavkdeJZWb2',
                                            nextDate(0 + this.state.number),
                                            nextDate(1 + this.state.number),
                                            3
                                        )
                                    }}
                                />
                            </View>
                            <View
                                style={[
                                    styles.stylecolunm,
                                    {
                                        backgroundColor: '#EFEFEF',
                                    },
                                ]}
                            >
                                <Text>06h</Text>
                                <Text>-</Text>
                                <Text>13h</Text>
                            </View>
                            <View style={styles.dividercolunm} />
                            <View
                                style={[
                                    styles.stylecolunm,
                                    {
                                        backgroundColor: '#EFEFEF',
                                    },
                                ]}
                            >
                                <Text>13h</Text>
                                <Text>-</Text>
                                <Text>19h</Text>
                            </View>
                            <View style={styles.dividercolunm} />
                            <View
                                style={[
                                    styles.stylecolunm,
                                    {
                                        backgroundColor: '#EFEFEF',
                                    },
                                ]}
                            >
                                <Text>19h</Text>
                                <Text>-</Text>
                                <Text>24h</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {/* <ScrollView horizontal={true}> */}
                        <View style={styles.calendar}>
                            <View style={styles.colmday}>
                                <StyleHeaderFocus
                                    check={checkThu2()}
                                    number={this.state.number}
                                />
                                <View style={styles.stylecolunm}>
                                    {/* S0 */}
                                    <ListTaskItem
                                        data={this.state.arrS0}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* T0 */}
                                    <ListTaskItem
                                        data={this.state.arrT0}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Chiều</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrC0}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.colmday}>
                                <StyleHeaderFocus
                                    check={checkThu3()}
                                    number={this.state.number}
                                />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Sáng</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrS1}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Trưa</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrT1}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Chiều</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrC1}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.colmday}>
                                <StyleHeaderFocus
                                    check={checkThu4()}
                                    number={this.state.number}
                                />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Sáng</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrS2}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Trưa</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrT2}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Chiều</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrC2}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.colmday}>
                                <StyleHeaderFocus
                                    check={checkThu5()}
                                    number={this.state.number}
                                />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Sáng</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrS3}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Trưa</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrT3}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Chiều</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrC3}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.colmday}>
                                <StyleHeaderFocus
                                    check={checkThu6()}
                                    number={this.state.number}
                                />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Sáng</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrS4}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Trưa</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrT4}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Chiều</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrC4}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.colmday}>
                                <StyleHeaderFocus
                                    check={checkThu7()}
                                    number={this.state.number}
                                />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Sáng</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrS5}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Trưa</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrT5}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Chiều</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrC5}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.colmday}>
                                <StyleHeaderFocus
                                    check={checkCN()}
                                    number={this.state.number}
                                />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Sáng</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrS6}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Trưa</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrT6}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                                <View style={styles.dividercolunm} />
                                <View style={styles.stylecolunm}>
                                    {/* <Text>Chiều</Text> */}
                                    <ListTaskItem
                                        data={this.state.arrC6}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            </View>
                        </View>
                        {/* </ScrollView> */}
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
        // width: 770,
        // width: 420,
        // height: 768,
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
        // fontSize: 20,
        fontSize: 12,
        fontWeight: '600',
    },
    textHeaderColunmDate: {
        fontSize: 12,
        fontWeight: '300',
    },
    buttonSlide: {
        backgroundColor: '#0074D6',
        padding: 5,
        borderRadius: 15,
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    styleHeader: {
        height: 50,
        backgroundColor: '#FFF',
    },
})
