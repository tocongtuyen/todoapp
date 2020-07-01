import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

const Header = (props) => {
    const { title, iconLeft, iconRight, onPress, onRightPress } = {
        ...props,
    }
    return (
        <View style={styles.headerContainer}>
            {/*  */}
            <TouchableOpacity style={styles.cartContainer}>
                <SimpleLineIcons
                    name={iconLeft}
                    size={HEADER_ICON_SIZE}
                    color="#fff"
                />
                <Text style={styles.headerText}>{title}</Text>
            </TouchableOpacity>
            {/*  */}
            <Text style={styles.headerText} />
            {/*  */}
            <TouchableOpacity style={styles.cartContainer} onPress={onPress}>
                <Feather name="log-out" color="#fff" size={26} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const HEADER_ICON_SIZE = 24

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        backgroundColor: '#1e88e5',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
    cartContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartIcon: {
        width: HEADER_ICON_SIZE,
    },
    headerText: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 5,
        fontWeight: '400',
    },
})
