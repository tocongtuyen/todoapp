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
        console.log('constructor')
    }

    getColorBy_Id = (id) => {
        return firebase
            .firestore()
            .collection('colors')
            .doc(id + '')
            .onSnapshot((doc) => {
                // console.log(doc.data())
                this.setState({ color: doc.data() })
            })
    }

    componentDidMount() {
        // console.log('----data')
        // console.log(this.props.rowData)
        console.log('did_mount')
        this.getColorBy_Id(this.props.rowData.colorid)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps)
        if (prevProps.rowData.colorid !== this.props.rowData.colorid) {
            this.getColorBy_Id(this.props.rowData.colorid)
        }
    }

    render() {
        const { rowData, onPress } = this.props
        console.log(rowData.colorid)
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
