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
    TouchableOpacity,
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
//import React Native chart Kit for different kind of Chart
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

export default class Statistic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // userid: firebase.auth().currentUser.uid,
            userid: firebase.auth().currentUser.uid,
            color: [],
            title: [],
            taskNonCompletedHT: 0,
            taskNonCompletedPrev1: 0,
            taskNonCompletedPrev2: 0,
            taskNonCompletedPrev3: 0,
            number: 0,
            numberHT: [],
            numberPrev1: [],
            numberPrev2: [],
            numberPrev3: [],
        }
    }
    getAllColor = (id) => {
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
                this.getTaskNonCompleted(
                    id,
                    renderDay(checkThu2() + this.state.number),
                    renderDay(checkThu2() + 7 + this.state.number)
                ).then((num) => this.setState({ taskNonCompletedHT: num }))

                this.getTaskNonCompleted(
                    id,
                    renderDay(checkThu2() - 7 + this.state.number),
                    renderDay(checkThu2() + this.state.number)
                ).then((num) => this.setState({ taskNonCompletedPrev1: num }))

                this.getTaskNonCompleted(
                    id,
                    renderDay(checkThu2() - 14 + this.state.number),
                    renderDay(checkThu2() - 7 + this.state.number)
                ).then((num) => this.setState({ taskNonCompletedPrev2: num }))

                this.getTaskNonCompleted(
                    id,
                    renderDay(checkThu2() - 21 + this.state.number),
                    renderDay(checkThu2() - 14 + this.state.number)
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
                        renderDay(checkThu2() + this.state.number),
                        renderDay(checkThu2() + 7 + this.state.number)
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
                        renderDay(checkThu2() - 7 + this.state.number),
                        renderDay(checkThu2() + this.state.number)
                    ).then((num) => {
                        arrNumPrev1.push(num)
                        this.setState({
                            numberPrev1: arrNumPrev1,
                        })
                    })
                    this.getAllTaskByColorIdAndUserId(
                        arr[i].key,
                        arr[i].userid,
                        renderDay(checkThu2() - 14 + this.state.number),
                        renderDay(checkThu2() - 7 + this.state.number)
                    ).then((num) => {
                        arrNumPrev2.push(num)
                        this.setState({
                            numberPrev2: arrNumPrev2,
                        })
                    })
                    this.getAllTaskByColorIdAndUserId(
                        arr[i].key,
                        arr[i].userid,
                        renderDay(checkThu2() - 21 + this.state.number),
                        renderDay(checkThu2() - 14 + this.state.number)
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
                return null
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
                return null
            })
    }

    componentDidMount() {
        this.getAllColor(this.state.userid)

        // this.getAllTaskByColorIdAndUserId(
        //     'VeLR0AWygEdFcIQ8WQjT',
        //     'vHWoFPdFbMcmmcv0gmavkdeJZWb2'
        // ).then((tasks) => {
        //     console.log(tasks)
        // })
    }

    layoutNull = () => {
        return (
            <View>
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
                                    number: state.number - 28,
                                }),
                                () => {
                                    this.getAllColor(this.state.userid)
                                }
                            )
                        }}
                    >
                        <Text style={{ color: 'white' }}>
                            {'< bốn tuần trước'}
                        </Text>
                    </TouchableOpacity>
                    {/* Tuan hien tai */}
                    <TouchableOpacity
                        style={styles.buttonSlide}
                        onPress={() => {
                            this.setState({ number: 0 }, () => {
                                this.getAllColor(this.state.userid)
                            })
                        }}
                    >
                        <Text style={{ color: 'white' }}>
                            {'tuần hiện tại'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        padding: 10,
                        // marginTop: 16,
                    }}
                >
                    Không có dữ liệu
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        padding: 10,
                        // marginTop: 16,
                    }}
                >
                    Thống kê công việc{' '}
                    {renderDay(checkThu2() - 21 + this.state.number, true)} -{' '}
                    {renderDay(checkThu2() + 6 + this.state.number, true)}/
                    {today.getFullYear()}
                </Text>
            </View>
        )
    }

    render() {
        if (
            this.state.taskNonCompletedHT == null &&
            this.state.taskNonCompletedPrev1 == null &&
            this.state.taskNonCompletedPrev2 == null &&
            this.state.taskNonCompletedPrev3 == null
        ) {
            return this.layoutNull()
        } else if (
            this.state.taskNonCompletedHT == null &&
            this.state.taskNonCompletedPrev1 == 0 &&
            this.state.taskNonCompletedPrev2 == 0 &&
            this.state.taskNonCompletedPrev3 == 0
        ) {
            return this.layoutNull()
        } else if (
            this.state.taskNonCompletedHT == null &&
            this.state.taskNonCompletedPrev1 == null &&
            this.state.taskNonCompletedPrev2 == 0 &&
            this.state.taskNonCompletedPrev3 == 0
        ) {
            return this.layoutNull()
        } else if (
            this.state.taskNonCompletedHT == null &&
            this.state.taskNonCompletedPrev1 == null &&
            this.state.taskNonCompletedPrev2 == null &&
            this.state.taskNonCompletedPrev3 == 0
        ) {
            return this.layoutNull()
        } else if (
            this.state.taskNonCompletedHT == 0 &&
            this.state.taskNonCompletedPrev1 == 0 &&
            this.state.taskNonCompletedPrev2 == 0 &&
            this.state.taskNonCompletedPrev3 == 0
        ) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        } else {
            console.log(this.state.taskNonCompletedHT)
            console.log(this.state.taskNonCompletedPrev1)
            console.log(this.state.taskNonCompletedPrev2)
            console.log(this.state.taskNonCompletedPrev3)
            return (
                <View>
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
                                        number: state.number - 28,
                                    }),
                                    () => {
                                        this.getAllColor(this.state.userid)
                                    }
                                )
                            }}
                        >
                            <Text style={{ color: 'white' }}>
                                {'< bốn tuần trước'}
                            </Text>
                        </TouchableOpacity>
                        {/* Tuan hien tai */}
                        <TouchableOpacity
                            style={styles.buttonSlide}
                            onPress={() => {
                                this.setState({ number: 0 }, () => {
                                    this.getAllColor(this.state.userid)
                                })
                            }}
                        >
                            <Text style={{ color: 'white' }}>
                                {'tuần hiện tại'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <StackedBarChart
                        data={{
                            labels: [
                                `${renderDay(
                                    checkThu2() - 21 + this.state.number,
                                    true
                                )}`,
                                `${renderDay(
                                    checkThu2() - 14 + this.state.number,
                                    true
                                )}`,
                                `${renderDay(
                                    checkThu2() - 7 + this.state.number,
                                    true
                                )}`,
                                `${renderDay(
                                    checkThu2() + this.state.number,
                                    true
                                )}`,
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
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            // padding: 20,
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 14,
                            padding: 10,
                            // marginTop: 16,
                        }}
                    >
                        Thống kê công việc{' '}
                        {renderDay(checkThu2() - 21 + this.state.number, true)}{' '}
                        - {renderDay(checkThu2() + 6 + this.state.number, true)}
                        /{today.getFullYear()}
                    </Text>
                </View>
            )
        }
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
    buttonSlide: {
        backgroundColor: '#0074D6',
        padding: 5,
        borderRadius: 15,
        flex: 1,
        margin: 5,
        alignItems: 'center',
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
