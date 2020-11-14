import database from "../../db";
import { Discucion_INT, Peso_Altura_INT, Vacuna_Paciente_INT } from "../../interface/index";

class StoreSeguimiento {
  /* INSERTAR - POST - CREAR */

  async registrar_seguimiento(seguimineto: Peso_Altura_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO seguimiento (id_seguimiento, peso, altura, id_paciente, fecha_seguimiento) VALUES ('${seguimineto.id_seguimiento}', ${seguimineto.peso}, ${seguimineto.altura}, '${seguimineto.id_paciente}', '${seguimineto.fecha_seguimineto}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_seguimiento(id_paciente: string): Promise<Discucion_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT seguimiento.id_seguimiento, seguimiento.peso, seguimiento.altura, seguimiento.id_paciente, seguimiento.fecha_seguimiento FROM seguimiento INNER JOIN paciente ON paciente.id_paciente = seguimiento.id_paciente WHERE paciente.id_paciente = '${id_paciente}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  /* DELETE - BORRAR - ELIMINAR */

  async eliminar_discucion(id_discucion: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM discucion WHERE id_discucion = '${id_discucion}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StoreSeguimiento();
export default store;