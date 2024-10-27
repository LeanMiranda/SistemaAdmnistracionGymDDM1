import { useState } from "react"
import {StyleSheet, View, SafeAreaView, Alert,KeyboardAvoidingView, ScrollView, Text} from "react-native"
import MyInputText from "../components/MyInputText"
import MySingleButton from "../components/MySingleButton"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const DeleteRutina = () => {
    const [diarutina, setDiarutina] = useState("")
    const [usuario, setUsuario] = useState("")
    const deleteRutinaDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.deleteRutina(tx, diarutina,usuario);
        }, readOnly);
        return result
    }

    const DeleteRutina = async () => {
        // TODO hacer funcionalidad de borrado
        const res = await deleteRutinaDB()
        if(res.rowsAffected > 0) {
            Alert.alert("Rutina eliminada")
        }else {
            Alert.alert("La Rutina no existe")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Busqueda de rutina" style={styles.text}/>
                        <KeyboardAvoidingView style={{}}>
                            <MyInputText 
                                placeholder="Dia de la rutina"
                                onChangeText={( text ) => setDiarutina(text)}
                            />
                            <MyInputText 
                                placeholder="Usuario"
                                onChangeText={( text ) => setUsuario(text)}
                            />
                            <MySingleButton
                                title="Borrar rutina"
                                onPress={DeleteRutina}
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

export default DeleteRutina;