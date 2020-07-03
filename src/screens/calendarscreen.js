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
    Dimensions,
    StatusBar,
    ActivityIndicator,
} from 'react-native'
import NetInfo from '@react-native-community/netinfo'

import moment from 'moment'
import TaskItem from '../components/taskitem.js'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTask } from '../database/api'
import firebase from '../database/firebase'
import ActionSheet from 'react-native-actionsheet'
import ListTaskItem from '../components/listtaskitem'
import TimeLife from '../components/timelife'
const Width = Dimensions.get('window').width

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
            todo: [],
            keyTaskCurrent: '',
            isLoading: true,
        }
    }

    getTaskWeek = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
                })
                // console.log(todo)
                this.setState({ todo: todo, isLoading: false })
            })
    }

    deleteTask = (key) => {
        const dbRef = firebase.firestore().collection('tasks').doc(key)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
        })
    }

    renderData = () => {
        this.getTaskWeek(
            this.state.uid,
            nextDate(checkThu2() + this.state.number),
            nextDate(checkCN() + 1 + this.state.number)
        )
    }

    filterData = (arr, session, number) => {
        return arr.filter((item) => {
            return item.session === session && item.number === number
        })
    }
    unsubscribe = NetInfo.addEventListener((state) => {
        this.setState({ isLoading: !state.isConnected })
    })
    componentDidMount() {
        this.renderData()
        this.unsubscribe
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#424F61' }}>
                <StatusBar barStyle={'light-content'} />
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
                        {/* <TouchableOpacity
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
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.colmday}></View>
                        <View style={styles.colmday}>
                            <StyleHeaderFocus
                                check={checkThu2()}
                                number={this.state.number}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.colmday}>
                            <StyleHeaderFocus
                                check={checkThu3()}
                                number={this.state.number}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.colmday}>
                            <StyleHeaderFocus
                                check={checkThu4()}
                                number={this.state.number}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.colmday}>
                            <StyleHeaderFocus
                                check={checkThu5()}
                                number={this.state.number}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.colmday}>
                            <StyleHeaderFocus
                                check={checkThu6()}
                                number={this.state.number}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.colmday}>
                            <StyleHeaderFocus
                                check={checkThu7()}
                                number={this.state.number}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.colmday}>
                            <StyleHeaderFocus
                                check={checkCN()}
                                number={this.state.number}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, width: Width }}>
                        <ScrollView horizontal={false}>
                            <View style={styles.calendar}>
                                <View style={[styles.colmday, { width: 10 }]}>
                                    {/* <View style={[styles.headercolm, {}]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                getTask(
                                                    'vHWoFPdFbMcmmcv0gmavkdeJZWb2',
                                                    nextDate(
                                                        0 + this.state.number
                                                    ),
                                                    nextDate(
                                                        1 + this.state.number
                                                    ),
                                                    3
                                                )
                                            }}
                                        />
                                    </View> */}
                                    <TimeLife />
                                </View>
                                {/* Thu2 */}
                                <View style={styles.colmday}>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                6,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                7,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                8,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                9,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                10,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                11,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                12,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                13,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                14,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                15,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                16,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                17,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                18,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                19,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                20,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                21,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                22,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                23,
                                                1
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                {/* Thu3 */}
                                <View style={styles.colmday}>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                6,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                7,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                8,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                9,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                10,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                11,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                12,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                13,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                14,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                15,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                16,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                17,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                18,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                19,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                20,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                21,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                22,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                23,
                                                2
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                {/* Thu4 */}
                                <View style={styles.colmday}>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                6,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                7,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                8,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                9,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                10,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                11,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                12,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                13,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                14,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                15,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                16,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                17,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                18,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                19,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                20,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                21,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                22,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                23,
                                                3
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                {/* Thu5 */}
                                <View style={styles.colmday}>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                6,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                7,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                8,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                9,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                10,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                11,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                12,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                13,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                14,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                15,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                16,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                17,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                18,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                19,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                20,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                21,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                22,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                23,
                                                4
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                {/* Thu6 */}
                                <View style={styles.colmday}>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                6,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                7,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                8,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                9,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                10,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                11,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                12,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                13,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                14,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                15,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                16,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                17,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                18,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                19,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                20,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                21,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                22,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                23,
                                                5
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                {/* Thu7 */}
                                <View style={styles.colmday}>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                6,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                7,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                8,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                9,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                10,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                11,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                12,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                13,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                14,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                15,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                16,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                17,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                18,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                19,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                20,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                21,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                22,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                23,
                                                6
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                {/* cn */}
                                <View style={styles.colmday}>
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Sáng</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                6,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Trưa</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                7,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                8,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                9,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                10,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                11,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                12,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                13,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                14,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                15,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                16,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                17,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.dividercolunm,
                                            {
                                                backgroundColor: '#cad3c3',
                                            },
                                        ]}
                                    />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                18,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                19,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                20,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                21,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                22,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
                                    </View>
                                    <View style={styles.dividercolunm} />
                                    <View style={styles.stylecolunm}>
                                        {/* <Text>Chiều</Text> */}
                                        <ListTaskItem
                                            data={this.filterData(
                                                this.state.todo,
                                                23,
                                                0
                                            )}
                                            navigation={this.props.navigation}
                                        />
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
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendar: {
        flex: 1,
        // width: 770,
        // width: 420,
        height: 1062,
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
        backgroundColor: '#FFF',
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
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
})
