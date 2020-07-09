import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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

const GroupTaskItem = ({ icon, name, color, onRightPress, onClick }) => (
    <Swipeable
        renderRightActions={(progress, dragX) => (
            <RightActions
                progress={progress}
                dragX={dragX}
                onPress={onRightPress}
            />
        )}
    >
        <TouchableOpacity style={styles.itemContainer} onPress={onClick}>
            <MaterialIcons name="color-lens" size={30} color={color} />
            <Text style={[styles.itemText, { marginLeft: icon ? 20 : 0 }]}>
                {name}
            </Text>
            <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
        </TouchableOpacity>
        <View style={styles.seperator}></View>
    </Swipeable>
)

export default GroupTaskItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    text: {
        color: '#4a4a4a',
        fontSize: 15,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#e4e4e4',
        marginLeft: 10,
    },
    leftAction: {
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        flex: 1,
    },
    rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 30,
        paddingRight: 30,
    },
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
    seperator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        // marginVertical: 5,
    },
})
