import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native'
import moment from 'moment'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import firebase from '../database/firebase'

const windowWidth = Dimensions.get('window').width / 7

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
                    <AntDesign name="delete" size={26} color="#fff" />
                </Animated.Text>
            </View>
        </TouchableOpacity>
    )
}

let row: Array<any> = []
let prevOpenedRow
function closeRow(index) {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close()
    }
    prevOpenedRow = row[index]
}

class taskitem extends React.Component {
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
        const { onRightPress, index, title, time, isCompleted } = this.props
        return (
            <Swipeable
                ref={(ref) => (row[index] = ref)}
                renderRightActions={(progress, dragX) => (
                    <RightActions
                        progress={progress}
                        dragX={dragX}
                        onPress={onRightPress}
                    />
                )}
                onSwipeableOpen={closeRow(index)}
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
                                width: 5,
                                // borderRadius: 8,
                                // backgroundColor: this.state.color.color,
                                marginRight: 2,
                            }}
                        />
                        <View style={{ marginRight: 0 }}>
                            <Text
                                style={[
                                    {
                                        marginRight: 5,
                                        color: '#554A4C',
                                        // fontSize: 15,
                                        fontSize: 11,
                                        fontWeight: '500',
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
                                    color: 'black',
                                    // fontSize: 14,
                                    fontSize: 11,
                                    marginRight: 5,
                                }}
                            >
                                {`${moment(time).format('HH:mm')}`}
                            </Text>
                        </View>
                    </View>
                </View>
            </Swipeable>
        )
    }
}

export default taskitem

const styles = StyleSheet.create({
    taskListContent: {
        height: 57,
        flex: 1,
        marginLeft: 1,
        marginRight: 1,
        width: windowWidth,
        // width: 110,
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
        paddingLeft: 10,
        paddingRight: 10,
    },
})
