import { useState, useEffect } from "react"
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native"
import MySingleButton from "../components/MySingleButton"
import MyInputText from "../components/MyInputText"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const UpdateMaquina = () => {
    // estado para busqueda 
    const [codigoSearch, setCodigoSearch] = useState("")
    // estado para el usuario a hacer update
    const [codigo, setCodigo] = useState("")
    const [tipomaquina, setTipoMaquina] = useState("")
    const [nrosala, setNrosala] = useState("")

    const updateMaquinaDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateMaquina(tx, codigo, tipomaquina,nrosala);
        }, readOnly);
        return result
    }

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneMaquina(tx, codigoSearch);
        }, readOnly);
        return result
    }

    // TODO funcion que busque al usuario
    const searchMaquina = async () => {
        if(!codigoSearch.trim()) {
            Alert.alert("El codigo no puede estar vacio")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if(res && res.rows && res.rows.length > 0) {
            setCodigo(res.rows[0].codigo)
            setTipoMaquina(res.rows[0].tipomaquina)
            setNrosala(res.rows[0].nrosala)
        }else {
            setTipoMaquina("")
            setNrosala("")
        }
    }

    // TODO funcion de hacer el update del usuario
    const updateMaquina = async () => {
        if(!codigo.trim()) {
            Alert.alert("no puede estar vacio")
            return
        }
        
        if(!tipomaquina.trim()) {
            Alert.alert("no puede estar vacio")
            return 
        }
        if(!nrosala.trim()) {
            Alert.alert("no puede estar vacio")
            return 
        }
        // update
        const res = await updateMaquinaDB()
        console.log("res", res)
        if(res.rowsAffected > 0) {
            Alert.alert("Maquina actualizada")
        }else {
            Alert.alert("No se pudo actualizar la maquina")
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar maquina" style={styles.text} />
                            <MyInputText 
                                placeholder="Ingrese el codigo"
                                style={{}}
                                onChangeText={(text) => setCodigoSearch(text)}
                            />
                            <MySingleButton title="Buscar" onPress={searchMaquina} />

                            <View style={styles.form}>
                                <MyInputText 
                                    placeholder="Ingrese el codigo"
                                    defaultValue={codigo}
                                    onChangeText={(text) => setCodigo(text)}
                                    keyboardType="numeric"
                                />
                                <MyInputText 
                                    placeholder="Ingrese tipo de maquina"
                                    value={tipomaquina}
                                    onChangeText={(text) => setTipoMaquina(text)}
                                />
                                 <MyInputText 
                                    placeholder="Ingrese numero de sala"
                                    value={nrosala}
                                    onChangeText={(text) => setNrosala(text)}
                                    keyboardType="numeric"
                                />

                                <MySingleButton 
                                    title="Actualizar" 
                                    onPress={updateMaquina} 
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

export default UpdateMaquina;