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

const RegisterTipoMaquina = ({ navigation }) => {
  // Definir los estados.
  const [tipomaquina, setTipomaquina] = useState("");
  const [fotoejemplo, setFotoejemplo] = useState("");


  // funcion de borrar los estados
  const clearData = () => {
    setTipomaquina("");
    setFotoejemplo("");
  };

  // Validar datos
  const validateData = () => {
    if (!tipomaquina.trim()) {
      Alert.alert("Ingrese tipo de maquina");
      return false;
    }

    if (!fotoejemplo.trim()) {
      Alert.alert("Ingrese foto de ejemplo");
      return false;
    }


    return true;
  };

  const saveTipoMaquina = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
        result = await databaseConection.createTipoMaquina(tx, tipomaquina, fotoejemplo);
    }, readOnly);

    return result
  };


 
  // funcion que se encargue de guardar los datos.
  const RegisterTipoMaquina = async () => {
    if (validateData()) {
      //guardar datos
      const result = await saveTipoMaquina();
      if (result.rowsAffected > 0) {
        //  validar si se guardar los datos
        Alert.alert(
          "Exito",
          "Tipo de maquina ingresado!!",
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
        Alert.alert("Error al registrar tipo de maquina")
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
                placeholder="Tipo Maquina"
                onChangeText={setTipomaquina}
                style={styles.input}
                value={tipomaquina}
              />

              {/* apellido */}
              <MyInputText
                placeholder="Link foto de ejemplo"
                onChangeText={setFotoejemplo}
                maxLength={200}
                style={styles.input}
                value={fotoejemplo}
              />

              {/* button */}
              <MySingleButton onPress={RegisterTipoMaquina} title={"Guardar"} />
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

export default RegisterTipoMaquina;
