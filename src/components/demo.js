import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { notificationManager } from './NotificationManager'

class demo extends Component {
    constructor(props) {
        super(props)
        this.localNotify = null
        this.state = {}
    }

    componentDidMount() {
        this.localNotify = notificationManager
        this.localNotify.configure(
            this.onRegister,
            this.onNotification,
            this.onOpenNotification
        )
    }

    onRegister(token) {
        console.log('[Notification] Registered: ', token)
    }

    onNotification(notify) {
        console.log('[Notification] onNotification: ', notify)
    }

    onOpenNotification(notify) {
        console.log('[Notification] onNotification: ', notify)
        console.log('hi')

        alert('Open Notification')
    }

    onPressSendNotification = () => {
        this.localNotify.showNotification(
            1,
            'App Notification',
            'Local Notification',
            {},
            {}
        )
    }

    onPressCancelNotification = () => {
        this.localNotify.cancelAllLocalNotification()
    }

    testSchedule = () => {}

    render() {
        let { container, button } = styles
        return (
            <View style={container}>
                <TouchableOpacity
                    style={button}
                    onPress={this.onPressSendNotification}
                >
                    <Text> Send notification </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={button}
                    onPress={this.onPressCancelNotification}
                >
                    <Text> Cancel </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 200,
        marginTop: 10,
    },
})

export default demo
