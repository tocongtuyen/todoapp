// components/login.js

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

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
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

    userLogin = () => {
        //this.state.email === '' && this.state.password === ''
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Thông báo', 'Email hoặc password không chính xác')
            this.setState({
                isLoading: false,
            })
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then((res) => {
                    console.log(res)
                    console.log('User logged-in successfully!')
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: '',
                    })
                    this.props.navigation.navigate('Dashboard')
                })
                .catch((error) => {
                    this.setState({ errorMessage: error.message })
                    console.log(error)
                    Alert.alert(
                        'Thông báo',
                        'Email hoặc password không chính xác'
                    )
                    this.setState({
                        isLoading: false,
                    })
                })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.loginViewTitle}>
                    <Text style={styles.loginTextTitle}>Đăng nhập</Text>
                </View>
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
                    title="Đăng nhập"
                    onPress={() => this.userLogin()}
                />

                <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Signup')}
                >
                    Không có tài khoản? Nhấp vào đây để đăng ký
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
