import React from 'react'
import {
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native'
import moment from 'moment'
import firebase from '../database/firebase'
import TaskItem from './taskitem'

const updateTask = (id, item) => {
    const { isCompleted } = item
    let todoTime = new Date(item.time.toDate()).getTime()
    let currentTime = new Date(
        new Date(moment(Date.now()).add(-12, 'hours'))
    ).getTime()
    if (todoTime < currentTime || todoTime > new Date(Date.now()).getTime()) {
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

const deleteTask = (key) => {
    const dbRef = firebase.firestore().collection('tasks').doc(key)
    dbRef.delete().then((res) => {
        console.log('Item removed from database')
    })
}

const ListTaskItem = ({ data, navigation }) => (
    <ScrollView>
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
                            isCompleted={item.isCompleted}
                            onSwipeFromLeft={() =>
                                updateTask(item.key, item.data)
                            }
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
        </View>
    </ScrollView>
)

export default ListTaskItem
