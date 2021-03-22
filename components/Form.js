import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'

export default function Form({ setnotes }) {

    const initialState = {
        title: '',
        description: ''
    }
    const [inputValue, setinputValue] = useState(initialState)

    const saveNotes = () => {
        setnotes(notes => [{ ...inputValue, id: generateUUID() }, ...notes])
        setinputValue(initialState)
    }

    const generateUUID = () => {
        var d = new Date().getTime()
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        })
        return uuid
    }



    const onChangeValueText = (value, name) =>
        setinputValue({ ...inputValue, [name]: value })
    return (
        <ScrollView>


            <TextInput
                style={styles.input}
                placeholder="Título"
                value={inputValue.title}
                onChangeText={(value) => onChangeValueText(value, 'title')}
            />

            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={inputValue.description}
                onChangeText={(value) => onChangeValueText(value, 'description')}
            />


            <TouchableOpacity onPress={() => saveNotes()} style={styles.btn} >

                <Text style={styles.btnText}>
                    {/* {
                        props.route.params.currentID !== 0 ? 'Editar' : 'Guardar'
                    } */}
                    Guardar
                </Text>

            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#D2D0D1',
        padding: 10,
        marginBottom: 10
    },
    btn: {
        backgroundColor: '#FCCF5F',
        padding: 10,
        borderRadius: 5
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
        textAlign: 'center'
    }
})