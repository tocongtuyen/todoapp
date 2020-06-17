import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native'
const W = Dimensions.get('window').width

const Card = () => (
    <View style={styles.itemContainer}>
        <View style={styles.imageBg}>
            <Text>g</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 20,
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#222',
    },
    itemImage: {
        width: (W - 60) / 2,
        height: (W - 40) / 2 + 30,
        backgroundColor: 'gray',
    },
    itemContainer: {
        marginRight: 20,
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 10,
    },
    itemPriceOriginal: {
        color: 'gray',
        fontWeight: '500',
        fontSize: 15,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    itemInner: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        padding: 12,
        alignItems: 'flex-end',
    },
    imageBg: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
    },
    itemTime: {
        color: '#eee',
        fontWeight: '600',
        fontSize: 14,
    },
    itemSaleOff: {
        fontWeight: 'bold',
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 5,
        paddingHorizontal: 10,
    },
})

export default Card
