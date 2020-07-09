import React from 'react'
import { AppRegistry, StyleSheet, Text, View, processColor } from 'react-native'

import { BarChart } from 'react-native-charts-wrapper'
import firebase from '../database/firebase'
import moment from 'moment'

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

class WeekGroupBarChart extends React.Component {
    constructor() {
        super()

        this.state = {
            userid: firebase.auth().currentUser.uid,
            color: [],
            title: [],
            todo: [],
        }
    }

    getTaskCompleted = (userID, isCompleted, timestart, timeend) => {
        return firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', userID + '')
            .where('isCompleted', '==', isCompleted)
            .where('time', '>=', new Date(timestart))
            .where('time', '<', new Date(timeend))
            .get()
            .then((querySnapshot) => {
                return querySnapshot.docs.length == 0
                    ? null
                    : querySnapshot.docs.length
            })
            .catch((error) => {
                console.log(error)
                return null
            })
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

    componentDidMount() {
        // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
        // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
        // so 4 should be used as dataIndex to highlight bubble data.

        // if there is only bar, bubble in this combined chart.
        // 1 should be used as dataIndex to highlight bubble data.

        // this.setState({
        //     ...this.state,
        //     highlights: [
        //         { x: 1, y: 40 },
        //         { x: 2, y: 50 },
        //     ],
        // })
        this.getTaskWeek(
            this.state.userid,
            nextDate(checkThu2() + this.state.number),
            nextDate(checkCN() + 1 + this.state.number)
        )
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <View style={{ height: 80 }}>
                    <Text> selected entry</Text>
                    <Text> {this.state.selectedEntry}</Text>
                </View> */}

                <View style={styles.container}>
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
                            axisMaximum: 7,
                            axisMinimum: 0,
                            centerAxisLabels: true,
                        }}
                        data={{
                            dataSets: [
                                {
                                    values: [5, 5],
                                    label: 'Hoàn thành',
                                    config: {
                                        drawValues: false,
                                        colors: [processColor('blue')],
                                    },
                                },
                                {
                                    values: [40, 5],
                                    label: 'Không hoàn thành',
                                    config: {
                                        drawValues: false,
                                        colors: [processColor('gray')],
                                    },
                                },
                            ],
                            config: {
                                barWidth: 0.2,
                                group: {
                                    fromX: 0,
                                    groupSpace: 0.1,
                                    barSpace: 0.1,
                                },
                            },
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
                        // onSelect={this.handleSelect.bind(this)}
                        // onChange={(event) => console.log(event.nativeEvent)}
                        // highlights={this.state.highlights}
                        marker={{
                            enabled: true,
                            markerColor: processColor('#F0C0FF8C'),
                            textColor: processColor('white'),
                            markerFontSize: 14,
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    chart: {
        flex: 1,
    },
})

export default WeekGroupBarChart
