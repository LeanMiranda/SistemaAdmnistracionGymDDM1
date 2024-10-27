import { useState, useEffect } from "react"
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native"
import MySingleButton from "../components/MySingleButton"
import MyInputText from "../components/MyInputText"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const UpdateTipoMaquina = () => {
    // estado para busqueda 
    const [tipomaquinaSearch, setTipoMaquinaSearch] = useState("")
    // estado para el usuario a hacer update
    const [tipomaquina, setTipoMaquina] = useState("")
    const [fotoejemplo, setFotoejemplo] = useState("")

    const updateTipoMaquinaDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateTipoMaquina(tx, tipomaquina, fotoejemplo);
        }, readOnly);
        return result
    }

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneTipoMaquina(tx, tipomaquinaSearch);
        }, readOnly);
        return result
    }

    // TODO funcion que busque al usuario
    const searchTipoMaquina = async () => {
        if(!tipomaquinaSearch.trim()) {
            Alert.alert("El tipo de maquina no puede estar vacio")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if(res && res.rows && res.rows.length > 0) {
            setTipoMaquina(res.rows[0].tipomaquina)
            setFotoejemplo(res.rows[0].fotoejemplo)
        }else {
            setTipoMaquina("")
            setFotoejemplo("")
        }
    }

    // TODO funcion de hacer el update del usuario
    const updateTipoMaquina = async () => {
        if(!tipomaquina.trim()) {
            Alert.alert("El tipo de maquina no puede estar vacio")
            return
        }
        
        if(!fotoejemplo.trim()) {
            Alert.alert("La foto de ejemplo no puede estar vacia")
            return 
        }
        // update
        const res = await updateTipoMaquinaDB()
        console.log("res", res)
        if(res.rowsAffected > 0) {
            Alert.alert("Tipo de maquina actualizada")
        }else {
            Alert.alert("No se pudo actualizar el tipo de maquina")
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Tipo de maquina" style={styles.text} />
                            <MyInputText 
                                placeholder="Ingrese el tipo de maquina"
                                style={{}}
                                onChangeText={(text) => setTipoMaquinaSearch(text)}
                            />
                            <MySingleButton title="Buscar" onPress={searchTipoMaquina} />

                            <View style={styles.form}>
                                <MyInputText 
                                    placeholder="Ingrese el tipo de maquina"
                                    defaultValue={tipomaquina}
                                    onChangeText={(text) => setTipoMaquina(text)}
                                />
                                <MyInputText 
                                    placeholder="Ingrese link de foto de ejemplo"
                                    value={fotoejemplo}
                                    onChangeText={(text) => setFotoejemplo(text)}
                                />

                                <MySingleButton 
                                    title="Actualizar" 
                                    onPress={updateTipoMaquina} 
                                    style={styles.button}
                                    />
                            </View>
                    
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
        flex: 1,
        backgroundColor: "white"
    },
    generalView: {
        flex:1
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 20
    },
    input: {
        padding: 15
    },
    keyBoardView: {
        flex:1,
        justifyContent: "space-between"
    },
    form: {
        flex:1,
        marginTop: 25
    },
    button: {
        backgroundColor: 'orange',
    }
})

export default UpdateTipoMaquina;