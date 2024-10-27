import { useState } from "react"
import {StyleSheet, View, SafeAreaView, Alert,KeyboardAvoidingView, ScrollView, Text} from "react-native"
import MyInputText from "../components/MyInputText"
import MySingleButton from "../components/MySingleButton"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const DeleteMaquina = () => {
    const [codigo, setCodigo] = useState("")

    const deleteMaquinaDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.deleteMaquina(tx, codigo);
        }, readOnly);
        return result
    }

    const DeleteMaquina = async () => {
        // TODO hacer funcionalidad de borrado
        const res = await deleteMaquinaDB()
        if(res.rowsAffected > 0) {
            Alert.alert("Maquina eliminada")
        }else {
            Alert.alert("La maquina no existe")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Busqueda de maquina" style={styles.text}/>
                        <KeyboardAvoidingView style={{}}>
                            <MyInputText 
                                placeholder="Codigo de Maquina"
                                onChangeText={( text ) => setCodigo(text)}
                            />
                            <MySingleButton
                                title="Borrar de maquina"
                                onPress={DeleteMaquina}
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

export default DeleteMaquina;