import * as SQLite from 'expo-sqlite/legacy';
const dbName = "database.db"
const databaseConection = {
     getConnection() {
        return SQLite.openDatabase(dbName)
    },
    async checkTableExist(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", []) 
        return res
    },
    async dropTable(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS users", [])
        return res
    },
    async createUserTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, userName VARCHAR(50), apellido VARCHAR(50), cedula VARCHAR(20),nacimiento VARCHAR(30))", [])
        return res
    },
    async createUser(tx, userName, apellido, cedula,nacimiento) {
        const res = await tx.executeSqlAsync("INSERT INTO users (userName, apellido, cedula, nacimiento) VALUES (?, ?, ?, ?)", [userName, apellido,cedula, nacimiento])
        console.log("aaaaa", res)
        return res
    },
    async updateUser(tx, userName, apellido, cedula, nacimiento) {
        console.log("params", userName, apellido, cedula, nacimiento)
        const res = await tx.executeSqlAsync("UPDATE users SET userName = ?, apellido = ?, cedula = ?, nacimiento = ? WHERE userName = ?", [userName, apellido,cedula, nacimiento]) 
        return res
    },
    async deleteUser(tx, userName) {
        const res = await tx.executeSqlAsync("DELETE FROM users WHERE userName = ?", [userName])
        return res
    },
    async getOneUser(tx, userName) {
        const res = await tx.executeSqlAsync("SELECT * FROM users WHERE userName = ?", [userName])
        return res
    },
    
    async getAllUsers(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM users", [])
        return res
    },
    async deleteAllUser(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM users", [])
        return res
    },
    async createTipoMaquinaTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS tipomaquina(tipomaquina_id INTEGER PRIMARY KEY AUTOINCREMENT, tipomaquina VARCHAR(50), fotoejemplo VARCHAR(200))", [])
        return res
    },
    async createTipoMaquina(tx, tipomaquina, fotoejemplo) {
        const res = await tx.executeSqlAsync("INSERT INTO tipomaquina (tipomaquina, fotoejemplo) VALUES (?, ?)", [tipomaquina, fotoejemplo])
        console.log("aaaaa", res)
        return res
    },
    async updateTipoMaquina(tx, tipomaquina, fotoejemplo) {
        console.log("params", tipomaquina, fotoejemplo)
        const res = await tx.executeSqlAsync("UPDATE tipomaquina SET tipomaquina = ?, fotoejemplo = ? WHERE tipomaquina = ?", [tipomaquina, fotoejemplo]) 
        return res
    },
    async deleteTipoMaquina(tx, tipomaquina) {
        const res = await tx.executeSqlAsync("DELETE FROM tipomaquina WHERE tipomaquina = ?", [tipomaquina])
        return res
    },
    async getOneTipoMaquina(tx, tipomaquina) {
        const res = await tx.executeSqlAsync("SELECT * FROM tipomaquina WHERE tipomaquina = ?", [tipomaquina])
        return res
    },
    async getAllTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM tipomaquina", [])
        return res
    },
    async deleteAllTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM tipomaquina", [])
        return res
    },
    
    async createMaquinaTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS maquina(maquina_id INTEGER PRIMARY KEY AUTOINCREMENT, codigo VARCHAR(50), tipomaquina VARCHAR(200), nrosala VARCHAR(100))", [])
        return res
    },
    async createMaquina(tx, codigo, tipomaquina, nrosala) {
        const res = await tx.executeSqlAsync("INSERT INTO maquina (codigo, tipomaquina, nrosala) VALUES (?, ?,?)", [codigo, tipomaquina, nrosala])
        console.log("aaaaa", res)
        return res
    },
    async updateMaquina(tx, codigo, tipomaquina, nrosala) {
        console.log("params", codigo, tipomaquina, nrosala)
        const res = await tx.executeSqlAsync("UPDATE maquina SET codigo = ?, tipomaquina = ?, nrosala = ? WHERE codigo = ?", [codigo, tipomaquina,nrosala]) 
        return res
    },
    async deleteMaquina(tx, codigo) {
        const res = await tx.executeSqlAsync("DELETE FROM maquina WHERE codigo = ?", [codigo])
        return res
    },
    async getOneMaquina(tx, codigo) {
        const res = await tx.executeSqlAsync("SELECT * FROM maquina WHERE codigo = ?", [codigo])
        return res
    },
    async getAllMaquina(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM maquina", [])
        return res
    },
    async deleteAllMaquina(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM maquina", [])
        return res
    },
    async createEjercicioTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS ejercicio(ejercicio_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), tipomaquina VARCHAR(200), videodemo VARCHAR(100))", [])
        return res
    },
    async createEjercicio(tx, nombre, tipomaquina, videodemo) {
        const res = await tx.executeSqlAsync("INSERT INTO ejercicio (nombre, tipomaquina, videodemo) VALUES (?, ?,?)", [nombre, tipomaquina, videodemo])
        console.log("aaaaa", res)
        return res
    },
    async updateEjercicio(tx, nombre, tipomaquina, videodemo) {
        console.log("params", nombre, tipomaquina, videodemo)
        const res = await tx.executeSqlAsync("UPDATE ejercicio SET nombre = ?, tipomaquina = ?, videodemo = ? WHERE nombre = ?", [nombre, tipomaquina,videodemo]) 
        return res
    },
    async deleteEjercicio(tx, nombre) {
        const res = await tx.executeSqlAsync("DELETE FROM ejercicio WHERE nombre = ?", [nombre])
        return res
    },
    async getOneEjercicio(tx, nombre) {
        const res = await tx.executeSqlAsync("SELECT * FROM ejercicio WHERE nombre = ?", [nombre])
        return res
    },
    async getAllEjercicio(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM ejercicio", [])
        return res
    },
    async deleteAllEjercicio(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM ejercicio", [])
        return res
    },
    async createRutinaTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS rutina(rutina_id INTEGER PRIMARY KEY AUTOINCREMENT, diarutina VARCHAR(50), usuario VARCHAR(200), ejercicio VARCHAR(100),tiempo VARCHAR(100),cantidadrepes VARCHAR(100) )", [])
        return res
    },
    async createRutinaOLD(tx, diarutina, usuario, ejercicio,tiempo,cantidadrepes) {
        const res = await tx.executeSqlAsync("INSERT INTO rutina (diarutina, usuario, ejercicio, tiempo, cantidadrepes) VALUES (?, ?, ?, ?, ?)", [diarutina, usuario, ejercicio,tiempo,cantidadrepes])
        console.log("aaaaa", res)
        return res
    },
    async updateRutina(tx, diarutina, usuario, ejercicio,tiempo,cantidadrepes) {
        console.log("params", diarutina, usuario, ejercicio,tiempo,cantidadrepes)
        const res = await tx.executeSqlAsync("UPDATE rutina SET diarutina = ?, usuario = ?, ejercicio = ?, tiempo = ?, cantidadrepes = ? WHERE diarutina = ? AND usuario = ?", [diarutina, usuario, ejercicio,tiempo,cantidadrepes]) 
        return res
    },
    async deleteRutina(tx, diarutina, usuario) {
        const res = await tx.executeSqlAsync("DELETE FROM rutina WHERE diarutina = ? AND usuario = ?", [diarutina,usuario])
        return res
    },
    async getOneRutina(tx, diarutina, usuario) {
        const res = await tx.executeSqlAsync("SELECT * FROM rutina WHERE diarutina = ? AND usuario = ?", [diarutina,usuario])
        return res
    },
    async getAllRutina(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM rutina", [])
        return res
    },
    async consulta1(tx) {
        const res = await tx.executeSqlAsync(`SELECT r.usuario, r.diarutina, r.ejercicio, r.tiempo, r.cantidadrepes, e.videodemo
               FROM rutina r
               JOIN ejercicio e ON r.ejercicio = e.nombre
               WHERE r.usuario = ? AND r.diarutina = ?
               ORDER BY r.diarutina, r.ejercicio`, [])
        return res
    },
    async deleteAllRutina(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM rutina", [])
        return res
    },
    createEjercicio1(nombre, tipomaquina, videodemo) {
        return new Promise((resolve, reject) => {
          const db = this.getConnection();
          db.transaction(tx => {
            tx.executeSql(
              'SELECT tipomaquina FROM tipomaquina WHERE tipomaquina = ?',
              [tipomaquina],
              (txObj, resultSet) => {
                if (resultSet.rows.length > 0) {
                  tx.executeSql(
                    'INSERT INTO ejercicio (nombre, tipomaquina, videodemo) VALUES (?, ?, ?)',
                    [nombre, tipomaquina, videodemo],
                    (txObj, resultSet) => resolve(resultSet),
                    (txObj, error) => reject(error)
                  );
                } else {
                  reject(new Error('Tipo maquina no encontrado'));
                }
              },
              (txObj, error) => reject(error)
            );
          });
        });
      },

    createRutina(diarutina, usuario, ejercicio, tiempo, cantidadrepes) {
        return new Promise((resolve, reject) => {
          const db = this.getConnection();
          db.transaction(tx => {
            // Verifica si el usuario existe
            tx.executeSql(
              'SELECT userName FROM users WHERE userName = ?',
              [usuario],
              (txObj, resultSet) => {
                if (resultSet.rows.length > 0) {
                  // Si el usuario existe, inserta la rutina
                  tx.executeSql(
                    'INSERT INTO rutina (diarutina, usuario, ejercicio, tiempo, cantidadrepes) VALUES (?, ?, ?, ?, ?)',
                    [diarutina, usuario, ejercicio, tiempo, cantidadrepes],
                    (txObj, resultSet) => resolve(resultSet),
                    (txObj, error) => reject(error)
                  );
                } else {
                  reject(new Error('Usuario no encontrado'));
                }
              },
              (txObj, error) => reject(error)
            );
          });
        });
      },
      
      getRutinasByUsuarioYDia(usuario, diarutina) {
        return new Promise((resolve, reject) => {
          const db = this.getConnection();
          db.transaction(tx => {
            tx.executeSql(
              `SELECT r.usuario, r.diarutina, r.ejercicio, r.tiempo, r.cantidadrepes, e.videodemo
               FROM rutina r
               JOIN ejercicio e ON r.ejercicio = e.nombre
               WHERE r.usuario = ? AND r.diarutina = ?
               ORDER BY r.diarutina, r.ejercicio`,
              [usuario, diarutina],
              (txObj, resultSet) => resolve(resultSet),
              (txObj, error) => reject(error)
            );
          });
        });
      }
    };
    

    
    
export default databaseConection