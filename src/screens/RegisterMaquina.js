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

const RegisterMaquina = ({ navigation }) => {
  // Definir los estados.
  const [codigo, setCodigo] = useState("");
  const [tipomaquina, setTipomaquina] = useState("");
  const [nrosala, setNrosala] = useState("");


  // funcion de borrar los estados
  const clearData = () => {
    setCodigo("");
    setTipomaquina("");
    setNrosala("");
  };

  // Validar datos
  const validateData = () => {
    if (!codigo.trim()) {
      Alert.alert("Ingrese codigo");
      return false;
    }

    if (!tipomaquina.trim()) {
      Alert.alert("Ingrese tipo de maquina");
      return false;
    }

    if (!nrosala.trim()) {
      Alert.alert("Ingrese numero de sala");
      return false;
    }

    return true;
  };

  const saveMaquina = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
        result = await databaseConection.createMaquina(tx, codigo, tipomaquina,nrosala);
    }, readOnly);

    return result
  };


 
  // funcion que se encargue de guardar los datos.
  const RegisterMaquina = async () => {
    if (validateData()) {
      //guardar datos
      const result = await saveMaquina();
      if (result.rowsAffected > 0) {
        //  validar si se guardar los datos
        Alert.alert(
          "Exito",
          "Maquina Registrada!!",
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
        Alert.alert("Error al registrar maquina")
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
                placeholder="Codigo"
                onChangeText={setCodigo}
                style={styles.input}
                value={codigo}
                keyboardType="numeric"
              />


              <MyInputText
                placeholder="Tipo de Maquina"
                onChangeText={setTipomaquina}
                maxLength={16}
                style={styles.input}
                value={tipomaquina}
              />

              <MyInputText
                placeholder="Numero de sala"
                onChangeText={setNrosala}
                style={styles.input}
                value={nrosala}
                keyboardType="numeric"
              />
              {/* button */}
              <MySingleButton onPress={RegisterMaquina} title={"Guardar"} />
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

export default RegisterMaquina;
