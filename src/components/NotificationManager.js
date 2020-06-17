import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

class NotificationManager {
    configure = (onRegister, onNotification, onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log('[NotificationManager] onRegister token:', token)
            },

            onNotification: function (notification) {
                console.log(
                    '[NotificationManager] onNotification:',
                    notification
                )

                if (Platform.OS === 'ios') {
                    if (notification.data.openedInForeground) {
                        notification.userInteraction = true
                    }
                } else {
                    notification.userInteraction = true
                }

                if (notification.userInteraction) {
                    onOpenNotification(notification)
                } else {
                    onNotification(notification)
                }

                if (Platform.OS === 'ios') {
                    if (!notification.data.openedInForeground) {
                        notification.finish('backgroundFetchResultNoData')
                    }
                } else {
                    notification.finish('backgroundFetchResultNoData')
                }

                // notification.finish(PushNotificationIOS.FetchResult.NoData)
            },
        })
    }

    _buildAndroidNotification = (
        id,
        title,
        message,
        data = {},
        options = {}
    ) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || 'ic_launcher',
            smallIcon: options.smallIcon || 'ic_launcher',
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || 'hight',
            importance: options.importance || 'hight',
            data: data,
        }
    }

    _buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || '',
            userInfo: {
                id: id,
                item: data,
            },
        }
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotificationSchedule({
            ...this._buildAndroidNotification(
                id,
                title,
                message,
                data,
                options
            ),
            ...this._buildIOSNotification(id, title, message, data, options),
            title: title || '',
            message: message || '',
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false,
            date: new Date(Date.now() + 120 * 1000),
        })
    }

    cancelAllLocalNotification = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications()
        } else {
            PushNotification.cancelAllLocalNotification()
        }
    }

    unregister = () => {
        PushNotification.unregister
    }
}

export const notificationManager = new NotificationManager()
