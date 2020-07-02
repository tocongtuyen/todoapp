import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Alert,
    StatusBar,
} from 'react-native'
import { TriangleColorPicker, toHsv } from 'react-native-color-picker'
import firebase from '../database/firebase'
import ActionSheet from 'react-native-actionsheet'

export default class App extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            color: toHsv('green'),
            selectedColor: this.props.route.params.data.color,
            taskText: '',
            label: '',
            selected: this.props.route.params.data,
            id: this.props.route.params.id,
        }
        this.onColorChange = this.onColorChange.bind(this)
    }

    onColorChange(color) {
        this.setState({ color }, () => {
            console.log(color)
        })
    }

    updateColor = (item) => {
        const updateDBRef = firebase
            .firestore()
            .collection('colors')
            .doc(this.state.id)
        updateDBRef
            .set({
                ...item,
                color: this.state.selectedColor,
            })
            .then((docRef) => {
                this.props.navigation.goBack()
            })
            .catch((error) => {
                console.error('Error: ', error)
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
            this.props.navigation.goBack()
        })
    }

    onSelect = (color) => this.setState({ selectedColor: color })

    render() {
        const { selected } = this.state
        return (
            <SafeAreaView>
                <StatusBar barStyle={'dark-content'} />
                <ActionSheet
                    ref={(o) => (this.ActionSheet = o)}
                    title={'Dữ liệu sẽ bị xoá vĩnh viễn!'}
                    options={['Xoá màu này', 'Huỷ bỏ']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={(index) => {
                        if (index == 0) {
                            this.getTaskByColorId(this.state.id).then(
                                (task) => {
                                    if (task.length == 0) {
                                        this.deleteColor(this.state.id)
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
                                }
                            )
                        }
                    }}
                />
                <View style={styles.container}>
                    <View
                        style={
                            ([styles.backButton],
                            {
                                height: 35,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 5,
                            })
                        }
                    >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{
                                // marginRight: vw / 2 - 120,
                                marginLeft: 10,
                            }}
                        >
                            <Image
                                style={{ height: 25, width: 40 }}
                                source={require('../assets/back.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    {/* <ScrollView
                        contentContainerStyle={{
                            paddingBottom: 70,
                        }}
                    > */}
                    <View style={styles.taskContainer}>
                        <View
                            style={{
                                height: 280,
                                paddingBottom: 25,
                                backgroundColor: '#FFF',
                            }}
                        >
                            <Text style={styles.title}>Chọn màu</Text>
                            <TriangleColorPicker
                                oldColor={this.props.route.params.data.color}
                                color={this.state.color}
                                onColorChange={this.onColorChange}
                                onColorSelected={(color) => {
                                    // alert(`Color selected: ${color}`)
                                    this.setState({
                                        selectedColor: color,
                                    })
                                }}
                                onOldColorSelected={(color) => {
                                    // alert(`Color selected: ${color}`)
                                    this.setState({
                                        selectedColor: color,
                                    })
                                }}
                                style={{ flex: 1 }}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>Tên nhãn</Text>
                            <TextInput
                                style={styles.newTask}
                                onChangeText={(text) => {
                                    const prevSelectedTask = {
                                        ...selected,
                                    }
                                    prevSelectedTask.label = text
                                    this.setState(
                                        {
                                            selected: prevSelectedTask,
                                        },
                                        () => {
                                            console.log(selected.label)
                                        }
                                    )
                                }}
                                value={selected.label}
                                placeholder="Nhập tên nhãn"
                                autoFocus={true}
                            />
                            <View style={styles.seperator}></View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={styles.title}>Màu đã chọn</Text>
                                <View
                                    style={{
                                        height: 30,
                                        width: 30,
                                        backgroundColor: `${this.state.selectedColor}`,
                                        justifyContent: 'center',
                                        borderRadius: 15,
                                        marginLeft: 20,
                                    }}
                                ></View>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                disabled={selected.label === ''}
                                style={[
                                    styles.updateButton,
                                    {
                                        backgroundColor:
                                            selected.label === ''
                                                ? 'rgba(46, 102, 231,0.5)'
                                                : '#2E66E7',
                                    },
                                ]}
                                onPress={() => {
                                    this.updateColor(this.state.selected)
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: 'center',
                                        color: '#fff',
                                    }}
                                >
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={async () => {
                                    this.ActionSheet.show()
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: 'center',
                                        color: '#fff',
                                    }}
                                >
                                    Xoá
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* </ScrollView> */}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    taskContainer: {
        // height: 600,
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
        padding: 20,
    },
    seperator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        marginVertical: 5,
    },
    newTask: {
        fontSize: 20,
        height: 25,
    },
    title: {
        color: '#9CAAC4',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
    },
    createTaskButton: {
        width: 327,
        height: 48,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        width: 140,
        height: 38,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    updateButton: {
        backgroundColor: '#2E66E7',
        width: 140,
        height: 38,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        marginRight: 20,
    },
})
