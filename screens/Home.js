import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
//components
import Form from '../components/Form';
import ListOfNotes from '../components/ListOfNotes';
import CountNotes from '../components/CountNotes';



export default function Home() {
    const [notes, setnotes] = useState([])

    const [currentId, setcurrentId] = useState(0)

    const [notesLocal, setnotesLocal] = useState(null)

    useEffect(() => {
        SecureStore.setItemAsync("notes", JSON.stringify(notes))
        getValues()
    }, [notes])


    const getValues = async () => {
        let resp = await SecureStore.getItemAsync("notes")
        setnotesLocal(JSON.parse(resp))
    }

    return (
        <View style={styles.container}>
            <CountNotes notesLocal={notesLocal} />
            <Form setnotes={setnotes} setcurrentId={setcurrentId} currentId={currentId} notes={notes} />

            <ListOfNotes setcurrentId={setcurrentId} notesLocal={notesLocal} />

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