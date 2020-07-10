import React from 'react'
import {
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Dimensions,
} from 'react-native'
import moment from 'moment'
import firebase from '../database/firebase'
import TaskItem from './taskitem'
import AntDesign from 'react-native-vector-icons/AntDesign'
const windowWidth = Dimensions.get('window').width / 8 - 1

const updateTask = (id, item) => {
    const { isCompleted } = item
    let todoTime = new Date(item.time.toDate()).getTime()
    let currentTime = new Date(
        new Date(moment(Date.now()).add(-12, 'hours'))
    ).getTime()
    if (todoTime > new Date(Date.now()).getTime()) {
        Alert.alert(
            'Thông báo',
            'Công việc này chưa tới, không thể cập nhật trạng thái'
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

const deleteTask = (key) => {
    const dbRef = firebase.firestore().collection('tasks').doc(key)
    dbRef.delete().then((res) => {
        console.log('Item removed from database')
    })
}

const ListTaskItem = ({ data, currentday, hour, date, render, navigation }) => (
    <View>
        <FlatList
            data={data}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('UpdateTask', {
                            taskid: item.key,
                            data: item.data,
                        })
                    }}
                    key={item.key}
                >
                    <TaskItem
                        title={item.title}
                        time={item.time.toDate()}
                        index={index}
                        length={data.length}
                        isCompleted={item.isCompleted}
                        onSwipeFromLeft={() => {
                            Alert.alert(
                                'Thông báo',
                                'Bạn có chắc hoàn thành công việc này chưa?',
                                [
                                    {
                                        text: 'Huỷ bỏ',
                                        onPress: () =>
                                            console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Đồng ý',
                                        onPress: () =>
                                            updateTask(item.key, item.data),
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                        onRightPress={() => {
                            // this.deleteGroup(item.key);
                            // this.setState({
                            //     keyTaskCurrent: item.key,
                            // })
                            // this.ActionSheet.show()
                            Alert.alert(
                                'Cảnh báo',
                                'Dữ liệu sẽ bị xoá vĩnh viễn',
                                [
                                    {
                                        text: 'Huỷ bỏ',
                                        onPress: () =>
                                            console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Đồng ý',
                                        onPress: () => deleteTask(item.key),
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                        colorid={item.colorid}
                    />
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
        />
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('AddTaskQuick', {
                    date: date,
                    render: render,
                    hour: hour,
                })
            }}
            style={[
                styles.taskListContent,
                {
                    height:
                        data.length != 0 || currentday !== true
                            ? 0
                            : 1062 / 18 - 2,
                    backgroundColor: '#FFF',
                },
            ]}
        >
            <AntDesign
                name={'plus'}
                size={24}
                color={'#efefef'}
                style={{
                    width: 24,
                    // marginRight: 10,
                }}
            />
            {/* <Text>{hour}</Text> */}
        </TouchableOpacity>
    </View>
)

export default ListTaskItem

const styles = StyleSheet.create({
    taskListContent: {
        height: 0,
        // flex: 2,
        // marginLeft: 1,
        // marginRight: 1,
        width: windowWidth,
        // width: 110,
        alignSelf: 'center',
        // borderRadius: 10,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        // marginTop: 1,
        // marginBottom: 1,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 5,
        // shadowOpacity: 0.5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
