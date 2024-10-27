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

const RegisterRutina = ({ navigation }) => {
  // Definir los estados.
  const [diarutina, setDiarutina] = useState("");
  const [usuario, setUsuario] = useState("");
  const [ejercicio, setEjercicio] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [cantidadrepes, setCantidadrepes] = useState("");

  // Función de borrar los estados
  const clearData = () => {
    setDiarutina("");
    setUsuario("");
    setEjercicio("");
    setTiempo("");
    setCantidadrepes("");
  };

  // Validar datos
  const validateData = () => {
    if (!diarutina.trim()) {
      Alert.alert("Ingrese el día de la rutina");
      return false;
    }

    if (!usuario.trim()) {
      Alert.alert("Ingrese el usuario");
      return false;
    }

    if (!ejercicio.trim()) {
      Alert.alert("Ingrese el ejercicio");
      return false;
    }

    if (!tiempo.trim()) {
      Alert.alert("Ingrese el tiempo");
      return false;
    }

    if (!cantidadrepes.trim()) {
      Alert.alert("Ingrese cantidad de repeticiones");
      return false;
    }

    return true;
  };

  // Función que se encarga de guardar los datos
  const saveRutina = async () => {
    try {
      const result = await databaseConection.createRutina(diarutina, usuario, ejercicio, tiempo, cantidadrepes);
      return result;
    } catch (error) {
      Alert.alert("Error", error.message);
      return null;
    }
  };

  const RegisterRutina = async () => {
    if (validateData()) {
      const result = await saveRutina();
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
        Alert.alert("Error", "No se pudo registrar la rutina.");
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
                placeholder="Día de rutina"
                onChangeText={setDiarutina}
                style={styles.input}
                value={diarutina}
              />
              <MyInputText
                placeholder="Usuario"
                onChangeText={setUsuario}
                maxLength={50}
                style={styles.input}
                value={usuario}
              />
              <MyInputText
                placeholder="Ejercicio"
                onChangeText={setEjercicio}
                style={styles.input}
                value={ejercicio}
              />
              <MyInputText
                placeholder="Tiempo en minutos"
                onChangeText={setTiempo}
                style={styles.input}
                value={tiempo}
              />
              <MyInputText
                placeholder="Cantidad de repeticiones"
                onChangeText={setCantidadrepes}
                style={styles.input}
                value={cantidadrepes}
              />
              <MySingleButton onPress={RegisterRutina} title={"Guardar"} />
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

export default RegisterRutina;