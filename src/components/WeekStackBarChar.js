import React from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
    ScrollView,
    TouchableOpacity,
} from 'react-native'

import { BarChart } from 'react-native-charts-wrapper'
import firebase from '../database/firebase'
import moment from 'moment'
var today = new Date()
const renderDay = (num, b) => {
    let day = moment().add(num, 'd').format('YYYY/MM/DD')
    if (b == true) return moment().add(num, 'd').format('DD/MM')
    return day
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

class WeekStackBarChar extends React.Component {
    constructor() {
        super()

        this.state = {
            userid: firebase.auth().currentUser.uid,
            number: 0,
            color: [],
            title: [],
            todo: [],
        }
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({ ...this.state, selectedEntry: null })
        } else {
            this.setState({
                ...this.state,
                selectedEntry: JSON.stringify(entry),
            })
        }

        console.log(event.nativeEvent)
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
                this.setState({ todo: todo, isLoading: false })
            })
    }

    filterData = (arr, iscompleted, number) => {
        return arr.filter((item) => {
            return item.isCompleted === iscompleted && item.number === number
        })
    }

    renderData() {
        this.getTaskWeek(
            this.state.userid,
            nextDate(checkThu2() + this.state.number),
            nextDate(checkCN() + 1 + this.state.number)
        )
    }

    componentDidMount() {
        this.renderData()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
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
                    </View>
                    <BarChart
                        style={styles.chart}
                        xAxis={{
                            valueFormatter: [
                                'Thứ 2',
                                'Thứ 3',
                                'Thứ 4',
                                'Thứ 5',
                                'Thứ 6',
                                'Thứ 7',
                                'CN',
                            ],
                            granularityEnabled: true,
                            granularity: 1,
                        }}
                        data={{
                            dataSets: [
                                {
                                    values: [
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    1
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    1
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    1
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    1
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    2
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    2
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    2
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    2
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    3
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    3
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    3
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    3
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    4
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    4
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    4
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    4
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    5
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    5
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    5
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    5
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    6
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    6
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    6
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    6
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    0
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    0
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    0
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    0
                                                ).length,
                                            ],
                                        },
                                    ],
                                    label: `Thống kê công việc ${renderDay(
                                        checkThu2() + this.state.number,
                                        true
                                    )}-${renderDay(
                                        checkThu2() + 6 + this.state.number,
                                        true
                                    )}/${today.getFullYear()}`,
                                    config: {
                                        colors: [
                                            processColor('green'),
                                            processColor('gray'),
                                            // processColor('#FFD08C'),
                                        ],
                                        stackLabels: [
                                            'Hoàn thành',
                                            'Không hoàn thành',
                                        ],
                                    },
                                },
                            ],
                        }}
                        legend={{
                            enabled: true,
                            textSize: 14,
                            form: 'SQUARE',
                            formSize: 14,
                            xEntrySpace: 10,
                            yEntrySpace: 5,
                            wordWrapEnabled: true,
                        }}
                        drawValueAboveBar={false}
                        marker={{
                            enabled: true,
                            markerColor: processColor('blue'),
                            textColor: processColor('white'),
                            markerFontSize: 14,
                        }}
                        // highlights={this.state.highlights}
                        // onSelect={this.handleSelect.bind(this)}
                        // onChange={(event) => console.log(event.nativeEvent)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 400,
        backgroundColor: '#F3F7F4',
    },
    chart: {
        flex: 1,
    },
    buttonSlide: {
        backgroundColor: '#0074D6',
        padding: 5,
        borderRadius: 15,
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
})

export default WeekStackBarChar
