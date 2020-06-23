// components/dashboard.js

import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import firebase from '../database/firebase'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Dialog from 'react-native-dialog'
import ActionSheet from 'react-native-actionsheet'

import Header from '../components/headercomponent.js'
import GroupTask from '../components/grouptaskcomponent.js'

const ProfileItem = ({ icon, name, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <MaterialCommunityIcons name={icon} size={30} color="#1e1e1e" />
        <Text style={[styles.itemText, { marginLeft: icon ? 20 : 0 }]}>
            {name}
        </Text>
        <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
    </TouchableOpacity>
)

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.dbRef = firebase.firestore().collection('groups')
        this.state = {
            uid: '',
            displayName: '',
            dialogVisible: false,
            groupname: '',
            groupArr: [],
            keyGroupCurrent: '',
        }
    }

    storeGroup() {
        if (this.state.groupname === '') {
            alert('Fill at least your name!')
        } else {
            this.setState({
                isLoading: true,
            })
            this.dbRef
                .add({
                    groupname: this.state.groupname,
                    userid: this.state.uid,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((res) => {
                    this.refreshGroup()
                })
                .catch((err) => {
                    console.error('Error found: ', err)
                    this.setState({
                        isLoading: false,
                    })
                })
        }
    }

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.props.navigation.navigate('Login')
            })
            .catch((error) => this.setState({ errorMessage: error.message }))
    }

    showDialog = () => {
        this.setState({ dialogVisible: true })
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false })
    }

    handleSave = () => {
        this.setState({ dialogVisible: false })
        this.storeGroup()
    }

    componentDidMount() {
        this.setState({
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid,
        })
        // this.unsubscribe = this.dbRef.onSnapshot(this.getCollection);
    }
    componentWillUnmount() {
        // this.unsubscribe();
    }

    // getCollection = querySnapshot => {
    //   const groupArr = [];
    //   querySnapshot.forEach(res => {
    //     const {groupname, userid} = res.data();
    //     groupArr.push({
    //       key: res.id,
    //       // res,
    //       groupname,
    //       userid,
    //     });
    //   });
    //   this.setState({
    //     groupArr,
    //   });
    // };

    // getGroupByUserId = id => {
    //   firebase
    //     .firestore()
    //     .collection('groups')
    //     .where('userid', '==', id + '')
    //     .orderBy('timestamp')
    //     .onSnapshot(querySnapshot => {
    //       if (querySnapshot) {
    //         const groupArr = [];
    //         querySnapshot.forEach(res => {
    //           groupArr.push({
    //             key: res.id,
    //             ...res.data(),
    //           });
    //         });
    //         this.setState({
    //           groupArr,
    //         });
    //       }
    //     });
    // };
    refreshGroup() {
        this.getGroupByUserId(this.state.uid).then((groups) => {
            this.setState({ groupArr: groups })
        })
    }
    getGroupByUserId = (id) => {
        return firebase
            .firestore()
            .collection('groups')
            .where('userid', '==', id + '')
            .orderBy('timestamp')
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

    deleteGroup = (key) => {
        const dbRef = firebase.firestore().collection('groups').doc(key)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
            this.refreshGroup()
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#424F61' }}>
                <View style={styles.screenContainer}>
                    {/* <Text style={styles.textStyle}>Hello, {this.state.displayName}</Text>
        <Button color="#3740FE" title="Logout" onPress={() => this.signOut()} /> */}
                    <Header
                        title={this.state.displayName}
                        iconLeft="user"
                        iconRight="search1"
                    />
                    {/* onPress={() => {
                                    this.props.navigation.navigate(
                                        'TaskCalendar',
                                        {
                                            userid: this.state.uid,
                                        }
                                    )
                                }} */}
                    <ScrollView>
                        <View style={styles.bodyContainer}>
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'TaskCalendar',
                                        {
                                            userid: this.state.uid,
                                        }
                                    )
                                }}
                            >
                                <Entypo
                                    name={'light-up'}
                                    size={30}
                                    color="#1e1e1e"
                                />
                                <Text
                                    style={[
                                        styles.itemText,
                                        { marginLeft: 20 },
                                    ]}
                                >
                                    Xem công việc theo ngày
                                </Text>
                                <FontAwesome
                                    name="angle-right"
                                    size={26}
                                    color="#1e1e1e"
                                />
                            </TouchableOpacity>
                            <View style={styles.seperator}></View>
                            <ProfileItem
                                icon="calendar-today"
                                name="Xem công việc theo tuần"
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'Calendarscreen',
                                        {
                                            userid: this.state.uid,
                                        }
                                    )
                                }}
                            />
                            {/* <ProfileItem icon="alarm-check" name="Công việc quan trọng" /> */}
                            <View style={styles.seperator}></View>
                            <ProfileItem
                                icon="chart-line"
                                name="Xem thống kê"
                            />
                            {/*  */}
                            {/* <View style={styles.divider} />
            <FlatList
              data={this.state.groupArr}
              renderItem={({item}) => (
                <GroupTask
                  icon="format-list-bulleted"
                  name={item.groupname}
                  onRightPress={() => {
                    // this.deleteGroup(item.key);
                    this.setState({keyGroupCurrent: item.key});
                    this.ActionSheet.show();
                  }}
                  // onRightPress={() => this.ActionSheet.show()}
                  onClick={() => {
                    this.props.navigation.navigate('TaskScreen', {
                      key: item.key,
                      userid: this.state.uid,
                      title: item.groupname,
                    });
                  }}
                />
              )}
              keyExtractor={item => item.key}
            /> */}
                            <ActionSheet
                                ref={(o) => (this.ActionSheet = o)}
                                title={'Dữ liệu sẽ bị xoá vĩnh viễn!'}
                                options={['Xoá danh sách', 'Huỷ bỏ']}
                                cancelButtonIndex={1}
                                destructiveButtonIndex={0}
                                onPress={(index) => {
                                    if (index == 0) {
                                        this.deleteGroup(
                                            this.state.keyGroupCurrent
                                        )
                                        console.log(this.state.keyGroupCurrent)
                                    }
                                }}
                            />
                            {/*  */}
                            <View style={styles.divider} />
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => this.signOut()}
                            >
                                <Text style={styles.itemText}>Đăng xuất</Text>
                                {/* <FontAwesome name="angle-right" size={26} color="#1e1e1e" /> */}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => {
                            this.props.navigation.navigate('Addtask', {
                                userid: this.state.uid,
                            })
                        }}
                    >
                        <MaterialCommunityIcons
                            name="shape-square-plus"
                            size={30}
                            color="gray"
                        />
                        <Text
                            style={[
                                styles.itemText,
                                { marginLeft: 20, color: 'gray' },
                            ]}
                        >
                            Thêm mới công việc{' '}
                        </Text>
                        {/* <FontAwesome name="angle-right" size={26} color="#1e1e1e" /> */}
                    </TouchableOpacity>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Danh sách mới</Dialog.Title>
                        <Dialog.Input
                            placeholder="Nhập tên danh sách"
                            onChangeText={(text) => {
                                console.log(text)
                                this.setState({ groupname: text })
                            }}
                        />
                        <Dialog.Button
                            label="Huỷ "
                            onPress={this.handleCancel}
                        />
                        <Dialog.Button label="Lưu" onPress={this.handleSave} />
                    </Dialog.Container>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        // backgroundColor: '#ededed',
    },
    //
    userContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 22,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e88e5',
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    welcomeText: {
        color: '#828282',
    },
    authText: {
        color: '#1e88e5',
        fontSize: 18,
        fontWeight: '500',
    },
    //
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
        fontSize: 22,
    },
    //
    divider: {
        height: 5,
    },
    seperator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        // marginVertical: 5,
    },
})
