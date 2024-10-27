import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

// importo todas las pantallas
import HomeScreen from "../screens/HomeScreen";
import RegisterUser from "../screens/RegisterUser";
import UpdateUser from "../screens/UpdateUser";
import DeleteUser from "../screens/DeleteUser";
import ViewUser from "../screens/ViewUser";
import ViewAllUsers from "../screens/ViewAllUsers"
import RegisterTipoMaquina from "../screens/RegisterTipoMaquina";
import UpdateTipoMaquina from "../screens/UpdateTipoMaquina";
import DeleteTipoMaquina from "../screens/DeleteTipoMaquina";
import RegisterMaquina from "../screens/RegisterMaquina";
import UpdateMaquina from "../screens/UpdateMaquina";
import DeleteMaquina from "../screens/DeleteMaquina";
import RegisterEjercicio from "../screens/RegisterEjercicio";
import UpdateEjercicio from "../screens/UpdateEjercicio";
import DeleteEjercicio from "../screens/DeleteEjercicio";
import RegisterRutina from "../screens/RegisterRutina";
import UpdateRutina from "../screens/UpdateRutina";
import DeleteRutina from "../screens/DeleteRutina";
import ListaRutina from "../screens/ListaRutina";
import AllTMaquina from "../screens/AllTMaquina";
import AllMaquina from "../screens/AllMaquina";
import AllEjercicio from "../screens/AllEjercicio";

const RootStack = () => {
    return (
        <>
        <NavigationContainer>
             <Stack.Navigator initialRouteName="HomeScreen">
            {/* home */}
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "Inicio GYM",
                    headerStyle: {
                        backgroundColor: "#0000FF",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="AllTMaquina"
                component={AllTMaquina}
                options={{
                    title: "ALLTMAQUINA",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="AllMaquina"
                component={AllMaquina}
                options={{
                    title: "ALLMAQUINA",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
             <Stack.Screen
                name="AllEjercicio"
                component={AllEjercicio}
                options={{
                    title: "AllEjercicio",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            
            <Stack.Screen
                name="ListaRutina"
                component={ListaRutina}
                options={{
                    title: "Home",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* crear de usuario */}
            <Stack.Screen
                name="RegisterUser"
                component={RegisterUser}
                options={{
                    title: "Registrar Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="RegisterTipoMaquina"
                component={RegisterTipoMaquina}
                options={{
                    title: "Registrar Tipo de Maquina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="DeleteTipoMaquina"
                component={DeleteTipoMaquina}
                options={{
                    title: "Eliminar Tipo de Maquina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="UpdateTipoMaquina"
                component={UpdateTipoMaquina}
                options={{
                    title: "Actualizar Tipo de Maquina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="RegisterMaquina"
                component={RegisterMaquina}
                options={{
                    title: "Registrar Maquina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="UpdateMaquina"
                component={UpdateMaquina}
                options={{
                    title: "Actualizar Maquina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="DeleteMaquina"
                component={DeleteMaquina}
                options={{
                    title: "Eliminar Maquina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            
            <Stack.Screen
                name="RegisterEjercicio"
                component={RegisterEjercicio}
                options={{
                    title: "Registrar Ejercicio",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="UpdateEjercicio"
                component={UpdateEjercicio}
                options={{
                    title: "Actualizar Ejercicio",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="DeleteEjercicio"
                component={DeleteEjercicio}
                options={{
                    title: "Eliminar Ejercicio",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="RegisterRutina"
                component={RegisterRutina}
                options={{
                    title: "Registrar Rutina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="UpdateRutina"
                component={UpdateRutina}
                options={{
                    title: "Actualizar Rutina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            <Stack.Screen
                name="DeleteRutina"
                component={DeleteRutina}
                options={{
                    title: "Eliminar Rutina",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* update de usuario */}
            <Stack.Screen
                name="UpdateUser"
                component={UpdateUser}
                options={{
                    title: "Actualizar Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* borrar un usuario */}
            <Stack.Screen
                name="DeleteUser"
                component={DeleteUser}
                options={{
                    title: "Borrar Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* ver un usuario */}
            <Stack.Screen
                name="ViewUser"
                component={ViewUser}
                options={{
                    title: "Ver Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
            {/* ver todos los usuario */}
            <Stack.Screen
                name="ViewAllUsers"
                component={ViewAllUsers}
                options={{
                    title: "Ver todos los Usuario",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            />
        </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}

export default RootStack
