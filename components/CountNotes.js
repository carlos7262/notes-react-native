import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'

export default function CountNotes({ notes }) {
    return (
        <View style={styles.container}>
            <View style={styles.round}>
                <Text style={styles.text}>
                    {notes !== null ? notes.length : 0}

                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        right: 20,
        top: -25

    },
    round: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9c059',
        borderRadius: 35
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff'
    }
})