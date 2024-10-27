import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  View,
  Text,
} from "react-native";
import MyText from "../components/MyText";

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const Consulta = () => {
  // estado
  const [usuario, setUsers] = useState([]);

  const getUsersDB = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.createRutina(tx);
    }, readOnly);
    // seteara test
    return result;
  };

  useEffect(() => {
    const loadUser = async () => {
        const res = await getUsersDB()
        console.log("#### result", res)
        if(res.rows.length > 0) {
            let elements = []
            for(let i=0; i < res.rows.length; i++) {
                console.log(res.rows[i])
                elements.push(res.rows[i])
            }
            setUsers(elements)
        }
    }
    loadUser()
  }, []);

  const listItemView = (item) => {
    return (
      <View key={item.usuario} style={styles.listItemView}>
        <MyText text="Nombre de usuario" style={styles.text} />
        <MyText text={item.usuario} style={styles.text_data} />

        <MyText text="dia" style={styles.text} />
        <MyText text={item.diarutina} style={styles.text_data} />

        <MyText text="videodemo" style={styles.text} />
        <MyText text={item.videodemo} style={styles.text_data} />

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          {usuario.length ? (
            <FlatList
              data={usuario}
              contentContainerStyle={styles.flatContainer}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}> No se encuentran usuarios</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  flatContainer: {
    paddingHorizontal: 30,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
    fontSize: 15,
  },
  text_data: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  empty: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  emptyText: {
    fontSize: 30,
    alignSelf: "center",
    alignContent: "center",
  },
});

export default Consulta;
