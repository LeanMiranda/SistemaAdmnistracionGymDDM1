import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const init = async () => {
            const readOnly = false;
            await db.transactionAsync(async tx => {
                console.log("transaction", tx)
                const tableExist = await databaseConection.checkTableExist(tx)
                console.log("table exists", tableExist.rows)
                if(tableExist.rows.length) {
                    // await databaseConection.dropTable(tx)
                }
                const result = await databaseConection.createUserTable(tx)
                console.log("### results ####", result)
            }, readOnly);
        }

        init().then(() => console.log("exec"))
    }, [])

    const clearDB = async () => {
        const readOnly = false;
        await db.transactionAsync(async tx => {
            databaseConection.deleteAllUser(tx)
        }, readOnly)
    }
    const borrarTabla = async () => {
        const readOnly = false;
        await db.transactionAsync(async tx => {
            databaseConection.dropTable(tx)
        }, readOnly)
    }
    const crearTabla = async () => {
        const readOnly = false;
        await db.transactionAsync(async tx => {
            databaseConection.createMaquinaTable(tx)
        }, readOnly)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={styles.scollview}>
                           
                            <MyButton 
                                onPress={() => navigation.navigate("ListaRutina")} 
                                title="Consulta ListaRutina" 
                                iconName="user-plus" 
                                btnColor="blue"
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("RegisterUser")} 
                                title="Registro de Usuario" 
                                iconName="user-plus" 
                                btnColor="green"
                            />
                            
                            
                            {/* button update user */}
                            <MyButton 
                                onPress={() => navigation.navigate("UpdateUser")} 
                                title="Actualizar Usuario" 
                                iconName="user-circle" 
                                btnColor="green"
                            />

                              {/* button delete user*/}
                              <MyButton 
                                onPress={() => navigation.navigate("DeleteUser")} 
                                title="Borrar Usuario" 
                                iconName="user-times" 
                                btnColor="green"
                            />

                            {/* button user */}
                            <MyButton 
                                onPress={() => navigation.navigate("ViewUser")} 
                                title="Ver Usuario" 
                                iconName="user-times" 
                                btnColor="green"
                            />

                            {/* button list user*/}
                            <MyButton 
                                onPress={() => navigation.navigate("ViewAllUsers")} 
                                title="Ver todos los Usuario" 
                                iconName="user-times" 
                                btnColor="green"
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("RegisterTipoMaquina")} 
                                title="Registro de Tipo Maquina" 
                                iconName="user-plus" 
                                btnColor="blue"
                            />

                            <MyButton 
                                onPress={() => navigation.navigate("UpdateTipoMaquina")} 
                                title="Actualizar Tipo de Maquina" 
                                iconName="user-circle" 
                                btnColor="blue"
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("AllTMaquina")} 
                                title="Listado Tipo Maquina" 
                                iconName="user-circle" 
                                btnColor="blue"
                            />

                            <MyButton 
                                onPress={() => navigation.navigate("DeleteTipoMaquina")} 
                                title="Eliminar Tipo de Maquina" 
                                iconName="user-circle" 
                                btnColor="blue"
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("RegisterMaquina")} 
                                title="Registrar Maquina" 
                                iconName="user-plus" 
                                btnColor="orange"
                            />

                            <MyButton 
                                onPress={() => navigation.navigate("UpdateMaquina")} 
                                title="Actualizar Maquina" 
                                iconName="user-circle" 
                                btnColor="orange"
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("AllMaquina")} 
                                title="Listado Maquinas" 
                                iconName="user-circle" 
                                btnColor="orange"
                            />

                            <MyButton 
                                onPress={() => navigation.navigate("DeleteMaquina")} 
                                title="Eliminar Maquina" 
                                iconName="user-circle" 
                                btnColor="orange"
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("RegisterEjercicio")} 
                                title="Registrar Ejercicio" 
                                iconName="user-plus" 
                                btnColor="purple"
                            />

                            <MyButton 
                                onPress={() => navigation.navigate("UpdateEjercicio")} 
                                title="Actualizar Ejercicio" 
                                iconName="user-circle" 
                                btnColor="purple"
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("AllEjercicio")} 
                                title="Listado Ejercicios" 
                                iconName="user-circle" 
                                btnColor="purple"
                            />

                            <MyButton 
                                onPress={() => navigation.navigate("DeleteEjercicio")} 
                                title="Eliminar Ejercicio" 
                                iconName="user-circle" 
                                btnColor="purple"
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("RegisterRutina")} 
                                title="Registrar Rutina" 
                                iconName="user-plus" 
                                btnColor="brown"
                            />

                            <MyButton 
                                onPress={() => navigation.navigate("UpdateRutina")} 
                                title="Actualizar Rutina" 
                                iconName="user-circle" 
                                btnColor="brown"
                            />

                            <MyButton 
                                onPress={() => navigation.navigate("DeleteRutina")} 
                                title="Eliminar Rutina" 
                                iconName="user-circle" 
                                btnColor="brown"
                            />


                             
                               {/* <MyButton
                                onPress={clearDB} 
                                title="Borrar DB" 
                                iconName="remove" 
                                btnColor="red"
                            />
                                        */}
                                        {/*
                            <MyButton 
                                onPress={crearTabla} 
                                title="Crear Tabla" 
                                iconName="remove" 
                                btnColor="red"
                            />
                                                */}
                           {/*
                           <MyButton 
                                onPress={() => OpenDatabase("database.db")} 
                                title="Importar DB" 
                                iconName="add" 
                                btnColor="gray"
                            />
                            */}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"

    },
    viewContainer: {
        flex: 1,
        backgroundColor: "black",
        alignContent: "center"
    },
    generalView: {
        flex: 1,
        justifyContent: "center"
    },
    internalView: {
        flex: 1,
        justifyContent: "center"
    },
    scollview: {
        flex:1,
        flexDirection: "column",
        padding:20,
        margin: 10
    }
})

export default HomeScreen