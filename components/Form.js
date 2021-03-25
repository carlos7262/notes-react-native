import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { Alert } from 'react-native'

//firebase
import { db } from '../firebaseConfig'
export default function Form({ currentId, setcurrentId, notes }) {

    const initialState = {
        note: ''
    }

    const [inputValue, setinputValue] = useState(initialState)
    const [inputEditable, setinputEditable] = useState(true)

    const limitLengthNote = 50


    const saveNote = async () => {

        if (inputValue.note !== '' && inputValue.note.length <= limitLengthNote) {
            try {
                await db.collection("notes").add(inputValue);
            } catch (error) {
                console.log(error)
            }

        }
        setinputValue(initialState)
        setinputEditable(true)

    }

    const updateNote = async () => {
        const notesRef = db.collection("notes").doc(currentId);
        await notesRef.set(inputValue)
        setinputValue(initialState)
        setcurrentId(0)
    }


    const saveStateNotes = () =>
        currentId !== 0 ? updateNote() : saveNote()

    //Valor de cambio para el input
    const onChangeValueText = (value, name) => {
        if (value.length >= limitLengthNote) {
            setinputEditable(false)
        }
        else {
            setinputValue({ ...inputValue, [name]: value })

        }

    }

    /* Verificando el id actual para cambiar estado del formulario */
    //Editando
    const getNoteById = async (id) => {
        const dbRef = db.collection("notes").doc(id);
        const doc = await dbRef.get();
        const note = doc.data();
        return { ...note, id: doc.id }
    }
    useEffect(() => {
        currentId !== 0 && getNoteById(currentId)
            .then(({ note }) => setinputValue({ note }))
    }, [currentId])

    //Eliminando
    const removeNote = () =>
        currentId !== 0 ? removeNoteById(currentId) : checkRemoveAllNotes()

    const checkRemoveAllNotes = () => {
        notes.length > 0 && Alert.alert(
            "Eliminar todas las notas",
            "¿Estas seguro de eliminar todas las notas?",
            [
                { text: "Claro :)", onPress: () => removeAllNotes() },
                { text: "No" },
            ]
        )
    }

    const removeAllNotes = () => {
        notes.forEach(n => {
            proccesRemoveByIDNote(n.id)
        });

    }

    const proccesRemoveByIDNote = async (id) => {
        const dbRef = db
            .collection("notes")
            .doc(id);
        await dbRef.delete();
        setinputValue(initialState)
        setcurrentId(0)
    }

    const removeNoteById = (id) => {
        Alert.alert(
            "Eliminar Nota",
            `¿Estas seguro de eliminar la nota "${inputValue.note}" `,
            [
                { text: "Claro :)", onPress: () => proccesRemoveByIDNote(id) },
                { text: "No" },
            ]
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentRow}>
                <TextInput
                    editable={inputEditable}
                    style={styles.input}
                    placeholder="Nota"
                    value={inputValue.note}
                    onChangeText={(value) => onChangeValueText(value, 'note')}
                />

                <Text style={{ bottom: 5 }}>
                    {inputValue.note !== '' ? inputValue.note.length : 0} / {limitLengthNote}
                </Text>

                <View style={styles.btn} >

                    <TouchableOpacity onPress={() => saveStateNotes()} >
                        {
                            currentId !== 0
                                ? <Icon
                                    name="pencil-alt"
                                    type="font-awesome-5"
                                    color="#FFF"
                                />
                                : <Text style={styles.btnText}>
                                    +
                                </Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={[styles.btn, {
                    right: 0,
                    position: 'absolute',
                    bottom: 70
                }]} >


                    <TouchableOpacity onPress={() => removeNote()}>

                        <Icon
                            name="trash-alt"
                            type="font-awesome-5"
                            color="#FFF"
                        />

                    </TouchableOpacity>
                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        backgroundColor: '#F2F2F2',
        width: '100%',
        paddingTop: 20,

    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


    input: {
        padding: 10,
        width: '70%',
        backgroundColor: '#e6e6e6',
        borderRadius: 15,
        marginBottom: 10
    },
    btn: {
        backgroundColor: '#FCCF5F',
        width: 50,
        height: 50,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 25
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    }
})