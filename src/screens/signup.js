// components/signup.js

import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    ActivityIndicator,
} from 'react-native'
import firebase from '../database/firebase'

export default class Signup extends Component {
    constructor() {
        super()
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isLoading: false,
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state
        state[prop] = val
        this.setState(state)
    }

    registerUser = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Nhập thông tin email, password')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName,
                    })
                    console.log('User registered successfully!')
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: '',
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch((error) => {
                    this.setState({ errorMessage: error.message })
                    console.log(error)
                    Alert.alert(`${error}`)
                })
        }
    }

    render() {
        if (this.state.isLoading) {
            // return (
            //   <View style={styles.preloader}>
            //     <ActivityIndicator size="large" color="#9E9E9E" />
            //   </View>
            // );
        }
        return (
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: 'center',
                        paddingBottom: 60,
                    }}
                >
                    <Text
                        style={{
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}
                    >
                        Đăng ký
                    </Text>
                </View>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Tên"
                    value={this.state.displayName}
                    onChangeText={(val) =>
                        this.updateInputVal(val, 'displayName')
                    }
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={true}
                />
                <Button
                    color="#3740FE"
                    title="Đăng ký"
                    onPress={() => this.registerUser()}
                />

                <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    Đã đăng ký? Nhấn vào đây để đăng nhập
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#fff',
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center',
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
    loginViewTitle: {
        justifyContent: 'center',
        paddingBottom: 60,
    },
    loginTextTitle: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
})
