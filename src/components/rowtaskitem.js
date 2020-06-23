import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    Modal,
    TextInput,
    Switch,
    SafeAreaView,
} from 'react-native'
import firebase from '../database/firebase'

class Rowtaskitem extends Component {
    constructor(props) {
        super(props)
        this.state = { color: { label: 'di lam', color: '#FFF' } }
    }

    getColorById = (id) => {
        return firebase
            .firestore()
            .collection('colors')
            .doc(id + '')
            .get()
            .then((docRef) => {
                console.log(docRef.data())
                return docRef.data()
            })
            .catch((error) => {})
    }

    componentDidMount() {
        this.getColorById(this.props.rowData.colorid).then((color) => {
            this.setState({ color: color }, () => {
                console.log(this.state.color)
            })
        })
    }

    render() {
        const { rowData, onPress } = this.props
        let title = (
            <Text
                style={[
                    styles.title,
                    {
                        textDecorationLine: !rowData.isCompleted
                            ? 'none'
                            : 'line-through',
                        color: !rowData.isCompleted ? 'black' : 'gray',
                    },
                ]}
            >
                {rowData.title}
            </Text>
        )
        var desc = null
        console.log(rowData)
        if (rowData.description)
            desc = (
                <View style={styles.descriptionContainer}>
                    {/* <Image
                        source={{ uri: rowData.imageUrl }}
                        style={styles.image}
                    /> */}
                    <Text style={[styles.textDescription]}>
                        {rowData.description}
                    </Text>
                </View>
            )
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: this.state.color.color,
                }}
                onPress={onPress}
            >
                {title}
                {desc}
            </TouchableOpacity>
        )
    }
}

export default Rowtaskitem

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50,
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray',
    },
})
