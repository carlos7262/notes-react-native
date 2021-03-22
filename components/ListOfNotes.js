import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

export default function ListOfNotes({ notesLocal }) {
    const renderNotes = ({ item }) =>
        <TouchableOpacity style={styles.card}>
            <Text>
                {item.title}
            </Text>
        </TouchableOpacity>


    return (
        <View style={styles.content}>
            {notesLocal !== null && notesLocal.length > 0 && <FlatList
                data={notesLocal}
                renderItem={renderNotes}
            />}

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 30,
        height: '70%',
    },
    card: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#D2D0D1'
    }
})