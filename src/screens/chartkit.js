/*Example of React Native Chart Kit*/
import * as React from 'react'
//import React
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from 'react-native'
import firebase from '../database/firebase'
import moment from 'moment'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit'
import NetInfo from '@react-native-community/netinfo'
import Statistic from '../components/statistic'
import WeekStackBarChar from '../components/WeekStackBarChar'
import MonthStartStackBarChar from '../components/MonthStartStackBarChar'
//import React Native chart Kit for different kind of Chart
var today = new Date()

const renderMonth = (num) => {
    let currentDate = moment()
    let futureMonth = moment().add(num, 'M')
    let futureMonthEnd = moment(futureMonth).endOf('month')

    if (
        currentDate.date() != futureMonth.date() &&
        futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
    ) {
        futureMonth = futureMonth.add(1, 'd')
    }
    return futureMonth
}

export default class ChartKit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // userid: firebase.auth().currentUser.uid,
            userid: firebase.auth().currentUser.uid,
            color: [],
            title: [],
            taskNonCompletedHT: 1,
            taskNonCompletedPrev1: 0,
            taskNonCompletedPrev2: 0,
            taskNonCompletedPrev3: 0,
            numberHT: [],
            numberPrev1: [],
            numberPrev2: [],
            numberPrev3: [],
        }
    }
    getAllColor = (id, timestart, timeend) => {
        firebase
            .firestore()
            .collection('colors')
            .where('userid', '==', id + '')
            .onSnapshot((querySnapshot) => {
                let arr = []
                querySnapshot.forEach(function (doc) {
                    arr.push({
                        key: doc.id,
                        // data: doc.data(),
                        ...doc.data(),
                    })
                })
                this.getTaskNonCompleted(id, timestart, timeend).then((num) =>
                    this.setState({ taskNonCompletedHT: num })
                )

                this.getTaskNonCompleted(
                    id,
                    `${today.getFullYear()}/${today.getMonth()}/01`,
                    `${today.getFullYear()}/${today.getMonth() + 1}/01`
                ).then((num) => this.setState({ taskNonCompletedPrev1: num }))

                this.getTaskNonCompleted(
                    id,
                    `${today.getFullYear()}/${today.getMonth() - 1}/01`,
                    `${today.getFullYear()}/${today.getMonth()}/01`
                ).then((num) => this.setState({ taskNonCompletedPrev2: num }))

                this.getTaskNonCompleted(
                    id,
                    `${today.getFullYear()}/${today.getMonth() - 2}/01`,
                    `${today.getFullYear()}/${today.getMonth() - 1}/01`
                ).then((num) => this.setState({ taskNonCompletedPrev3: num }))

                let arrNum = []
                let arrNumPrev1 = []
                let arrNumPrev2 = []
                let arrNumPrev3 = []
                let arrColor = []
                let arrTitle = []
                for (let i = 0; i < arr.length; i++) {
                    // console.log(arr[i].key)
                    this.getAllTaskByColorIdAndUserId(
                        arr[i].key,
                        arr[i].userid,
                        timestart,
                        timeend
                    ).then((num) => {
                        arrNum.push(num)
                        arrColor.push(arr[i].color)
                        arrTitle.push(arr[i].label)
                        this.setState({
                            numberHT: arrNum,
                            color: arrColor,
                            title: arrTitle,
                        })
                    })
                    this.getAllTaskByColorIdAndUserId(
                        arr[i].key,
                        arr[i].userid,
                        `${today.getFullYear()}/${today.getMonth()}/01`,
                        `${today.getFullYear()}/${today.getMonth() + 1}/01`
                    ).then((num) => {
                        arrNumPrev1.push(num)
                        this.setState({
                            numberPrev1: arrNumPrev1,
                        })
                    })
                    this.getAllTaskByColorIdAndUserId(
                        arr[i].key,
                        arr[i].userid,
                        `${today.getFullYear()}/${today.getMonth() - 1}/01`,
                        `${today.getFullYear()}/${today.getMonth()}/01`
                    ).then((num) => {
                        arrNumPrev2.push(num)
                        this.setState({
                            numberPrev2: arrNumPrev2,
                        })
                    })
                    this.getAllTaskByColorIdAndUserId(
                        arr[i].key,
                        arr[i].userid,
                        `${today.getFullYear()}/${today.getMonth() - 2}/01`,
                        `${today.getFullYear()}/${today.getMonth() - 1}/01`
                    ).then((num) => {
                        arrNumPrev3.push(num)
                        this.setState({
                            numberPrev3: arrNumPrev3,
                        })
                    })
                }
            })
    }

    // lấy số lượng công việc hoàn thành
    getAllTaskByColorIdAndUserId = (colorID, userID, timestart, timeend) => {
        return firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', userID + '')
            .where('colorid', '==', colorID + '')
            .where('isCompleted', '==', true)
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
                return 0
            })
    }

    getTaskNonCompleted = (userID, timestart, timeend) => {
        return firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', userID + '')
            .where('isCompleted', '==', false)
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
                return 0
            })
    }

    unsubscribe = NetInfo.addEventListener((state) => {
        this.setState({ isLoading: !state.isConnected })
    })

    componentDidMount() {
        // this.getAllColor(
        //     this.state.userid,
        //     `${today.getFullYear()}/${today.getMonth() + 1}/01`,
        //     `${today.getFullYear()}/${today.getMonth() + 2}/01`
        // )
        this.unsubscribe
        // this.getAllTaskByColorIdAndUserId(
        //     'VeLR0AWygEdFcIQ8WQjT',
        //     'vHWoFPdFbMcmmcv0gmavkdeJZWb2'
        // ).then((tasks) => {
        //     console.log(tasks)
        // })
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
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
                <StatusBar barStyle={'dark-content'} />
                <View style={styles.container}>
                    <View
                        style={{
                            flex: 1,
                            alignItem: 'space-between',
                        }}
                    >
                        {/*Example of StackedBar Chart*/}
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 18,
                                paddingBottom: 12,
                                // marginTop: 16,
                            }}
                        >
                            Thống kê công việc
                        </Text>
                        <ScrollView style={{ height: 200 }}>
                            {/* <Statistic /> */}
                            <WeekStackBarChar />
                            <MonthStartStackBarChar />
                        </ScrollView>
                        {/* <StackedBarChart
                                data={{
                                    labels: [
                                        `${today.getMonth() - 2}/${
                                            today.getYear() - 100
                                        }`,
                                        `${today.getMonth() - 1}/${
                                            today.getYear() - 100
                                        }`,
                                        `${today.getMonth()}/${
                                            today.getYear() - 100
                                        }`,
                                        `${today.getMonth() + 1}/${
                                            today.getYear() - 100
                                        }`,
                                    ],
                                    legend: [...this.state.title, 'không'],
                                    data: [
                                        [
                                            ...this.state.numberPrev3,
                                            this.state.taskNonCompletedPrev3,
                                        ],
                                        [
                                            ...this.state.numberPrev2,
                                            this.state.taskNonCompletedPrev2,
                                        ],
                                        [
                                            ...this.state.numberPrev1,
                                            this.state.taskNonCompletedPrev1,
                                        ],
                                        [
                                            ...this.state.numberHT,
                                            this.state.taskNonCompletedHT,
                                        ],
                                    ],
                                    barColors: [...this.state.color, '#a3b0be'],
                                }}
                                width={Dimensions.get('window').width - 16}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#1cc910',
                                    backgroundGradientFrom: '#eff3ff',
                                    backgroundGradientTo: '#efefef',
                                    decimalPlaces: 2,
                                    color: (opacity = 1) =>
                                        `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                style={{
                                    // padding: 20,
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                            /> */}
                        <View></View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
        // paddingTop: 25,
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
