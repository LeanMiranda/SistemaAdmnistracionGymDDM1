import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  View,
} from "react-native";
// importar inputs
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

import databaseConection from "../database/database-manager";

const RegisterEjercicio = ({ navigation }) => {
  // Definir los estados.
  const [nombre, setNombre] = useState("");
  const [tipomaquina, setTipomaquina] = useState("");
  const [videodemo, setVideodemo] = useState("");


  // Función de borrar los estados
  const clearData = () => {
    setTipomaquina("");
    setVideodemo("");
  };

  // Validar datos
  const validateData = () => {
    if (!nombre.trim()) {
      Alert.alert("Ingrese el día de la rutina");
      return false;
    }

    if (!tipomaquina.trim()) {
      Alert.alert("Ingrese el tipo de maquina");
      return false;
    }

    if (!videodemo.trim()) {
      Alert.alert("Ingrese el link del video demo");
      return false;
    }


    return true;
  };

  // Función que se encarga de guardar los datos
  const saveEjercicio = async () => {
    try {
      const result = await databaseConection.createEjercicio1(nombre, tipomaquina, videodemo);
      return result;
    } catch (error) {
      Alert.alert("Error", error.message);
      return null;
    }
  };

  const RegisterEjercicio = async () => {
    if (validateData()) {
      const result = await saveEjercicio();
      if (result && result.rowsAffected > 0) {
        // Validar si se guardaron los datos
        Alert.alert(
          "Éxito",
          "Rutina Registrada!!",
          [
            {
              text: "OK",
              onPress: () => {
                clearData();
                navigation.navigate("HomeScreen");
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert("Error", "No se pudo registrar el ejercicio.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboard}>
              <MyInputText
                placeholder="Nombre"
                onChangeText={setNombre}
                style={styles.input}
                value={nombre}
              />
              <MyInputText
                placeholder="Tipo de maquina"
                onChangeText={setTipomaquina}
                maxLength={50}
                style={styles.input}
                value={tipomaquina}
              />
              <MyInputText
                placeholder="Link video demo"
                onChangeText={setVideodemo}
                style={styles.input}
                value={videodemo}
              />

              <MySingleButton onPress={RegisterEjercicio} title={"Guardar"} />
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

export default RegisterEjercicio;