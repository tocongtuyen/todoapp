import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    Modal,
    TextInput,
    Alert,
    Switch,
    StatusBar,
    SafeAreaView,
} from 'react-native'
import moment from 'moment'
import TaskItem from '../components/taskitem.js'
import Header from '../components/headercomponent.js'
import DateTimePicker from 'react-native-modal-datetime-picker'
import firebase from '../database/firebase'
import ActionSheet from 'react-native-actionsheet'
const { width: vw } = Dimensions.get('window')
import GroupTask from '../components/grouptaskcomponent.js'

export default class colorlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: firebase.auth().currentUser.uid,
            arrColor: [],
            // datesWhitelist: [
            //     {
            //         start: moment(),
            //         end: moment().add(365, 'days'), // total 4 days enabled
            //     },
            // ],
            // todoList: [],
            // markedDate: [],
            // currentDate: `${moment().format('YYYY')}-${moment().format(
            //     'MM'
            // )}-${moment().format('DD')}`,
            // isModalVisible: false,
            // selectedTask: null,
            // isDateTimePickerVisible: false,
            // keyTaskCurrent: '',
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

    componentDidMount() {
        this.getAllColor(this.state.uid)
    }

    render() {
        const {
            state: {
                userid,
                datesWhitelist,
                markedDate,
                todoList,
                isModalVisible,
                selectedTask,
                isDateTimePickerVisible,
                currentDate,
            },
            props: { navigation },
        } = this
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
                <StatusBar barStyle={'dark-content'} />
                <View
                    style={{
                        flex: 1,
                        //   paddingTop: 20,
                    }}
                >
                    <View style={styles.backButton}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{
                                // marginRight: vw / 2 - 120,
                                marginLeft: 20,
                            }}
                        >
                            <Image
                                style={{ height: 25, width: 40 }}
                                source={require('../assets/back.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={styles.newTask}>Danh sách nhãn</Text>
                        <View
                            style={{
                                width: 40,
                            }}
                        ></View>
                    </View>
                    {/* nut them để chuyển sang màng hình thêm task */}
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('AddColor')
                        }}
                        style={styles.viewTask}
                    >
                        <Image
                            source={require('../assets/plus.png')}
                            style={{
                                height: 30,
                                width: 30,
                            }}
                        />
                    </TouchableOpacity>
                    {/*  */}
                    <View
                        style={{
                            width: '100%',
                            height: Dimensions.get('window').height - 170,
                        }}
                    >
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: 20,
                            }}
                        >
                            <View style={{ marginTop: 20 }}>
                                <View style={styles.seperator}></View>
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
                                                        this.state
                                                            .keyGroupCurrent
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
                                                        {
                                                            cancelable: false,
                                                        }
                                                    )
                                                }
                                            })
                                            // this.deleteColor(this.state.keyGroupCurrent)
                                            // console.log(this.state.keyGroupCurrent)
                                        }
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    taskListContent: {
        height: 100,
        width: 327,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginBottom: 10,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewTask: {
        position: 'absolute',
        bottom: 40,
        right: 17,
        height: 60,
        width: 60,
        backgroundColor: '#2E66E7',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2E66E7',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 30,
        shadowOpacity: 0.5,
        elevation: 5,
        zIndex: 999,
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        width: 100,
        height: 38,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center',
    },
    updateButton: {
        backgroundColor: '#2E66E7',
        width: 100,
        height: 38,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 20,
    },
    sepeerator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        marginVertical: 20,
    },
    notesContent: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        marginVertical: 20,
    },
    learn: {
        height: 23,
        width: 51,
        backgroundColor: '#F8D557',
        justifyContent: 'center',
        borderRadius: 5,
    },
    design: {
        height: 23,
        width: 59,
        backgroundColor: '#62CCFB',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 7,
    },
    readBook: {
        height: 23,
        width: 83,
        backgroundColor: '#4CD565',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 7,
    },
    title: {
        height: 25,
        borderColor: '#5DD976',
        borderLeftWidth: 1,
        paddingLeft: 8,
        fontSize: 19,
    },
    taskContainer: {
        height: 475,
        width: 327,
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 20,
        shadowOpacity: 0.2,
        elevation: 5,
        padding: 22,
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 60,
        width: '100%',
        alignItems: 'center',
    },
    newTask: {
        alignSelf: 'center',
        fontSize: 20,
        // width: 120,
        height: 25,
        textAlign: 'center',
    },
    cardMain: {
        position: 'absolute',
        top: 100,
        width: 327,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    seperator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        // marginVertical: 5,
    },
})
