import { useState } from "react"
import {StyleSheet, View, SafeAreaView, Alert,KeyboardAvoidingView, ScrollView, Text} from "react-native"
import MyInputText from "../components/MyInputText"
import MySingleButton from "../components/MySingleButton"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const DeleteTipoMaquina = () => {
    const [tipomaquina, setTipoMaquina] = useState("")

    const deleteTipoMaquinaDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.deleteTipoMaquina(tx, tipomaquina);
        }, readOnly);
        return result
    }

    const DeleteTipoMaquina = async () => {
        // TODO hacer funcionalidad de borrado
        const res = await deleteTipoMaquinaDB()
        if(res.rowsAffected > 0) {
            Alert.alert("Tipo de maquina eliminado")
        }else {
            Alert.alert("El tipo de maquina no existe")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Busqueda de tipo maquina" style={styles.text}/>
                        <KeyboardAvoidingView style={{}}>
                            <MyInputText 
                                placeholder="Tipo Maquina"
                                onChangeText={( text ) => setTipoMaquina(text)}
                            />
                            <MySingleButton
                                title="Borrar tipo de maquina"
                                onPress={DeleteTipoMaquina}
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

export default DeleteTipoMaquina;