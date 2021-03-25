import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

//components
import Form from '../components/Form';
import ListOfNotes from '../components/ListOfNotes';
import CountNotes from '../components/CountNotes';

//firebase
import { db } from '../firebaseConfig';



export default function Home() {
    const [currentId, setcurrentId] = useState(0)

    const [notes, setnotes] = useState([])

    /* Obteniendo las notas */
    useEffect(() => {
        let mounted = true;
        db.collection("notes")
            .onSnapshot(qSnapshot => {
                const notesFb = []
                qSnapshot.docs.forEach(doc => {
                    notesFb.push({ ...doc.data(), id: doc.id })
                })
                mounted && setnotes(notesFb)
            })
        return () => mounted = false;
    }, [])

    return (
        <View style={styles.container}>
            <CountNotes notes={notes} />
            <Form
                setnotes={setnotes}
                setcurrentId={setcurrentId}
                currentId={currentId}
                notes={notes}
            />

            <ListOfNotes setcurrentId={setcurrentId} notes={notes} />

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