import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Header = (props) => {
    const { title, iconLeft, iconRight, onLeftPress, onRightPress } = {
        ...props,
    }
    return (
        <View style={styles.headerContainer}>
            {/*  */}
            <TouchableOpacity
                style={styles.cartContainer}
                onPress={onLeftPress}
            >
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
            <TouchableOpacity
                style={styles.cartContainer}
                onRightPress={onRightPress}
            >
                <AntDesign
                    name={iconRight}
                    size={HEADER_ICON_SIZE}
                    color="#fff"
                />
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
        paddingTop: 50,
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
