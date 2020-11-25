import database from "../../db";
import { Discucion_INT, Vacuna_Paciente_INT, Vacuna_Paciente_Relacionado_INT } from "../../interface/index";

class StorePaciVacu {
  /* INSERTAR - POST - CREAR */

  async registrar_paciente_vacuna(PV: Vacuna_Paciente_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO vacuna_paciente (id_vacuna_paciente, id_paciente, id_usuario, id_vacuna, fecha_vacuna, observaciones) VALUES ('${PV.id_vacuna_paciente}', '${PV.id_paciente}', '${PV.id_usuario}', ${PV.id_vacuna}, '${PV.fecha_vacuna}', '${PV.observaciones}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_paciente_vacuna(id_vacuna_paciente: string): Promise<Discucion_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT vacuna_paciente.fecha_vacuna, vacuna_paciente.observaciones, vacuna_paciente.id_vacuna_paciente, usuarios.id_usuario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin, vacunas.vacuna_name FROM vacuna_paciente INNER JOIN usuarios ON usuarios.id_usuario = vacuna_paciente.id_usuario INNER JOIN vacunas ON vacunas.id_vacuna = vacuna_paciente.id_vacuna INNER JOIN paciente ON paciente.id_paciente = vacuna_paciente.id_paciente WHERE vacuna_paciente.id_vacuna_paciente = '${id_vacuna_paciente}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_vacunas_por_paciente(id_paciente: string): Promise<Vacuna_Paciente_Relacionado_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT vacuna_paciente.fecha_vacuna, vacuna_paciente.observaciones, vacuna_paciente.id_vacuna_paciente, usuarios.id_usuario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin, vacunas.vacuna_name FROM vacuna_paciente INNER JOIN usuarios ON usuarios.id_usuario = vacuna_paciente.id_usuario INNER JOIN vacunas ON vacunas.id_vacuna = vacuna_paciente.id_vacuna INNER JOIN paciente ON paciente.id_paciente = vacuna_paciente.id_paciente WHERE paciente.id_paciente = '${id_paciente}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_cantidad_vacuna_por_paciente(id_paciente: string, id_vacuna: number): Promise<Vacuna_Paciente_Relacionado_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM vacuna_paciente WHERE id_paciente = '${id_paciente}' AND id_vacuna = ${id_vacuna};`,
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

let store = new StorePaciVacu();
export default store;