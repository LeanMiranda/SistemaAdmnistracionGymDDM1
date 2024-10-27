import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
} from "react-native";
// importar inputs
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const RegisterUser = ({ navigation }) => {
  // Definir los estados.
  const [userName, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [nacimiento, setNacimiento] = useState("");

  // funcion de borrar los estados
  const clearData = () => {
    setName("");
    setApellido("");
    setCedula("");
    setNacimiento("");
  };

  // Validar datos
  const validateData = () => {
    if (!userName.trim()) {
      Alert.alert("Ingrese su nombre");
      return false;
    }

    if (!apellido.trim()) {
      Alert.alert("Ingrese apellido");
      return false;
    }

    if (!cedula.trim()) {
      Alert.alert("Ingrese cedula");
      return false;
    }
    if (!nacimiento.trim() ) {
      Alert.alert("Ingrese fecha de nacimiento");
      return false;
    }

    return true;
  };

  const saveUser = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
        result = await databaseConection.createUser(tx, userName, apellido,cedula, nacimiento);
    }, readOnly);

    return result
  };


 
  // funcion que se encargue de guardar los datos.
  const registerUser = async () => {
    if (validateData()) {
      //guardar datos
      const result = await saveUser();
      if (result.rowsAffected > 0) {
        //  validar si se guardar los datos
        Alert.alert(
          "Exito",
          "Usuario Registrados!!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("HomeScreen"),
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert("Error al registrar usuario")
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboard}>
              {/* inputs */}
              <MyInputText
                placeholder="Nombre"
                onChangeText={setName}
                style={styles.input}
                value={userName}
              />

              {/* apellido */}
              <MyInputText
                placeholder="Apellido"
                onChangeText={setApellido}
                maxLength={16}
                style={styles.input}
                value={apellido}
              />

              {/* cedula */}
              <MyInputText
                placeholder="cedula"
                onChangeText={setCedula}
                style={styles.input}
                value={cedula}
                keyboardType="numeric"
              />
              {/* nacimiento */}
              <MyInputText
                placeholder="nacimiento"
                onChangeText={setNacimiento}
                style={styles.input}
                value={nacimiento}
                keyboardType="default"
              />
              {/* button */}
              <MySingleButton onPress={registerUser} title={"Guardar"} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    padding: 15,
    textAlignVertical: "top",
  },
});

export default RegisterUser;
