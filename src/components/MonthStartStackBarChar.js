import React from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
    ScrollView,
} from 'react-native'

import { BarChart } from 'react-native-charts-wrapper'
import firebase from '../database/firebase'
import moment from 'moment'
var today = new Date()

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
            arr1: [],
            arr2: [],
            arr3: [],
            arr4: [],
            arr5: [],
            arr6: [],
            arr7: [],
            arr8: [],
            arr9: [],
            arr10: [],
            arr11: [],
            arr12: [],
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

    getTaskYear = (id, datebegin, dateend) => {
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

    filterData = (arr, iscompleted, time) => {
        return arr.filter((item) => {
            return (
                item.isCompleted === iscompleted &&
                item.time.toDate().getMonth() + 1 === time
            )
        })
    }

    componentDidMount() {
        this.getTaskYear(
            this.state.userid,
            `${today.getFullYear()}/01/01`,
            `${today.getFullYear() + 1}/01/01`
        )
        this.filterData
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <BarChart
                        style={styles.chart}
                        xAxis={{
                            valueFormatter: [
                                'Tháng 1',
                                'Tháng 2',
                                'Tháng 3',
                                'Tháng 4',
                                'Tháng 5',
                                'Tháng 6',
                                'Tháng 7',
                                'Tháng 8',
                                'Tháng 9',
                                'Tháng 10',
                                'Tháng 11',
                                'Tháng 12',
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
                                                    7
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    7
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    7
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    7
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    8
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    8
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    8
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    8
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    9
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    9
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    9
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    9
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    10
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    10
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    10
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    10
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    11
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    11
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    11
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    11
                                                ).length,
                                            ],
                                        },
                                        {
                                            y: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    12
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    12
                                                ).length,
                                            ],
                                            marker: [
                                                this.filterData(
                                                    this.state.todo,
                                                    true,
                                                    12
                                                ).length,
                                                this.filterData(
                                                    this.state.todo,
                                                    false,
                                                    12
                                                ).length,
                                            ],
                                        },
                                    ],
                                    label: `Thống kê công việc năm ${today.getFullYear()}`,
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
        marginTop: 20,
    },
    chart: {
        flex: 1,
    },
})

export default WeekStackBarChar
