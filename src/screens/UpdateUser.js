import { useState, useEffect } from "react"
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from "react-native"
import MySingleButton from "../components/MySingleButton"
import MyInputText from "../components/MyInputText"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const UpdateUser = () => {
    // estado para busqueda 
    const [userNameSearch, setUserNameSearch] = useState("")
    // estado para el usuario a hacer update
    const [userName, setUsername] = useState("")
    const [apellido, setApellido] = useState("")
    const [cedula, setCedula] = useState("")
    const [nacimiento, setNacimiento] = useState("")
    

    const updateUserDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateUser(tx, userName, apellido,cedula,nacimiento);
        }, readOnly);
        return result
    }

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneUser(tx, userNameSearch);
        }, readOnly);
        return result
    }

    // TODO funcion que busque al usuario
    const searchUser = async () => {
        if(!userNameSearch.trim()) {
            Alert.alert("El nombre de usuario no puede estar vacio")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if(res && res.rows && res.rows.length > 0) {
            setUsername(res.rows[0].userName)
            setApellido(res.rows[0].apellido)
            setCedula(res.rows[0].cedula)
            setNacimiento(res.rows[0].nacimiento)
        }else {
            setApellido("")
            setCedula("")
            setNacimiento("")
        }
    }

    // TODO funcion de hacer el update del usuario
    const updateUser = async () => {
        if(!userName.trim()) {
            Alert.alert("No puede estar vacio")
            return
        }
        
        if(!apellido.trim()) {
            Alert.alert("No puede estar vacio")
            return 
        }
        if(!cedula.trim()) {
            Alert.alert("No puede estar vacio")
            return 
        }
        if(!nacimiento.trim()) {
            Alert.alert("No puede estar vacio")
            return 
        }
        // update
        const res = await updateUserDB()
        console.log("res", res)
        if(res.rowsAffected > 0) {
            Alert.alert("Usuario actualizado correctamente")
        }else {
            Alert.alert("No se pudo actualizar el usuario")
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Usuario" style={styles.text} />
                            <MyInputText 
                                placeholder="Ingrese el nombre de Usuario"
                                style={{}}
                                onChangeText={(text) => setUserNameSearch(text)}
                            />
                            <MySingleButton title="Buscar" onPress={searchUser} />

                            <View style={styles.form}>
                                <MyInputText 
                                    placeholder="Ingrese el nombre de usuario"
                                    defaultValue={userName}
                                    onChangeText={(text) => setUsername(text)}
                                />
                                <MyInputText 
                                    placeholder="Ingrese el apellido"
                                    value={apellido}
                                    onChangeText={(text) => setApellido(text)}
                                />
                                <MyInputText 
                                    placeholder="Ingrese cedula"
                                    value={cedula}
                                    onChangeText={(text) => setCedula(text)}
                                    keyboardType="numeric"
                                />
                                <MyInputText 
                                    placeholder="Ingrese fecha de nacimiento"
                                    value={nacimiento}
                                    onChangeText={(text) => setNacimiento(text)}
                                />

                                <MySingleButton 
                                    title="Actualizar" 
                                    onPress={updateUser} 
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

export default UpdateUser