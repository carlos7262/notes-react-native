import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

export default function ListOfNotes({ notes, setcurrentId }) {
    const renderNotes = ({ item }) =>
        <TouchableOpacity onPress={() => setcurrentId(item.id)} style={styles.card}>
            <Text style={styles.noteText}>
                {item.note}
            </Text>
        </TouchableOpacity>


    return (
        <View style={styles.content}>
            {notes.length > 0 && <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={notes}
                renderItem={renderNotes}
            />}

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        height: '100%',
        marginTop: 20
    },
    card: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 5,
        backgroundColor: 'rgb(230, 230, 230)'
    },
    noteText: {
        color: '#000'
    }
})