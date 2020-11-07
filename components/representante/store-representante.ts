import database from "../../db";
import { Representantes_INT, Usuario_INT } from "../../interface/index";

class StoreUsuario {
  /* INSERTAR - POST - CREAR */

  async insertar_representante(representante: Representantes_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO representantes (cedula, nombres, apellidos, sexo) VALUES (${representante.cedula}, '${representante.nombres}', '${representante.apellidos}', '${representante.sexo}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async validar_representante_existente(cedula: number): Promise<Representantes_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM representantes WHERE cedula = ${cedula};`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_representantes(): Promise<Representantes_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM representantes ORDER BY cedula DESC;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  /* DELETE - BORRAR - ELIMINAR */

  async eliminar_representantes(cedula: number) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM representantes WHERE cedula = ${cedula};`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StoreUsuario();
export default store;