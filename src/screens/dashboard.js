// components/dashboard.js

import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
    StatusBar,
    ActivityIndicator,
} from 'react-native'
import moment from 'moment'
import firebase from '../database/firebase'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Dialog from 'react-native-dialog'
import ActionSheet from 'react-native-actionsheet'
import NetInfo from '@react-native-community/netinfo'

import Header from '../components/headercomponent.js'
import GroupTask from '../components/grouptaskcomponent.js'
import TaskComponent from '../components/taskcomponent'

const ProfileItem = ({ icon, name, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <MaterialCommunityIcons name={icon} size={30} color="#1e1e1e" />
        <Text style={[styles.itemText, { marginLeft: icon ? 20 : 0 }]}>
            {name}
        </Text>
        <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
    </TouchableOpacity>
)

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

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.dbRef = firebase.firestore().collection('groups')
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid,
            dialogVisible: false,
            groupname: '',
            arrColor: [],
            keyGroupCurrent: '',
            isModalVisible: false,
            todoList: [],
        }
    }

    storeGroup() {
        if (this.state.groupname === '') {
            alert('Fill at least your name!')
        } else {
            this.setState({
                isLoading: true,
            })
            this.dbRef
                .add({
                    groupname: this.state.groupname,
                    userid: this.state.uid,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((res) => {
                    this.refreshGroup()
                })
                .catch((err) => {
                    console.error('Error found: ', err)
                    this.setState({
                        isLoading: false,
                    })
                })
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
                        data: doc.data(),
                        ...doc.data(),
                    })
                })
                this.setState({
                    arrColor: arr,
                    isLoading: false,
                })
            })
    }

    getTask = (id, datebegin, dateend) => {
        firebase
            .firestore()
            .collection('tasks')
            .where('userid', '==', id + '')
            .where('isCompleted', '==', false)
            .where('time', '>=', new Date(datebegin))
            .where('time', '<', new Date(dateend))
            .orderBy('time')
            .onSnapshot((querySnapshot) => {
                let todo = []
                querySnapshot.forEach(function (doc) {
                    todo.push({
                        key: doc.id,
                        data: doc.data(),
                        ...doc.data(),
                    })
                })
                this.setState({ todoList: todo })
            })
    }

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.props.navigation.navigate('Login')
            })
            .catch((error) => this.setState({ errorMessage: error.message }))
    }

    showDialog = () => {
        this.setState({ dialogVisible: true })
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false })
    }

    handleSave = () => {
        this.setState({ dialogVisible: false })
        this.storeGroup()
    }

    unsubscribe = NetInfo.addEventListener((state) => {
        this.setState({ isLoading: !state.isConnected })
    })

    componentDidMount() {
        this.unsubscribe
        this.getTask(this.state.uid, nextDate(0), nextDate(1))
        this.getAllColor(this.state.uid)
        setTimeout(() => {
            this.setState({ isModalVisible: true })
        }, 1000)
        // this.unsubscribe = this.dbRef.onSnapshot(this.getCollection);
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    // getCollection = querySnapshot => {
    //   const groupArr = [];
    //   querySnapshot.forEach(res => {
    //     const {groupname, userid} = res.data();
    //     groupArr.push({
    //       key: res.id,
    //       // res,
    //       groupname,
    //       userid,
    //     });
    //   });
    //   this.setState({
    //     groupArr,
    //   });
    // };

    // getGroupByUserId = id => {
    //   firebase
    //     .firestore()
    //     .collection('groups')
    //     .where('userid', '==', id + '')
    //     .orderBy('timestamp')
    //     .onSnapshot(querySnapshot => {
    //       if (querySnapshot) {
    //         const groupArr = [];
    //         querySnapshot.forEach(res => {
    //           groupArr.push({
    //             key: res.id,
    //             ...res.data(),
    //           });
    //         });
    //         this.setState({
    //           groupArr,
    //         });
    //       }
    //     });
    // };
    refreshGroup() {
        this.getGroupByUserId(this.state.uid).then((groups) => {
            this.setState({ groupArr: groups })
        })
    }
    getGroupByUserId = (id) => {
        return firebase
            .firestore()
            .collection('groups')
            .where('userid', '==', id + '')
            .orderBy('timestamp')
            .get()
            .then((querySnapshot) => {
                return querySnapshot.docs.map((i) => ({
                    key: i.id,
                    ...i.data(),
                }))
            })
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    deleteGroup = (key) => {
        const dbRef = firebase.firestore().collection('groups').doc(key)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
            this.refreshGroup()
        })
    }

    getTaskByColorId = (id) => {
        return firebase
            .firestore()
            .collection('tasks')
            .where('colorid', '==', id + '')
            .get()
            .then((querySnapshot) => {
                return querySnapshot.docs.map((i) => ({
                    key: i.id,
                    ...i.data(),
                }))
            })
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    deleteColor = (key) => {
        const dbRef = firebase.firestore().collection('colors').doc(key)
        dbRef.delete().then((res) => {
            // this.props.navigation.goBack()
        })
    }

    updateTask = (id, item) => {
        const { isCompleted } = item
        let todoTime = new Date(item.time.toDate()).getTime()
        let currentTime = new Date(
            new Date(moment(Date.now()).add(-12, 'hours'))
        ).getTime()
        if (
            todoTime < currentTime ||
            todoTime > new Date(Date.now()).getTime()
        ) {
            Alert.alert(
                'Thông báo',
                'Công việc này đã qua 12 giờ hoặc chưa tới, không thể cập nhật trạng thái'
            )
        } else {
            const updateDBRef = firebase.firestore().collection('tasks').doc(id)
            updateDBRef
                .set({
                    ...item,
                    isCompleted: !isCompleted,
                })
                .then((docRef) => {
                    // this.props.navigation.goBack()
                })
                .catch((error) => {
                    console.error('Error: ', error)
                    // this.setState({
                    //     isLoading: false,
                    // })
                })
        }
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => null}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.cardMain}>
                            <View style={{ margin: 15 }}>
                                <Text
                                    style={{
                                        fontSize: 26,
                                        fontWeight: '500',
                                    }}
                                >
                                    Công việc còn lại hôm nay
                                </Text>
                            </View>
                            <View
                                style={[styles.seperator, { marginBottom: 10 }]}
                            ></View>
                            <FlatList
                                data={this.state.todoList}
                                renderItem={({ item }) => (
                                    <TaskComponent
                                        title={item.title}
                                        time={item.time.toDate()}
                                        isCompleted={item.isCompleted}
                                        onSwipeFromLeft={() => {
                                            Alert.alert(
                                                'Thông báo',
                                                'Bạn có chắc hoàn thành công việc này chưa?',
                                                [
                                                    {
                                                        text: 'Huỷ bỏ',
                                                        onPress: () =>
                                                            console.log(
                                                                'Cancel Pressed'
                                                            ),
                                                        style: 'cancel',
                                                    },
                                                    {
                                                        text: 'Đồng ý',
                                                        onPress: () =>
                                                            this.updateTask(
                                                                item.key,
                                                                item.data
                                                            ),
                                                    },
                                                ],
                                                { cancelable: false }
                                            )
                                        }}
                                        notes={item.notes}
                                        colorid={item.colorid}
                                    />
                                )}
                                keyExtractor={(item) => item.key}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.createTaskButton,
                                    {
                                        backgroundColor: 'green',
                                    },
                                ]}
                                onPress={() => {
                                    this.setState({
                                        isModalVisible: false,
                                    })
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 24,
                                        textAlign: 'center',
                                        color: '#fff',
                                    }}
                                >
                                    Bắt đầu ngay
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.screenContainer}>
                    {/* <Text style={styles.textStyle}>Hello, {this.state.displayName}</Text>
        <Button color="#3740FE" title="Logout" onPress={() => this.signOut()} /> */}
                    <Header
                        title={this.state.displayName}
                        iconLeft="user"
                        iconRight="search1"
                        onPress={() => {
                            Alert.alert(
                                'Thông báo',
                                'Xác nhận đăng xuất tài khoản',
                                [
                                    {
                                        text: 'Huỷ bỏ',
                                        onPress: () =>
                                            console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Đồng ý',
                                        onPress: () => this.signOut(),
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                    />
                    {/* onPress={() => {
                                    this.props.navigation.navigate(
                                        'TaskCalendar',
                                        {
                                            userid: this.state.uid,
                                        }
                                    )
                                }} */}
                    {/* <ScrollView> */}
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => {
                                this.props.navigation.navigate('TaskCalendar', {
                                    userid: this.state.uid,
                                })
                            }}
                        >
                            <Fontisto
                                name={'day-sunny'}
                                size={30}
                                color="#1e1e1e"
                            />
                            <Text style={[styles.itemText, { marginLeft: 20 }]}>
                                Xem công việc theo ngày
                            </Text>
                            <FontAwesome
                                name="angle-right"
                                size={26}
                                color="#1e1e1e"
                            />
                        </TouchableOpacity>
                        <View style={styles.seperator}></View>
                        <ProfileItem
                            icon="calendar-today"
                            name="Xem công việc theo tuần"
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'Calendarscreen',
                                    {
                                        userid: this.state.uid,
                                    }
                                )
                            }}
                        />
                        <View style={styles.seperator}></View>
                        <ProfileItem
                            icon="chart-bar"
                            name="Xem thống kê"
                            onPress={() => {
                                this.props.navigation.navigate('ChartKit', {
                                    userid: this.state.uid,
                                })
                            }}
                        />
                        <View style={styles.seperator}></View>
                        <ProfileItem
                            icon="select-color"
                            name="Quản lý màu nhãn"
                            onPress={() => {
                                this.props.navigation.navigate('ColorList', {
                                    userid: this.state.uid,
                                })
                            }}
                        />
                        {/* <ProfileItem icon="alarm-check" name="Công việc quan trọng" /> */}

                        {/*  */}
                        <View style={styles.divider} />
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => {
                                this.setState({
                                    isModalVisible: true,
                                })
                            }}
                        >
                            <Text style={styles.itemText}>
                                Công việc còn lại hôm nay
                            </Text>
                            {/* <FontAwesome name="angle-right" size={26} color="#1e1e1e" /> */}
                        </TouchableOpacity>
                        {/* <View style={styles.divider} />
                        <FlatList
                            data={this.state.arrColor}
                            renderItem={({ item }) => (
                                <GroupTask
                                    icon="invert-colors"
                                    name={item.label}
                                    color={item.color}
                                    onRightPress={() => {
                                        // this.deleteGroup(item.key);
                                        this.setState({
                                            keyGroupCurrent: item.key,
                                        })
                                        this.ActionSheet.show()
                                    }}
                                    // onRightPress={() => this.ActionSheet.show()}
                                    onClick={() => {
                                        this.props.navigation.navigate(
                                            'UpdateColor',
                                            {
                                                id: item.key,
                                                data: item.data,
                                            }
                                        )
                                    }}
                                />
                            )}
                            keyExtractor={(item) => item.key}
                        />
                        <ActionSheet
                            ref={(o) => (this.ActionSheet = o)}
                            title={'Dữ liệu sẽ bị xoá vĩnh viễn!'}
                            options={['Xoá màu này', 'Huỷ bỏ']}
                            cancelButtonIndex={1}
                            destructiveButtonIndex={0}
                            onPress={(index) => {
                                if (index == 0) {
                                    this.getTaskByColorId(
                                        this.state.keyGroupCurrent
                                    ).then((task) => {
                                        if (task.length == 0) {
                                            this.deleteColor(
                                                this.state.keyGroupCurrent
                                            )
                                        } else {
                                            Alert.alert(
                                                'Thông báo',
                                                'Màu này không thể xoá được',
                                                [
                                                    {
                                                        text: 'OK',
                                                        onPress: () =>
                                                            console.log(
                                                                'OK Pressed'
                                                            ),
                                                    },
                                                ],
                                                { cancelable: false }
                                            )
                                        }
                                    })
                                    // this.deleteColor(this.state.keyGroupCurrent)
                                    // console.log(this.state.keyGroupCurrent)
                                }
                            }}
                        /> */}
                    </View>
                    {/* </ScrollView> */}
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => {
                            this.props.navigation.navigate('Addtask', {
                                userid: this.state.uid,
                            })
                        }}
                    >
                        <MaterialCommunityIcons
                            name="shape-square-plus"
                            size={30}
                            color="gray"
                        />
                        <Text
                            style={[
                                styles.itemText,
                                {
                                    marginLeft: 20,
                                    color: 'gray',
                                },
                            ]}
                        >
                            Thêm mới công việc{' '}
                        </Text>
                        {/* <FontAwesome name="angle-right" size={26} color="#1e1e1e" /> */}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        // backgroundColor: '#ededed',
    },
    //
    userContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 22,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e88e5',
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    welcomeText: {
        color: '#828282',
    },
    authText: {
        color: '#1e88e5',
        fontSize: 18,
        fontWeight: '500',
    },
    //
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
    },
    itemText: {
        flex: 1,
        color: '#1e1e1e',
        fontSize: 20,
    },
    //
    divider: {
        height: 5,
    },
    seperator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        // marginVertical: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    cardMain: {
        position: 'absolute',
        // top: 100,
        height: 500,
        width: 300,
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: 20,
        // backgroundColor: '#ffffff',
        // alignSelf: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 15,
        alignItems: 'center',
        shadowColor: 'green',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    createTaskButton: {
        width: 275,
        height: 58,
        alignSelf: 'center',
        marginBottom: 15,
        borderRadius: 10,
        justifyContent: 'center',
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
