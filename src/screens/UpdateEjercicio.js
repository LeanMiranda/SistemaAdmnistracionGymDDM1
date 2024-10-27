import { useState, useEffect } from "react"
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native"
import MySingleButton from "../components/MySingleButton"
import MyInputText from "../components/MyInputText"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const UpdateEjercicio = () => {
    // estado para busqueda 
    const [nombreSearch, setNombreSearch] = useState("")
    // estado para el usuario a hacer update
    const [nombre, setNombre] = useState("");
    const [tipomaquina, setTipomaquina] = useState("");
    const [videodemo, setVideodemo] = useState("");

    const updateEjercicioDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateEjercicio(tx, nombre, tipomaquina,videodemo);
        }, readOnly);
        return result
    }

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneMaquina(tx, nombreSearch);
        }, readOnly);
        return result
    }

    // TODO funcion que busque al usuario
    const searchEjercicio = async () => {
        if(!nombreSearch.trim()) {
            Alert.alert("El nombre no puede estar vacio")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if(res && res.rows && res.rows.length > 0) {
            setNombre(res.rows[0].nombre)
            setTipoMaquina(res.rows[0].tipomaquina)
            setVideodemo(res.rows[0].videodemo)
        }else {
            setTipoMaquina("")
            setVideodemo("")
        }
    }

    // TODO funcion de hacer el update del usuario
    const updateEjercicio = async () => {
        if(!nombre.trim()) {
            Alert.alert("no puede estar vacio")
            return
        }
        
        if(!tipomaquina.trim()) {
            Alert.alert("no puede estar vacio")
            return 
        }
        if(!videodemo.trim()) {
            Alert.alert("no puede estar vacio")
            return 
        }
        // update
        const res = await updateEjercicioDB()
        console.log("res", res)
        if(res.rowsAffected > 0) {
            Alert.alert("Ejercicio actualizado")
        }else {
            Alert.alert("No se pudo actualizar el ejercicio")
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar ejercicio" style={styles.text} />
                            <MyInputText 
                                placeholder="Ingrese el nombre a modificar"
                                style={{}}
                                onChangeText={(text) => setNombreSearch(text)}
                            />
                            <MySingleButton title="Buscar" onPress={searchEjercicio} />

                            <View style={styles.form}>
                                <MyInputText 
                                    placeholder="Ingrese el nombre"
                                    defaultValue={nombre}
                                    onChangeText={(text) => setNombre(text)}
                                />
                                <MyInputText 
                                    placeholder="Ingrese tipo de maquina"
                                    value={tipomaquina}
                                    onChangeText={(text) => setTipomaquina(text)}
                                />
                                 <MyInputText 
                                    placeholder="Ingrese video de demo"
                                    value={videodemo}
                                    onChangeText={(text) => setVideodemo(text)}
                                />

                                <MySingleButton 
                                    title="Actualizar" 
                                    onPress={updateEjercicio} 
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

export default UpdateEjercicio;