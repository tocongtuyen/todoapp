// components/dashboard.js

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Animated,
} from 'react-native'
import moment from 'moment'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import firebase from '../database/firebase'

const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })
    return (
        <View style={styles.leftAction}>
            <Animated.Text
                style={[styles.actionText, { transform: [{ scale }] }]}
            >
                <AntDesign name="checkcircleo" size={26} color="#fff" />
            </Animated.Text>
        </View>
    )
}

const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    })
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.rightAction}>
                <Animated.Text
                    style={[styles.actionText, { transform: [{ scale }] }]}
                >
                    <AntDesign name="delete" size={25} color="#fff" />
                </Animated.Text>
            </View>
        </TouchableOpacity>
    )
}

class TaskComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { color: { label: 'di lam', color: '#FFF' } }
    }

    getColorById = (id) => {
        return firebase
            .firestore()
            .collection('colors')
            .doc(id + '')
            .get()
            .then((docRef) => {
                console.log(docRef.data())
                return docRef.data()
            })
            .catch((error) => {})
    }
    getColorBy_Id = (id) => {
        return firebase
            .firestore()
            .collection('colors')
            .doc(id + '')
            .onSnapshot((doc) => {
                // console.log(doc.data())
                this.setState({ color: doc.data() })
            })
    }

    componentDidMount() {
        this.getColorBy_Id(this.props.colorid)
        console.log(this.state.currentDay)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.colorid !== this.props.colorid) {
            //Perform some operation here
            // this.getColorById(this.props.colorid).then((color) => {
            //     this.setState({ color: color })
            // })
            this.getColorBy_Id(this.props.colorid)
        }
    }

    render() {
        const {
            onSwipeFromLeft,
            onRightPress,
            index,
            title,
            time,
            isCompleted,
            notes,
        } = this.props
        return (
            <Swipeable
                renderLeftActions={LeftActions}
                onSwipeableLeftOpen={onSwipeFromLeft}
            >
                <View
                    style={[
                        styles.taskListContent,
                        { backgroundColor: `${this.state.color.color}` },
                    ]}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                height: 70,
                                width: 10,
                                // borderRadius: 8,
                                // backgroundColor: this.state.color.color,
                                marginRight: 2,
                            }}
                        />
                        <View style={{ marginRight: 0, flex: 1 }}>
                            <Text
                                style={[
                                    {
                                        marginRight: 5,
                                        color: '#554A4C',
                                        // fontSize: 15,
                                        fontSize: 18,
                                        fontWeight: '600',
                                    },
                                    {
                                        textDecorationLine: !isCompleted
                                            ? 'none'
                                            : 'line-through',
                                        color: !isCompleted ? 'black' : 'gray',
                                    },
                                ]}
                            >
                                {title}
                            </Text>
                            <Text
                                style={{
                                    color: 'gray',
                                    // fontSize: 14,
                                    fontSize: 14,
                                    marginLeft: 25,
                                }}
                            >
                                {notes}
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: 'black',
                                // fontSize: 14,
                                fontSize: 16,
                                marginRight: 10,
                            }}
                        >
                            {`${moment(time).format('HH:mm')}`}
                        </Text>
                    </View>
                </View>
            </Swipeable>
        )
    }
}

const styles = StyleSheet.create({
    taskListContent: {
        height: 70,
        width: 275,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginBottom: 5,
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
    leftAction: {
        borderRadius: 10,
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
    },
    rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        flex: 1,
        // alignItems: 'center',
        marginTop: 1,
        marginBottom: 1,
        // marginRight: 30,
        // borderRadius: 10,
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        // paddingLeft: 25,
        // paddingRight: 25,
        paddingLeft: 14,
        paddingRight: 14,
    },
})

export default TaskComponent
