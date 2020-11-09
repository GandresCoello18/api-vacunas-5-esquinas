import database from "../../db";
import { Discucion_INT } from "../../interface/index";

class StoreMenciones {
  /* INSERTAR - POST - CREAR */

  async insertar_mencion(id_discucion_mencion: string, id_paciente: string, id_discucion: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO discucion_menciones (id_discucion_mencion, id_paciente, id_discucion) VALUES ('${id_discucion_mencion}', '${id_paciente}', '${id_discucion}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_mencion(id_discucion_mencion: string): Promise<Discucion_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM discucion_menciones WHERE id_discucion_mencion = '${id_discucion_mencion}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  /* DELETE - BORRAR - ELIMINAR */

  async eliminar_mencion(id_discucion_mencion: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM discucion_menciones WHERE id_discucion_mencion = '${id_discucion_mencion}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StoreMenciones();
export default store;