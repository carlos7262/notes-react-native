import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
//components
import Form from '../components/Form';
import ListOfNotes from '../components/ListOfNotes';



export default function Home() {
    const [notes, setnotes] = useState([])

    const [notesLocal, setnotesLocal] = useState(null)

    useEffect(() => {
        SecureStore.setItemAsync("notes", JSON.stringify(notes))
    }, [notes])

    const getValues = async () => {
        let resp = await SecureStore.getItemAsync("notes")
        setnotesLocal(JSON.parse(resp))
    }

    useEffect(() => {

        getValues()
    }, [notes])


    console.log(notesLocal)

    return (
        <View style={styles.container}>

            <Form setnotes={setnotes} />
            <ListOfNotes notesLocal={notesLocal} />

            <StatusBar style="auto" />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
})