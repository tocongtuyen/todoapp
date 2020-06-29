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
            todo: [],
            keyTaskCurrent: '',
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
                console.log(todo)
                this.setState({ todo: todo })
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

    componentDidMount() {
        this.renderData()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#424F61' }}>
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
                                    {/* <Text>Sáng</Text> */}
                                    <ListTaskItem
                                        data={this.filterData(
                                            this.state.todo,
                                            1,
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
                                            2,
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
                                            3,
                                            1
                                        )}
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
                                        data={this.filterData(
                                            this.state.todo,
                                            1,
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
                                            2,
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
                                            3,
                                            2
                                        )}
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
                                        data={this.filterData(
                                            this.state.todo,
                                            1,
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
                                            2,
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
                                            3,
                                            3
                                        )}
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
                                        data={this.filterData(
                                            this.state.todo,
                                            1,
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
                                            2,
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
                                            3,
                                            4
                                        )}
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
                                        data={this.filterData(
                                            this.state.todo,
                                            1,
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
                                            2,
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
                                            3,
                                            5
                                        )}
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
                                        data={this.filterData(
                                            this.state.todo,
                                            1,
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
                                            2,
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
                                            3,
                                            6
                                        )}
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
                                        data={this.filterData(
                                            this.state.todo,
                                            1,
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
                                            2,
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
                                            3,
                                            0
                                        )}
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
