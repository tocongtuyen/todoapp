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
    StatusBar,
} from 'react-native'
import { TriangleColorPicker, toHsv } from 'react-native-color-picker'
import firebase from '../database/firebase'

export default class App extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            color: toHsv('green'),
            selectedColor: '',
            taskText: '',
            label: '',
        }
        this.onColorChange = this.onColorChange.bind(this)
    }

    onColorChange(color) {
        this.setState({ color }, () => {
            console.log(color)
        })
    }

    addColor() {
        if (this.state.selectedColor === '') {
            alert('hãy chon một màu!')
        } else {
            firebase
                .firestore()
                .collection('colors')
                .add({
                    userid: firebase.auth().currentUser.uid,
                    color: this.state.selectedColor,
                    label: this.state.label,
                })
                .then((res) => {
                    this.props.navigation.goBack()
                    // this.getTaskByGroupId(this.state.userid).then(tasks => {
                    //   this.props.route.params.onSelect({todoList: tasks});
                    // });
                })
                .catch((err) => {
                    console.error('Error found: ', err)
                })
        }
    }

    onSelect = (color) => this.setState({ selectedColor: color })

    render() {
        return (
            <SafeAreaView>
                <StatusBar barStyle={'dark-content'} />
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
                    <View
                        style={{
                            flex: 1,
                            // alignSelf: 'center',
                            // backgroundColor: 'red',
                            // justifyContent: 'center',
                        }}
                    >
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
                                    oldColor="purple"
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
                                    onChangeText={(text) =>
                                        this.setState({
                                            label: text,
                                        })
                                    }
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
                                    <Text style={styles.title}>
                                        Màu đã chọn
                                    </Text>
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
                            <TouchableOpacity
                                disabled={this.state.label === ''}
                                style={[
                                    styles.createTaskButton,
                                    {
                                        backgroundColor:
                                            this.state.label === ''
                                                ? 'rgba(46, 102, 231,0.5)'
                                                : '#2E66E7',
                                    },
                                ]}
                                onPress={async () => {
                                    this.addColor()
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
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    taskContainer: {
        height: 500,
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
        width: 300,
        height: 48,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
})
