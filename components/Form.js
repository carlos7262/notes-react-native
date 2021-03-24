import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { Alert } from 'react-native'
export default function Form({ setnotes, currentId, notes, setcurrentId }) {

    const initialState = {
        note: ''
    }

    const [inputValue, setinputValue] = useState(initialState)
    const [inputEditable, setinputEditable] = useState(true)

    const limitLengthNote = 50

    const updateNote = () => {
        var contador = 0
        var updateNote = notes
        updateNote.length > 0 && updateNote.map(({ id }) => {
            if (currentId === id) {
                updateNote[contador].note = inputValue.note
            }
            contador++
        })
        setnotes([...updateNote])

        setcurrentId(0)
    }

    const proccesRemoveByIDNote = () => {
        var contador = 0
        var removeNote = notes
        removeNote.map(({ id }) => {
            if (currentId == id) {
                removeNote.splice(contador, 1);
            }
            contador++;
        });
        setnotes([...removeNote])
        setcurrentId(0)
    }

    const removeNoteById = () => {
        Alert.alert(
            "Eliminar Nota",
            `¿Estas seguro de eliminar la nota "${inputValue.note}" `,
            [
                { text: "Claro :)", onPress: () => proccesRemoveByIDNote() },
                { text: "No" },
            ]
        )
    }

    const removeAllNotes = () => {
        notes.length > 0 && Alert.alert(
            "Eliminar todas las notas",
            "¿Estas seguro de eliminar todas las notas?",
            [
                { text: "Claro :)", onPress: () => setnotes([]) },
                { text: "No" },
            ]
        )
    }

    const removeNote = () =>
        currentId !== 0 ? removeNoteById() : removeAllNotes()


    const createNote = () => {
        var notevalue = inputValue.note.trim()
        notevalue !== '' && notevalue.length <= limitLengthNote && setnotes(notes => [{ ...inputValue, id: generateUUID() }, ...notes])
        setinputEditable(true)
        setinputValue(initialState)
    }

    const saveStateNotes = () =>
        currentId !== 0 ? updateNote() : createNote()


    useEffect(() => {
        const noteSelect = notes.find(n => n.id === currentId)
        const validateNote = noteSelect !== undefined ? noteSelect : initialState
        setinputValue(validateNote)


    }, [currentId])

    const generateUUID = () => {
        var d = new Date().getTime()
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        })
        return uuid
    }

    const onChangeValueText = (value, name) => {
        if (value.length >= limitLengthNote) {
            setinputEditable(false)


        }
        else {
            setinputValue({ ...inputValue, [name]: value })

        }

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