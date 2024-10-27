import { useState } from "react"
import {StyleSheet, View, SafeAreaView, Alert,KeyboardAvoidingView, ScrollView, Text} from "react-native"
import MyInputText from "../components/MyInputText"
import MySingleButton from "../components/MySingleButton"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const DeleteEjercicio = () => {
    const [nombre, setNombre] = useState("");

    const deleteEjercicioDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.deleteEjercicio(tx, nombre);
        }, readOnly);
        return result
    }

    const deleteEjercicio = async () => {
        // TODO hacer funcionalidad de borrado
        const res = await deleteEjercicioDB()
        if(res.rowsAffected > 0) {
            Alert.alert("Ejercicio eliminado")
        }else {
            Alert.alert("El ejercicio no existe")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Busqueda de ejercicio" style={styles.text}/>
                        <KeyboardAvoidingView style={{}}>
                            <MyInputText 
                                placeholder="Nombre de ejercico"
                                onChangeText={( text ) => setNombre(text)}
                            />
                            <MySingleButton
                                title="Borrar ejercicio"
                                onPress={DeleteEjercicio}
                                style={styles.button}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex:1,
        backgroundColor: "white"
    },
    generalView: {
        flex: 1
    },
    input: {
        padding: 15
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 20
    },
    button: {
        backgroundColor: "red"
    }
})

export default DeleteEjercicio;