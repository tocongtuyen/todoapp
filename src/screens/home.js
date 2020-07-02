import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import List from './ListCard'
import BackgroundCurve from '../components/BackgroundCurve'
import firebase from '../database/firebase'
// import { useNavigation } from '@react-navigation/native'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            displayName: '',
        }
    }

    componentDidMount() {
        this.setState({
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid,
        })
        // this.unsubscribe = this.dbRef.onSnapshot(this.getCollection);
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <BackgroundCurve style={styles.svg} />
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.headerContainer}>
                            <View style={styles.headerGroupIndicator}>
                                <View style={styles.headerGroupIndicatorLeft}>
                                    <SimpleLineIcons
                                        name="user"
                                        size={16}
                                        color="#fff"
                                    />
                                    <Text
                                        style={styles.headerGroupIndicatorText}
                                    >
                                        {this.state.displayName}
                                    </Text>
                                    {/* <Feather
                                        name="chevron-down"
                                        color="#fff"
                                        size={16}
                                    /> */}
                                </View>
                                <View style={styles.headerGroupIndicatorRight}>
                                    <Feather
                                        name="settings"
                                        color="#fff"
                                        size={16}
                                    />
                                </View>
                            </View>

                            <Image
                                source={require('../assets/logo.png')}
                                style={{
                                    width: 200,
                                    height: 200,
                                    alignSelf: 'center',
                                    margin: 30,
                                    // tintColor:'white',
                                }}
                            />
                            {/* <Text
                                style={styles.heading}
                            >{`Where would \nyou want to go?`}</Text> */}
                            {/* <View style={styles.groupInputContainer}>
                                <View style={styles.inputSearchContainer}>
                                    <TextInput
                                        style={styles.inputSearch}
                                        value="New York Citi (JFK) "
                                    />
                                    <TouchableOpacity
                                        style={styles.buttonSearch}
                                        onPress={() =>
                                            // navigate.navigate('Watchlist')
                                            console.log('o')
                                        }
                                    >
                                        <Feather
                                            name="search"
                                            color="gray"
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.listBtn}>
                                    <TouchableOpacity style={styles.button}>
                                        <Ionicons
                                            name="ios-airplane"
                                            color="#fff"
                                            size={16}
                                        />
                                        <Text style={styles.buttonText}>
                                            Flights
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            { backgroundColor: 'transparent' },
                                        ]}
                                    >
                                        <FontAwesome
                                            name="hotel"
                                            color="#fff"
                                            size={16}
                                        />
                                        <Text style={styles.buttonText}>
                                            Hotels
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                        </View>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.cardItem}
                                    onPress={() => {
                                        // this.showDialog();
                                        // console.log(this.state.dialogVisible);
                                        this.props.navigation.navigate(
                                            'TaskCalendar',
                                            {
                                                userid: this.state.uid,
                                            }
                                        )
                                    }}
                                >
                                    <Text>Xem công việc theo ngày</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cardItem}
                                    onPress={() => {
                                        // this.showDialog();
                                        // console.log(this.state.dialogVisible);
                                        this.props.navigation.navigate(
                                            'Calendarscreen',
                                            {
                                                userid: this.state.uid,
                                            }
                                        )
                                    }}
                                >
                                    <Text>Xem công việc theo tuần</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 20,
                                }}
                            >
                                <TouchableOpacity style={styles.cardItem}>
                                    <Text>Thống kê công việc</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cardItem}
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            'Addtask',
                                            {
                                                userid: this.state.uid,
                                            }
                                        )
                                    }}
                                >
                                    <Text>Tạo mới công việc</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'white',
    },
    svg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
    },
    headerContainer: {
        marginTop: 52,
        padding: 15,
    },
    headerGroupIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerGroupIndicatorLeft: {
        flexDirection: 'row',
    },
    headerGroupIndicatorText: {
        fontWeight: 'bold',
        color: '#fff',
        marginHorizontal: 5,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 35,
        // width: 2,
    },
    groupInputContainer: {
        marginTop: 20,
        padding: 10,
    },
    inputSearchContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 10,
        borderRadius: 25,
    },
    inputSearch: {
        padding: 12,
        fontSize: 16,
        fontWeight: '500',
        color: 'gray',
        flex: 1,
    },
    buttonSearch: {
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        backgroundColor: '#fff',
        padding: 13,
        borderRadius: 30,
        aspectRatio: 1,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#F88C43',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: '500',
        color: '#fff',
        marginLeft: 10,
    },
    listBtn: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
    },
    cardItem: {
        height: 200,
        flex: 1,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        marginTop: 1,
        marginBottom: 1,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
})

export default Home
