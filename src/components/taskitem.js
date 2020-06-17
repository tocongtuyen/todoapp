import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native'
import moment from 'moment'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Swipeable from 'react-native-gesture-handler/Swipeable'

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

const taskitem = (props) => {
    return (
        // <Swipeable
        //     renderRightActions={(progress, dragX) => (
        //         <RightActions
        //             progress={progress}
        //             dragX={dragX}
        //             onPress={props.onRightPress}
        //         />
        //     )}
        // >
        <View
            style={[
                styles.taskListContent,
                { backgroundColor: `${props.color.colorRight}` },
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
                        width: 5,
                        // borderRadius: 8,
                        backgroundColor: props.color.colorLeft,
                        marginRight: 5,
                    }}
                />
                <View style={{ marginRight: 8 }}>
                    <Text
                        style={{
                            color: '#554A4C',
                            fontSize: 15,
                            fontWeight: '700',
                        }}
                    >
                        {props.title}
                    </Text>
                    <Text
                        style={{
                            color: 'gray',
                            fontSize: 14,
                            marginRight: 5,
                        }}
                    >
                        {`${moment(props.time).format('h:mm A')}`}
                    </Text>
                </View>
            </View>
        </View>
        // </Swipeable>
    )
}

export default taskitem

const styles = StyleSheet.create({
    taskListContent: {
        height: 70,
        width: 125,
        alignSelf: 'center',
        // borderRadius: 10,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        marginTop: 1,
        marginBottom: 1,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 5,
        // shadowOpacity: 0.5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        marginRight: 30,
        borderRadius: 10,
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 30,
        paddingRight: 30,
    },
})
